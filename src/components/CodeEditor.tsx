//@ts-nocheck
import React, { useEffect, useRef } from "react";
import { useDarkTheme } from "./DarkThemeProvider";
import Blockly from "blockly/core";
import locale from "blockly/msg/en";
import "blockly/blocks_compressed";
import "blockly/javascript_compressed";
import "@blockly/block-plus-minus";

import ToolboxXML from "../blocks/toolbox.xml";
import DefaultWorkspaceXML from "../blocks/defaultWorkspace.xml";

import { df_init_blocks } from "../blocks/DataFrame_block";
import { dv_init_blocks } from "../blocks/DataView_block";
import { misc_init_blocks } from "../blocks/misc_block";

import { init_blocks } from "../blocks/ML_block";
import { matrix_js_gen } from "../blocks/matrix_block";

import Head from "next/head";
import { BlocklyJSDef } from "src/blocks/blockUtils";
import { flyoutCategory as dfFlyoutCategory } from "../blocks/DataFrame_dynamic";
import BlocklyToolbox from "./ReactBlocklyToolbox";

//#region Blockly patches

globalThis.blocklyToolboxRevealCollapsed = true;

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
            if (item.button.cssClass_ === "toolbox_link") {
                // Modify it to be an a element
                const svgA = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "a"
                );
                svgA.setAttribute("href", item.button.info.href);
                [...item.button.svgGroup_.children].forEach((child) =>
                    svgA.append(child)
                );
                [...item.button.svgGroup_.children].forEach(
                    (child) => child.nodeName !== "a" && child.remove()
                );
                item.button.svgGroup_.append(svgA);
            }
            cursorY += item.button.height + gaps[i];
        } else if (item.type === "svg") {
            const svgGroup = Blockly.utils.dom.createSvgElement(
                Blockly.utils.Svg.G,
                {
                    transform: `translate(${cursorX}, ${cursorY})`,
                    class: "blockly-embedded-toolbox-svg"
                },
                this.workspace_.getCanvas()
            );

            if (item.link) {
                // This is async but the function isn't, but the parent element wil already be added so it is ok
                // For a link the height has to be copied over but that's it
                import("../../public/assets/toolbox/" + item.link).then(
                    (val) => {
                        const svgElement = Blockly.Xml.textToDom(val.default);
                        svgGroup.append(svgElement);
                    }
                );
            } else {
                svgGroup.append(item.blockxml);
            }
            // These two lines allow the element to be treated as a mat when old blocks are being removed (otherwise a separate array and more prototype modifications would be needed)
            svgGroup.mouseOverWrapper_ = { length: 0 };
            svgGroup.mouseOutWrapper_ = { length: 0 };
            if (item.width) {
                // Make it accessible in reflowInternal_
                svgGroup.width_ = Number(item.width);
            }
            this.mats_.push(svgGroup);
            cursorY += Number(item.height) + gaps[i];
        } else if (item.type === "svgRevealToggle") {
            const mainWS = Blockly.getMainWorkspace();

            // Register callback if not already registered
            if (!mainWS.getButtonCallback("collapse")) {
                // It's ok, we aren't accessing i or item
                // eslint-disable-next-line no-loop-func
                mainWS.registerButtonCallback("collapse", (button) => {
                    globalThis.blocklyToolboxRevealCollapsed =
                        !globalThis.blocklyToolboxRevealCollapsed;
                    // Rerender flyout
                    this.show(
                        mainWS.toolbox_.selectedItem_.toolboxItemDef_.contents
                    );
                });
            }

            var label = this.createButton_(
                {
                    kind: "LABEL",
                    text:
                        (globalThis.blocklyToolboxRevealCollapsed ? "▶" : "▼") +
                        " " +
                        item.text,
                    "web-class": "blockly-toolbox-reveal",
                    callbackKey: "collapse"
                },
                /** isLabel */ true
            );

            this.initFlyoutButton_(label, cursorX, cursorY);
            cursorY += label.height + gaps[i];
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
            var customInfo =
                /** @type {!Blockly.utils.toolbox.DynamicCategoryInfo} */ contentInfo;
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
                var blockInfo =
                    /** @type {!Blockly.utils.toolbox.BlockInfo} */ contentInfo;
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
                var sepInfo =
                    /** @type {!Blockly.utils.toolbox.SeparatorInfo} */ contentInfo;
                this.addSeparatorGap_(sepInfo, gaps, defaultGap);
                break;
            case "LABEL":
                var labelInfo =
                    /** @type {!Blockly.utils.toolbox.LabelInfo} */ contentInfo;
                // A label is a button with different styling.
                var label = this.createButton_(labelInfo, /** isLabel */ true);
                contents.push({ type: "button", button: label });
                gaps.push(defaultGap);
                break;
            case "BUTTON":
                var buttonInfo =
                    /** @type {!Blockly.utils.toolbox.ButtonInfo} */ contentInfo;
                var button = this.createButton_(
                    buttonInfo,
                    /** isLabel */ false
                );
                contents.push({ type: "button", button: button });
                gaps.push(defaultGap);
                break;
            case "SVGREVEAL":
                var svgRevealInfo = contentInfo;
                contents.push({
                    text: svgRevealInfo.text,
                    type: "svgRevealToggle"
                });
                gaps.push(defaultGap / 2);
                if (globalThis.blocklyToolboxRevealCollapsed) break;
            // Falls through
            case "SVG":
                var svgInfo = contentInfo;
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
        } else if (tagName === "SVGREVEAL") {
            obj["blockxml"] = child.children[0];
            Blockly.utils.toolbox.addAttributes_(child.children[0], obj);
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

// Allow for link labels to have callbacks
Blockly.FlyoutButton.prototype.onMouseUp_ = function (e: Event) {
    var gesture = this.targetWorkspace_.getGesture(e);
    if (gesture) {
        gesture.cancel();
    }

    const isSvgReveal = this.callbackKey_ === "collapse";

    if (this.isLabel_ && this.callbackKey_ && !isSvgReveal) {
        console.warn(
            "Labels should not have callbacks. Label text: " + this.text_
        );
    } else if (
        !this.isLabel_ &&
        !(
            this.callbackKey_ &&
            this.targetWorkspace_.getButtonCallback(this.callbackKey_)
        )
    ) {
        console.warn(
            "Buttons should have callbacks. Button text: " + this.text_
        );
    } else if (!this.isLabel_ | isSvgReveal) {
        this.targetWorkspace_.getButtonCallback(this.callbackKey_)(this);
    }
};

// Add the block highlight wrapper
Blockly.JavaScript.scrub_ = function (
    block: Blockly.Block,
    code: string,
    opt_thisOnly?: boolean
) {
    // Add highlight block
    code = code.toString().trim();

    if (!block.outputConnection) {
        // It's a statement block
        if (code.slice(-1) === ";") {
            // Remove semicolon for the wrapper
            code = code.slice(0, -1);
        }
    }

    const newCode = Blockly.JavaScript.injectId(
        `(await highlightBlock(%1, async () => ${
            block.outputConnection ? "(" : "{"
        }${code}${block.outputConnection ? ")" : "}"}))${
            !block.outputConnection ? ";" : ""
        }`,
        block
    );

    // Get code for blocks attached on bottom
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = opt_thisOnly
        ? ""
        : Blockly.JavaScript.blockToCode(nextBlock);

    return newCode + nextCode;
};

// Override the toolbox width
const TOOLBOX_WIDTH = 201;
Blockly.MetricsManager.prototype.getToolboxMetrics = function () {
    var toolboxDimensions = this.getDimensionsPx_(this.workspace_.getToolbox());

    return {
        width: TOOLBOX_WIDTH,
        height: toolboxDimensions.height,
        position: this.workspace_.toolboxPosition
    };
};

// Make sure that category flyouts have at least the same width as any SVGs inside
Blockly.VerticalFlyout.prototype.reflowInternal_ = function () {
    this.workspace_.scale = this.getFlyoutScale();
    var flyoutWidth = 0;
    var blocks = this.workspace_.getTopBlocks(false);
    for (let i = 0, block; (block = blocks[i]); i++) {
        var width = block.getHeightWidth().width;
        if (block.outputConnection) {
            width -= this.tabWidth_;
        }
        flyoutWidth = Math.max(flyoutWidth, width);
    }
    for (let i = 0, button; (button = this.buttons_[i]); i++) {
        flyoutWidth = Math.max(flyoutWidth, button.width);
    }
    // SVGs
    for (const mat of this.mats_) {
        if (
            mat?.width_ &&
            mat.classList.value === "blockly-embedded-toolbox-svg"
        ) {
            flyoutWidth = Math.max(flyoutWidth, mat.width_);
        }
    }

    flyoutWidth += this.MARGIN * 1.5 + this.tabWidth_;
    flyoutWidth *= this.workspace_.scale;
    flyoutWidth += Blockly.Scrollbar.scrollbarThickness;

    if (this.width_ !== flyoutWidth) {
        for (let i = 0, block; (block = blocks[i]); i++) {
            if (this.RTL) {
                // With the flyoutWidth known, right-align the blocks.
                var oldX = block.getRelativeToSurfaceXY().x;
                var newX = flyoutWidth / this.workspace_.scale - this.MARGIN;
                if (!block.outputConnection) {
                    newX -= this.tabWidth_;
                }
                block.moveBy(newX - oldX, 0);
            }
            if (block.flyoutRect_) {
                this.moveRectToBlock_(block.flyoutRect_, block);
            }
        }
        if (this.RTL) {
            // With the flyoutWidth known, right-align the buttons.
            for (let i = 0, button; (button = this.buttons_[i]); i++) {
                var y = button.getPosition().y;
                var x =
                    flyoutWidth / this.workspace_.scale -
                    button.width -
                    this.MARGIN -
                    this.tabWidth_;
                button.moveTo(x, y);
            }
        }

        if (
            this.targetWorkspace.toolboxPosition === this.toolboxPosition_ &&
            this.toolboxPosition_ === Blockly.utils.toolbox.Position.LEFT &&
            !this.targetWorkspace.getToolbox()
        ) {
            // This flyout is a simple toolbox. Reposition the workspace so that (0,0)
            // is in the correct position relative to the new absolute edge (ie
            // toolbox edge).
            this.targetWorkspace.translate(
                this.targetWorkspace.scrollX + flyoutWidth,
                this.targetWorkspace.scrollY
            );
        }

        // Record the width for workspace metrics and .position.
        this.width_ = flyoutWidth;
        this.position();
    }
};

//#endregion

Blockly.setLocale(locale);

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

const CustomConstantsProvider: any = function () {
    CustomConstantsProvider.superClass_.constructor.call(this);
    this.ADD_START_HATS = true;
};

Blockly.utils.object.inherits(
    CustomConstantsProvider,
    Blockly.blockRendering.ConstantProvider
);

Blockly.thrasos.Renderer.prototype.makeConstants_ = function () {
    return new CustomConstantsProvider();
};

function concatToBlocklyJS(blocks: BlocklyJSDef[]) {
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
            theme: "modern",
            toolbox: ToolboxXML
        });
        ws.registerToolboxCategoryCallback("DATAFRAMES", dfFlyoutCategory);
        ws.addChangeListener(Blockly.Events.disableOrphans);
        loadXml(DefaultWorkspaceXML);
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

    return (
        <>
            <Head>
                <style>
                    {`.toolbox_link text {
    fill: ${isDark ? "lightblue" : "blue"} !important;
}
.toolbox_link text:hover {
    text-decoration: underline;
}
.blockly-toolbox-reveal {
    height: 18px;
    cursor: pointer;
}
.blockly-embedded-toolbox-svg tspan {
    fill: ${isDark ? "white" : "black"} !important;
}
.blockly-embedded-toolbox-svg path {
    stroke: ${isDark ? "white" : "black"} !important;
}
.blocklyToolboxDiv {
    width: ${TOOLBOX_WIDTH}px;
}
.blocklyMenu.goog-menu.blocklyNonSelectable.blocklyContextMenu {
    overflow-y: hidden;
    font: inherit;
}`}
                </style>
            </Head>
            <div ref={wrapperRef} className={props.className} />
            <BlocklyToolbox />
        </>
    );
}
