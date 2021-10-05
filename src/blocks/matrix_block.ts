/* eslint-disable */
// This is based on the Matrix block from Vittascience and has been modified a bunch, mainly to add independent X and Y dimensions

import Blockly, { Block__Class } from "blockly/core";
import { makeJSArray, valuePkg } from "./blockUtils";

Blockly.defineBlocksWithJsonArray([
    // Block for initializing a matrix.
    {
        type: "df_matrix",
        output: "Array",
        extensions: ["block_buttons_plus_minus", "numpy_square_matrix_init"],
        mutator: "numpy_square_matrix_mutator",
        colour: "#745ba5"
    }
]);

const UPDATE_BLOCK_MUTATOR_MIXIN = (t, e) => {
    Blockly.Events.setGroup(!0);
    var o = t.mutationToDom();
    var l = o && Blockly.Xml.domToText(o);
    var n = t.rendered;
    t.rendered = !1;
    e && e.call(t);
    t.updateShape_ && t.updateShape_();
    t.rendered = n;
    t.initSvg();
    var _ = Blockly.Events.getGroup();
    var i = t.mutationToDom();
    var s = i && Blockly.Xml.domToText(i);
    l != s &&
        Blockly.Events.fire(
            new Blockly.Events.BlockChange(t, "mutation", null, l, s),
            //@ts-ignore
            setTimeout(function () {
                Blockly.Events.setGroup(_);
                t.bumpNeighbours();
                Blockly.Events.setGroup(!1);
            }, Blockly.BUMP_DELAY)
        );
    t.rendered && t.render();
    Blockly.Events.setGroup(!1);
};

/**
 * Performs final setup of 'numpy_square_matrix' block.
 * @this {Blockly.Block}
 */
// const NUMPY_SQUARE_MATRIX_INIT_EXTENSION = function () {
//     this.dimX = 3;
//     this.dimY = 3;
//     this.line = new Array();
//     this.updateShape_();
// };

class NUMPY_SQUARE_MATRIX_INIT_EXTENSION {
    dimY: number;
    dimX: number;
    line: string[];

    constructor() {
        this.dimX = 3;
        this.dimY = 3;
        this.line = [];
    }

    updateShape_() {}
}

class NUMPY_SQUARE_MATRIX_MUTATOR_MIXIN extends NUMPY_SQUARE_MATRIX_INIT_EXTENSION {
    constructor() {
        super();
    }

    mutationToDom() {
        let container = Blockly.utils.xml.createElement("mutation");
        container.setAttribute("dimX", "" + this.dimX);
        container.setAttribute("dimY", "" + this.dimY);
        return container;
    }

    domToMutation(xmlElement: Element) {
        this.dimX = parseInt(xmlElement.getAttribute("dimX"));
        this.dimY = parseInt(xmlElement.getAttribute("dimY"));
        this.updateShape_();
    }

    raiseMatrixSizeX() {
        let update = () => {
            this.addColumnFields();
            this.dimX++;
        };
        this.update_(update);
    }

    reduceMatrixSizeX() {
        let update = () => {
            this.removeColumnFields();
            this.dimX--;
        };
        this.update_(update);
    }

    raiseMatrixSizeY() {
        let update = () => {
            this.addLineFields();
            this.dimY++;
        };
        this.update_(update);
    }

    reduceMatrixSizeY() {
        var update = () => {
            this.removeInput("line_" + (this.dimY - 1));
            this.dimY--;
        };
        this.update_(update);
    }

    addLineFields() {
        this.line[this.dimY] = this.appendDummyInput("line_" + this.dimY);
        for (let i = 0; i < this.dimX + 1; i++) {
            this.line[this.dimY].appendField(
                new Blockly.FieldTextInput("0"),
                "element_" + this.dimY + i
            );
        }
    }

    removeColumnFields() {
        for (let j = this.dimY - 1; j >= 0; j--) {
            this.line[j].removeField("element_" + j + (this.dimX - 1));
        }
    }

    addColumnFields() {
        for (let j = 0; j < this.dimY; j++) {
            this.line[j].appendField(
                new Blockly.FieldTextInput("0"),
                "element_" + j + this.dimX
            );
        }
    }

    update_(update) {
        return UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    }

    /**
     * Modify this block to have the correct matrix dimension.
     * @private
     * @this {Blockly.Block}
     */

