// @ts-nocheck
// The mutator stuff really doesn't work well with TypeScript
import Blockly from "blockly/core";
import type { PlotType } from "plotly.js";
import {
    ArgType,
    BlocklyJSDef,
    constructCodeFromParams,
    statementPkg
} from "./blockUtils";

// https://stackoverflow.com/a/28152032
export function deepCopy(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, attr))
                copy[attr] = deepCopy(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

async function setIsActive(newValue: boolean): void {
    await globalThis.dvPatchState(
        {
            isActive: newValue
        },
        /* save: */ true
    );
}

async function enableIfDisabled() {
    if (!globalThis.dataViewNewRun) {
        await setIsActive(true);
        globalThis.dataViewNewRun = true;
    }
}

export async function dv_reset(): void {
    globalThis.dataViewNewRun = false;
    await globalThis.dvResetState(/* save: */ true);
    await setIsActive(false);
}

export async function dv_set_title(title: string): void {
    await enableIfDisabled();
    await globalThis.dvPatchState(
        {
            plotTitle: title
        },
        /* save: */ true
    );
}

export async function dv_add_series(
    title: string,
    type: string,
    dataX: number[],
    dataY: number[]
): void {
    await enableIfDisabled();
    const oldState = await globalThis.dvGetState();
    oldState.plotData.push({
        name: title,
        type: type as PlotType,
        x: dataX,
        y: dataY
    });
    await globalThis.dvPatchState(
        {
            plotData: oldState.plotData
        },
        /* save: */ true
    );
}

export async function dv_remove_series(title: string): void {
    await enableIfDisabled();
    const oldState = await globalThis.dvGetState();
    oldState.plotData = state.plotData.filter(
        (item) => item.title?.text !== title
    );
    await globalThis.dvPatchState(
        {
            plotData: oldState.plotData
        },
        /* save: */ true
    );
}

export function dv_init_blocks(): BlocklyJSDef[] {
    Blockly.Extensions.registerMutator(
        "dv_add_series_mutator",
        {
            customFieldCount_: 0,
            suppressPrefixSuffix: true,
            mutationToDom: function () {
                if (!this.customFieldCount_) {
                    return null;
                }
                let container = Blockly.utils.xml.createElement("mutation");
                container.setAttribute("customFields", this.customFieldCount_);
                return container;
            },
            domToMutation: function (xmlElement: Element) {
                this.customFieldCount_ =
                    parseInt(xmlElement.getAttribute("customFields"), 10) || 0;
                this.rebuildShape_();
            },
            decompose: function (workspace: Blockly.Workspace) {
                let containerBlock = workspace.newBlock(
                    "dv_add_series_add_series"
                );
                containerBlock.initSvg();
                let connection = containerBlock.nextConnection;
                for (let i = 1; i <= this.customFieldCount_; i++) {
                    let customFieldBlock = workspace.newBlock(
                        "dv_add_series_custom_field"
                    );
                    customFieldBlock.initSvg();
                    connection.connect(customFieldBlock.previousConnection);
                }
                return containerBlock;
            },
            compose: function (containerBlock: Blockly.Block) {
                let mutatorBlock = containerBlock.nextConnection.targetBlock();
                this.customFieldCount_ = 0;
                let valueConnections = [];
                while (mutatorBlock) {
                    switch (mutatorBlock.type) {
                        case "dv_add_series_custom_field":
                            this.customFieldCount_++;
                            valueConnections.push(
                                mutatorBlock.valueConnection_
                            );
                            break;
                        default:
                            throw TypeError(
                                "Unknown block type: " + mutatorBlock.type
                            );
                    }
                    mutatorBlock =
                        mutatorBlock.nextConnection &&
                        mutatorBlock.nextConnection.targetBlock();
                }
                this.updateShape_();
                this.reconnectChildBlocks_(valueConnections);
            },
            saveConnections: function (containerBlock: Blockly.Block) {
                /*let mutatorBlock = containerBlock.nextConnection.targetBlock();
            let i = 1;
            while(mutatorBlock) {
                switch(mutatorBlock.type) {
                    case 'dv_add_series_custom_field':
                        let
                }
            }*/

                let mutatorBlock = containerBlock.nextConnection.targetBlock();
                let i = 1;
                while (mutatorBlock) {
                    let input = this.getInput("CUSTOM_VAL_KEY_" + i);
                    mutatorBlock.valueConnection_ =
                        input && input.connection.targetConnection;
                    i++;
                    mutatorBlock =
                        mutatorBlock.nextConnection &&
                        mutatorBlock.nextConnection.targetBlock;
                }
            },
            reconnectChildBlocks_: function (valueConnections) {
                for (let i = 0; i <= this.customFieldCount_; i++) {
                    Blockly.Mutator.reconnect(
                        valueConnections[i],
                        this,
                        "CUSTOM_VAL_KEY_" + i
                    );
                }
            },
            rebuildShape_: function () {
                /*let valueConnections = [null];
            let statementConnections = [null];

            */
            },
            updateShape_: function () {
                let i = 1;
                while (this.getInput("CUSTOM_VAL_KEY_" + i)) {
                    this.removeInput("CUSTOM_VAL_KEY_" + i);
                    this.removeInput("CUSTOM_VAL_VALUE_" + i);
                    i++;
                }
                for (i = 1; i <= this.customFieldCount_; i++) {
                    this.appendValueInput("CUSTOM_VAL_KEY_" + i)
                        .appendField("custom field")
                        .setCheck("String");
                    this.appendValueInput("CUSTOM_VAL_VALUE_" + i).appendField(
                        "with value"
                    );
                }
            }
        },
        null,
        ["dv_add_series_custom_field"]
    );

    Blockly.defineBlocksWithJsonArray([
        {
            type: "dv_reset",
            message0: "reset plot",
            previousStatement: null,
            nextStatement: null,
            colour: 110
        },
        {
            type: "dv_set_title",
            message0: "set plot title to %1",
            args0: [
                {
                    type: "input_value",
                    name: "VALUE",
                    check: "String"
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 110
        },
        {
            type: "dv_add_series",
            message0:
                "add series to plot: %1 title: %2 type: %3 %4 data x: %5 data y: %6",
            args0: [
                {
                    type: "input_dummy"
                },
                {
                    type: "input_value",
                    name: "TITLE_VAL",
                    check: "String"
                },
                {
                    type: "field_dropdown",
                    name: "TYPE_DROPDOWN",
                    /* Full plotly bundle:[
                        ['Bar', 'bar'],
                        ['Box', 'box'],
                        ['Candlestick', 'candlestick'],
                        ['Cloropleth', 'cloropleth'],
                        ['Contour', 'contour'],
                        ['Heatmap', 'heatmap'],
                        ['Histogram', 'histogram'],
                        ['Indicator', 'indicator'],
                        ['3D mesh', 'mesh3d'],
                        ['OHLC', 'ohlc'],
                        ['Par coords', 'parcoords'],
                        ['Pie', 'pie'],
                        ['Pointcloud', 'pointcloud'],
                        ['Scatter', 'scatter'],
                        ['3D scatter', 'scatter3d'],
                        ['Geo scatter', 'scattergeo'],
                        ['GL scatter', 'scattergl'],
                        ['Polar scatter', 'scatterpolar'],
                        ['Ternary scatter', 'scatterternary'],
                        ['Sunburst', 'sunburst'],
                        ['Surface', 'surface'],
                        ['Treemap', 'treemap'],
                        ['Waterfall', 'waterfall'],
                        ['Funnel', 'funnel'],
                        ['Area funnel', 'funnelarea'],
                        ['Mapbox scatter', 'scattermapbox']
                    ]*/
                    options:
                        /* Cartesian plotly bundle */
                        [
                            ["Scatter", "scatter"],
                            ["Bar", "bar"],
                            ["Box", "box"],
                            ["Pie", "pie"],
                            ["Histogram", "histogram2d"],
                            ["Histogram Contour", "histogram2dcontour"],
                            ["Violin", "violin"]
                        ]
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_value",
                    name: "X_VAL",
                    check: "Array"
                },
                {
                    type: "input_value",
                    name: "Y_VAL",
                    check: "Array"
                }
            ],
            previousStatement: null,
            nextStatement: null,
            inputsInline: false,
            colour: 110
            //mutator: 'dv_add_series_mutator'
        },
        // Mutator blocks for dv_add_series
        // Do not add these to the toolbox; they are only for the mutator
        {
            type: "dv_add_series_add_series",
            message0: "add series to plot",
            nextStatement: null,
            enableContextMenu: false
        },
        {
            type: "dv_add_series_custom_field",
            message0: "custom field",
            previousStatement: null,
            nextStatement: null,
            enableContextMenu: false,
            tooltip:
                "Add a custom Plotly configuration field to the series. See the docs for more information."
        },
        // End mutator blocks
        {
            type: "dv_remove_series",
            message0: "remove series with title %1",
            args0: [
                {
                    type: "input_value",
                    name: "VALUE",
                    check: "String"
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 110
        }
    ]);

    return [
        {
            block: "dv_reset",
            f: (block) =>
                statementPkg(constructCodeFromParams(block, "await dv_reset"))
        },
        {
            block: "dv_set_is_active",
            f: (block) =>
                statementPkg(
                    constructCodeFromParams(
                        block,
                        "await dv_set_is_active",
                        "VALUE"
                    )
                )
        },
        {
            block: "dv_set_title",
            f: (block) =>
                statementPkg(
                    constructCodeFromParams(
                        block,
                        "await dv_set_title",
                        "VALUE"
                    )
                )
        },
        // TODO
        {
            block: "dv_add_series",
            f: (block) =>
                statementPkg(
                    constructCodeFromParams(
                        block,
                        "await dv_add_series",
                        "TITLE_VAL",
                        {
                            type: ArgType.Field,
                            arg: "TYPE_DROPDOWN"
                        },
                        "X_VAL",
                        "Y_VAL"
                    )
                )
        },
        {
            block: "dv_remove_series",
            f: (block) =>
                statementPkg(
                    constructCodeFromParams(
                        block,
                        "await dv_remove_series",
                        "VALUE"
                    )
                )
        }
    ];
}
