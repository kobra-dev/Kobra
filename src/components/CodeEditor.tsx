//@ts-nocheck
import React, { useEffect, useMemo, useRef } from "react";
import { useDarkTheme } from "./DarkThemeProvider";
import Blockly from "blockly/core";
import locale from "blockly/msg/en";
import "blockly/blocks_compressed";
import "blockly/javascript_compressed";
import "@blockly/block-plus-minus";

import ToolboxXML from "../blocks/toolbox.xml";

import { df_init_blocks } from "../blocks/DataFrame_block";
import { dv_init_blocks } from "../blocks/DataView_block";
import { misc_init_blocks } from "../blocks/misc_block";

import { init_blocks } from "../blocks/ML_block";
import { matrix_js_gen } from "../blocks/matrix_block";

import Head from "next/head";

// Hacky modification to the flyout to allow for other types
Blockly.VerticalFlyout.prototype.layout_ = function (
    contents: object[],
    gaps: number[]
) {
    this.workspace_.scale = this.targetWorkspace.scale;
    var margin = this.MARGIN;
    var cursorX = this.RTL ? margin : margin + this.tabWidth_;
    var cursorY = margin;

    for (var i = 0, item; (item = contents[i]); i++) {
        if (item.type === "block") {
            var block = item.block;
            var allBlocks = block.getDescendants(false);
            for (var j = 0, child; (child = allBlocks[j]); j++) {
                // Mark blocks as being inside a flyout.  This is used to detect and
                // prevent the closure of the flyout if the user right-clicks on such a
                // block.
                child.isInFlyout = true;
            }
            block.render();
            var root = block.getSvgRoot();
            var blockHW = block.getHeightWidth();
            var moveX = block.outputConnection
                ? cursorX - this.tabWidth_
                : cursorX;
            block.moveBy(moveX, cursorY);

            var rect = this.createRect_(
                block,
                this.RTL ? moveX - blockHW.width : moveX,
                cursorY,
                blockHW,
                i
            );

            this.addBlockListeners_(root, block, rect);

            cursorY += blockHW.height + gaps[i];
        } else if (item.type === "button") {
            this.initFlyoutButton_(item.button, cursorX, cursorY);
            cursorY += item.button.height + gaps[i];
        } else if (item.type === "svg") {
            const svgImage = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "image"
            );
            const imgAttrs = {
                href:
                    "data:image/svg+xml;base64," +
                    btoa(item.blockxml.outerHTML),
                width: item.width,
                height: item.height
            };
            Object.entries(imgAttrs).forEach((kvp) =>
                svgImage.setAttribute(...kvp)
            );

            const svgGroup = Blockly.utils.dom.createSvgElement(
                Blockly.utils.Svg.G,
                {
                    transform: `translate(${cursorX}, ${cursorY})`
                },
                this.workspace_.getCanvas()
            );

            svgGroup.append(svgImage);
            // These two lines allow the element to be treated as a mat when old blocks are being removed (otherwise a separate array and more prototype modifications would be needed)
            svgGroup.mouseOverWrapper_ = { length: 0 };
            svgGroup.mouseOutWrapper_ = { length: 0 };
            this.mats_.push(svgGroup);
            cursorY += Number(item.height) + gaps[i];
        }
    }
};

// Allow other types of elements
Blockly.Flyout.prototype.createFlyoutInfo_ = function (
    parsedContent: Blockly.utils.toolbox.FlyoutItemInfoArray
) {
    var contents = [];
    var gaps = [];
    this.permanentlyDisabled_.length = 0;
    var defaultGap = this.horizontalLayout ? this.GAP_X : this.GAP_Y;
    for (var i = 0, contentInfo; (contentInfo = parsedContent[i]); i++) {
        if (contentInfo["custom"]) {
            var customInfo = /** @type {!Blockly.utils.toolbox.DynamicCategoryInfo} */ contentInfo;
            var categoryName = customInfo["custom"];
            var flyoutDef = this.getDynamicCategoryContents_(categoryName);
            var parsedDynamicContent =
                /** @type {!Blockly.utils.toolbox.FlyoutItemInfoArray} */
                Blockly.utils.toolbox.convertFlyoutDefToJsonArray(flyoutDef);
            parsedContent.splice.apply(
                parsedContent,
                [i, 1].concat(parsedDynamicContent)
            );
            contentInfo = parsedContent[i];
        }

        switch (contentInfo["kind"].toUpperCase()) {
            case "BLOCK":
                var blockInfo = /** @type {!Blockly.utils.toolbox.BlockInfo} */ contentInfo;
                var blockXml = this.getBlockXml_(blockInfo);
                var block = this.createBlock_(blockXml);
                // This is a deprecated method for adding gap to a block.
                // <block type="math_arithmetic" gap="8"></block>
                var gap = parseInt(
                    blockInfo["gap"] || blockXml.getAttribute("gap"),
                    10
                );
                gaps.push(isNaN(gap) ? defaultGap : gap);
                contents.push({ type: "block", block: block });
                break;
            case "SEP":
                var sepInfo = /** @type {!Blockly.utils.toolbox.SeparatorInfo} */ contentInfo;
                this.addSeparatorGap_(sepInfo, gaps, defaultGap);
                break;
            case "LABEL":
                var labelInfo = /** @type {!Blockly.utils.toolbox.LabelInfo} */ contentInfo;
                // A label is a button with different styling.
                var label = this.createButton_(labelInfo, /** isLabel */ true);
                contents.push({ type: "button", button: label });
                gaps.push(defaultGap);
                break;
            case "BUTTON":
                var buttonInfo = /** @type {!Blockly.utils.toolbox.ButtonInfo} */ contentInfo;
                var button = this.createButton_(
                    buttonInfo,
                    /** isLabel */ false
                );
                contents.push({ type: "button", button: button });
                gaps.push(defaultGap);
                break;
            case "SVG":
                var svgInfo = contentInfo;
                console.log(svgInfo);
                contents.push({ ...svgInfo, type: "svg" });
                gaps.push(defaultGap);
                break;
        }
    }
    return { contents: contents, gaps: gaps };
};