    updateShape_() {
        let that = this;
        let remove = function () {
            that.reduceMatrixSizeX();
        };
        let add = () => {
            that.raiseMatrixSizeX();
        };

        // Remove all inputs
        if (this.getInput("TOP")) this.removeInput("TOP");

        let i = 0;
        let matrixData = [];
        while (this.getInput("line_" + i)) {
            matrixData.push(
                this.getInput("line_" + i)
                    .fieldRow.slice(1)
                    .map((item) => item.value_)
            );
            this.removeInput("line_" + i);
            i++;
        }
        var top = this.appendDummyInput("TOP");
        top.appendField(Blockly.Msg["NUMPY_SQUARE_MATRIX_TITLE"]);
        top.appendField(this.EMPTY_IMAGE_FACTORY(14));

        if (this.dimX > 1) {
            top.appendField(
                new Blockly.FieldImage(
                    this.REMOVE_IMAGE_DATAURI,
                    this.buttonSize,
                    this.buttonSize,
                    "*",
                    () => {
                        that.reduceMatrixSizeX();
                    },
                    false
                )
            );
        }

        if (this.dimX < 10) {
            top.appendField(
                new Blockly.FieldImage(
                    this.ADD_IMAGE_DATAURI,
                    this.buttonSize,
                    this.buttonSize,
                    "*",
                    () => {
                        that.raiseMatrixSizeX();
                    },
                    false
                )
            );
        }

        for (var j = 0; j < this.dimY; j++) {
            this.line[j] = this.appendDummyInput("line_" + j);
            if (j === 0 && this.dimY > 1) {
                this.line[j].appendField(
                    new Blockly.FieldImage(
                        this.REMOVE_IMAGE_DATAURI,
                        this.buttonSize,
                        this.buttonSize,
                        "*",
                        () => {
                            that.reduceMatrixSizeY();
                        },
                        false
                    )
                );
            } else if ((j === 1 && this.dimY < 10) || this.dimY === 1) {
                this.line[j].appendField(
                    new Blockly.FieldImage(
                        this.ADD_IMAGE_DATAURI,
                        this.buttonSize,
                        this.buttonSize,
                        "*",
                        () => {
                            that.raiseMatrixSizeY();
                        },
                        false
                    )
                );
            } else {
                this.line[j].appendField(this.EMPTY_IMAGE_FACTORY());
            }
            const matrixDataLine = matrixData[j] ?? [];
            for (var i = 0; i < this.dimX; i++) {
                this.line[j].appendField(
                    new Blockly.FieldNumber(matrixDataLine[i] ?? 0),
                    "element_" + j + i
                );
            }
            this.line[j].setAlign(Blockly.ALIGN_CENTRE);
        }
    }
}

// Initialization extensions
Blockly.Extensions.register(
    "numpy_square_matrix_init",
    NUMPY_SQUARE_MATRIX_INIT_EXTENSION
);

// Mutators
Blockly.Extensions.registerMutator(
    "numpy_square_matrix_mutator",
    NUMPY_SQUARE_MATRIX_MUTATOR_MIXIN
);

// PLUS-MINUS extension