// Keep the raw XML for an SVG element
Blockly.utils.toolbox.xmlToJsonArray_ = function (
    toolboxDef: Node | Node[] | NodeList
): Blockly.utils.toolbox.FlyoutItemInfoArray {
    var arr = [];
    // If it is a node it will have children.
    var childNodes = toolboxDef.childNodes;
    if (!childNodes) {
        // Otherwise the toolboxDef is an array or collection.
        childNodes = toolboxDef;
    }
    for (var i = 0, child; (child = childNodes[i]); i++) {
        if (!child.tagName) {
            continue;
        }
        var obj = {};
        var tagName = child.tagName.toUpperCase();
        obj["kind"] = tagName;

        // Store the xml for a block
        if (tagName === "BLOCK" || tagName === "SVG") {
            obj["blockxml"] = child;
        } else if (child.childNodes && child.childNodes.length > 0) {
            // Get the contents of a category
            obj["contents"] = Blockly.utils.toolbox.xmlToJsonArray_(child);
        }

        // Add xml attributes to object
        Blockly.utils.toolbox.addAttributes_(child, obj);
        arr.push(obj);
    }
    return arr;
};

Blockly.setLocale(locale);

// Allow for blocks to be highlighted as a program runs
Blockly.JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
// Everything that is in RunnerContext.ts
// Some of these probably aren't accessible to the evaled code but it doesn't hurt to include them
Blockly.JavaScript.addReservedWords(
    "highlightBlock",
    "RunnerContext",
    "importedBlocksIterate",
    "importedBlocks",
    "Blockly",
    "globalThis",
    "runnerConsole",
    "runnerConsoleGetInput"
);

function concatToBlocklyJS(blocks) {
    blocks.forEach((block) => {
        Blockly.JavaScript[block.block] = block.f;
    });
}

concatToBlocklyJS(df_init_blocks());
Blockly.JavaScript["df_matrix"] = matrix_js_gen;
concatToBlocklyJS(dv_init_blocks());
concatToBlocklyJS(misc_init_blocks());

concatToBlocklyJS(init_blocks());

export function getCode() {
    return Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
}

export function getXml() {
    let xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    return Blockly.Xml.domToText(xml);
}

export function loadXml(xmlText) {
    let xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, Blockly.getMainWorkspace());
}

export default function CodeEditor(props) {
    const { isDark } = useDarkTheme();
    const wrapperRef = useRef<HTMLDivElement>({});
    useEffect(() => {
        const ws = Blockly.inject(wrapperRef.current, {
            renderer: "thrasos",
            toolbox: ToolboxXML
        });
        window.addEventListener(
            "resize",
            () => {
                Blockly.svgResize(ws);
            },
            false
        );
    }, []);

    useEffect(() => {
        Blockly.getMainWorkspace().setTheme(
            isDark ? Blockly.Themes.Dark : Blockly.Themes.Default
        );
    }, [isDark]);

    const border = `1px solid ${isDark ? "white" : "gray"};`;

    return (
        <>
            <Head>
                <style>
                    {`.custom_sep {
    border-bottom: ${border};
    height: 0;
    margin-top: 5px;
    margin-bottom: 6px;
}
.sep_ml {
    padding: 0.25rem;
    border-top: ${border};
    text-align: center;
}

.sep_ml::before {
    content: "Machine learning";
    font-size: initial;
    font-weight: 500;
}`}
                </style>
            </Head>
            <div ref={wrapperRef} className={props.className} />
        </>
    );
}