const INIT_BUTTONS_ADD_AND_REMOVE = function () {
    /**
     * Image data URI of an LTR opening plus button
     * @readonly
     */
    this.ADD_IMAGE_DATAURI =
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0icmVwZWF0IgogICB4PSIwcHgiCiAgIHk9IjBweCIKICAgdmlld0JveD0iMCAwIDI0IDI0IgogICBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICBzb2RpcG9kaTpkb2NuYW1lPSJhZGQuc3ZnIj48bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGExNSI+PHJkZjpSREY+PGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz48ZGM6dGl0bGU+cmVwZWF0PC9kYzp0aXRsZT48L2NjOldvcms+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PGRlZnMKICAgICBpZD0iZGVmczEzIiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZjQ4MjEiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTY4MCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI5NjkiCiAgICAgaWQ9Im5hbWVkdmlldzExIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIxOS42NjY2NjciCiAgICAgaW5rc2NhcGU6Y3g9IjEyLjkxNTI1NCIKICAgICBpbmtzY2FwZTpjeT0iMTYuMDY3Nzk2IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0icmVwZWF0IiAvPjxzdHlsZQogICAgIHR5cGU9InRleHQvY3NzIgogICAgIGlkPSJzdHlsZTMiPgoJLnN0MHtmaWxsOiNDRjhCMTc7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPjx0aXRsZQogICAgIGlkPSJ0aXRsZTUiPnJlcGVhdDwvdGl0bGU+PHJlY3QKICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTtzdHJva2UtbGluZWNhcDpzcXVhcmU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MC4wNzg0MzEzNyIKICAgICBpZD0icmVjdDQxNDMiCiAgICAgd2lkdGg9IjQuMDUwMDAwMiIKICAgICBoZWlnaHQ9IjEyLjM5NzA1IgogICAgIHg9IjkuOTc1MDAwNCIKICAgICB5PSItMTguMTk4NTI2IgogICAgIHJ4PSIwLjgxIgogICAgIHJ5PSIwLjgxIgogICAgIHRyYW5zZm9ybT0ic2NhbGUoMSwtMSkiIC8+PHJlY3QKICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTtzdHJva2UtbGluZWNhcDpzcXVhcmU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MC4wNzg0MzEzNyIKICAgICBpZD0icmVjdDQxNDMtMSIKICAgICB3aWR0aD0iNC4wNTAwMDAyIgogICAgIGhlaWdodD0iMTIuMzk3MTE5IgogICAgIHg9IjkuOTc1MDAwNCIKICAgICB5PSI1LjgwMTQ0MDciCiAgICAgcng9IjAuODEiCiAgICAgcnk9IjAuODEiCiAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMCwxLDEsMCwwLDApIiAvPjxjaXJjbGUKICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6bm9uZTtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpzcXVhcmU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICBpZD0icGF0aDQxMzYiCiAgICAgY3g9IjEyIgogICAgIGN5PSIxMiIKICAgICByPSIxMC41MDMxOTEiIC8+PC9zdmc+";
    /**
     * Image data URI of an LTR opening minus button
     * @readonly
     */
    this.REMOVE_IMAGE_DATAURI =
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0icmVwZWF0IgogICB4PSIwcHgiCiAgIHk9IjBweCIKICAgdmlld0JveD0iMCAwIDI0IDI0IgogICBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICBzb2RpcG9kaTpkb2NuYW1lPSJyZW1vdmUuc3ZnIj48bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGExNSI+PHJkZjpSREY+PGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz48ZGM6dGl0bGU+cmVwZWF0PC9kYzp0aXRsZT48L2NjOldvcms+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PGRlZnMKICAgICBpZD0iZGVmczEzIiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZjFhZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTY4MCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI5NTAiCiAgICAgaWQ9Im5hbWVkdmlldzExIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIxOS42NjY2NjciCiAgICAgaW5rc2NhcGU6Y3g9IjAuMDUwODQ3NTIxIgogICAgIGlua3NjYXBlOmN5PSI5Ljk2NjEwMTciCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJyZXBlYXQiIC8+PHN0eWxlCiAgICAgdHlwZT0idGV4dC9jc3MiCiAgICAgaWQ9InN0eWxlMyI+Cgkuc3Qwe2ZpbGw6I0NGOEIxNzt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+PHRpdGxlCiAgICAgaWQ9InRpdGxlNSI+cmVwZWF0PC90aXRsZT48cmVjdAogICAgIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1saW5lY2FwOnNxdWFyZTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eTowLjA3ODQzMTM3IgogICAgIGlkPSJyZWN0NDE0My0xIgogICAgIHdpZHRoPSI0LjA1MDAwMDIiCiAgICAgaGVpZ2h0PSIxMi4zOTcxMTkiCiAgICAgeD0iOS45NzUwMDA0IgogICAgIHk9IjUuODAxNDQwNyIKICAgICByeD0iMC44MSIKICAgICByeT0iMC44MSIKICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLDEsMSwwLDAsMCkiIC8+PGNpcmNsZQogICAgIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnNxdWFyZTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIgogICAgIGlkPSJwYXRoNDEzNiIKICAgICBjeD0iMTIiCiAgICAgY3k9IjEyIgogICAgIHI9IjEwLjUwMzE5MSIgLz48L3N2Zz4=";
    this.buttonSize = 24;
    if (this.workspace.renderer_.name == "geras") {
        this.buttonSize = 19;
    }
    this.EMPTY_IMAGE_FACTORY = (width = this.buttonSize) =>
        new Blockly.FieldImage(" ", width, this.buttonSize, "*");
};

Blockly.Extensions.register(
    "block_buttons_plus_minus",
    INIT_BUTTONS_ADD_AND_REMOVE
);

export const matrix_js_gen = (block) =>
    valuePkg(
        makeJSArray(
            block.inputList
                .slice(1)
                .map((row) =>
                    makeJSArray(
                        row.fieldRow
                            .slice(1)
                            .map((field) => block.getFieldValue(field.name))
                    )
                )
        )
    );
