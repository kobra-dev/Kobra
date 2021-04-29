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

const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
    kind: "categoryToolbox",
    /*contents: [
    {
      "name": "Values",
      "kind": "category",
      "contents": [
        {
          "type": "logic_boolean",
          "kind": "block"
        },
        {
          "type": "math_number",
          "kind": "block"
        },
        {
          "type": "text",
          "kind": "block"
        },
        {
          "type": "colour_picker",
          "kind": "block"
        }
      ]
    },
    {
      "name": "DataFrames",
      "colour": "90",
      "kind": "category",
      "contents": [
        {
          "type": "df_matrix",
          "kind": "block"
        },
        {
          "type": "df_create_empty",
          "kind": "block"
        },
        {
          "type": "df_create",
          "kind": "block"
        },
        {
          "type": "df_load_file",
          "kind": "block"
        },
        {
          "type": "df_transpose",
          "kind": "block"
        },
        {
          "type": "df_loc",
          "kind": "block"
        },
        {
          "type": "df_col_to_array",
          "kind": "block"
        }
      ]
    },
    {
      "name": "Plots",
      "colour": "110",
      "kind": "category",
      "contents": [
        {
          "type": "dv_reset",
          "kind": "block"
        },
        {
          "type": "dv_set_is_active",
          "kind": "block"
        },
        {
          "type": "dv_set_title",
          "kind": "block"
        },
        {
          "type": "dv_add_series",
          "kind": "block"
        },
        {
          "type": "dv_remove_series",
          "kind": "block"
        }
      ]
    },
    {
      "kind": "sep",
      "cssConfig": {
        "container": "sep_ml"
      }
    },
    {
      "name": "Linear regression",
      "colour": "0",
      "kind": "category",
      "contents": [
        {
          "type": "linr_create",
          "kind": "block"
        },
        {
          "type": "linr_fit",
          "kind": "block"
        },
        {
          "type": "linr_predict",
          "kind": "block"
        }
      ]
    },
    {
      "name": "Logistic regression",
      "colour": "60",
      "kind": "category",
      "contents": [
        {
          "type": "logr_create",
          "kind": "block"
        },
        {
          "type": "logr_fit",
          "kind": "block"
        },
        {
          "type": "logr_predict",
          "kind": "block"
        }
      ]
    },
    {
      "name": "K-nearest neighbors",
      "colour": "300",
      "kind": "category",
      "contents": [
        {
          "type": "knn_create",
          "kind": "block"
        },
        {
          "type": "knn_fit",
          "kind": "block"
        },
        {
          "type": "knn_predict",
          "kind": "block"
        }
      ]
    },
    {
      "name": "Random forest",
      "colour": "150",
      "kind": "category",
      "contents": [
        {
          "type": "rfc_create",
          "kind": "block"
        },
        {
          "type": "rfc_fit",
          "kind": "block"
        },
        {
          "type": "rfc_predict",
          "kind": "block"
        },
        {
          "type": "rfr_create",
          "kind": "block"
        },
        {
          "type": "rfr_fit",
          "kind": "block"
        },
        {
          "type": "rfr_predict",
          "kind": "block"
        }
      ]
    },
    {
      "name": "Support vector",
      "colour": "150",
      "kind": "category",
      "contents": [
        {
          "type": "svc_create",
          "kind": "block"
        },
        {
          "type": "svc_fit",
          "kind": "block"
        },
        {
          "type": "svc_predict",
          "kind": "block"
        }
      ]
    },
    {
      "kind": "sep",
      "cssConfig": {
        "container": "custom_sep"
      }
    },
    {
      "name": "Logic",
      "colour": "#5b80a5",
      "kind": "category",
      "contents": [
        {
          "type": "controls_if",
          "kind": "block"
        },
        {
          "type": "controls_ifelse",
          "kind": "block"
        },
        {
          "type": "logic_boolean",
          "kind": "block"
        },
        {
          "type": "logic_compare",
          "kind": "block"
        },
        {
          "type": "logic_operation",
          "kind": "block"
        },
        {
          "type": "logic_negate",
          "kind": "block"
        },
        {
          "type": "logic_null",
          "kind": "block"
        },
        {
          "type": "logic_ternary",
          "kind": "block"
        }
      ]
    },
    {
      "name": "Math",
      "colour": "#5b67a5",
      "kind": "category",
      "contents": [
        {
          "type": "math_number",
          "kind": "block"
        },
        {
          "type": "math_arithmetic",
          "kind": "block"
        },
        {
          "type": "math_single",
          "kind": "block"
        },
        {
          "type": "math_trig",
          "kind": "block"
        },
        {
          "type": "math_constant",
          "kind": "block"
        },
        {
          "type": "math_number_property",
          "kind": "block"
        },
        {
          "type": "math_change",
          "kind": "block"
        },
        {
          "type": "math_round",
          "kind": "block"
        },
        {
          "type": "math_on_list",
          "kind": "block"
        },
        {
          "type": "math_modulo",
          "kind": "block"
        },
        {
          "type": "math_constrain",
          "kind": "block"
        },
        {
          "type": "math_random_int",
          "kind": "block"
        },
        {
          "type": "math_random_float",
          "kind": "block"
        },
        {
          "type": "math_atan2",
          "kind": "block"
        }
      ]
    },
    {
      "name": "Text",
      "colour": "#5ba58c",
      "kind": "category",
      "contents": [
        {
          "type": "text",
          "kind": "block"
        },
        {
          "type": "text_join",
          "kind": "block"
        },
        {
          "type": "text_append",
          "kind": "block"
        },
        {
          "type": "text_length",
          "kind": "block"
        },
        {
          "type": "text_isEmpty",
          "kind": "block"
        },
        {
          "type": "text_indexOf",
          "kind": "block"
        },
        {
          "type": "text_charAt",
          "kind": "block"
        },
        {
          "type": "text_getSubstring",
          "kind": "block"
        },
        {
          "type": "text_changeCase",
          "kind": "block"
        },
        {
          "type": "text_trim",
          "kind": "block"
        },
        {
          "type": "text_print_console",
          "kind": "block"
        },
        {
          "type": "text_prompt_console",
          "kind": "block"
        }
      ]
    },
    {
      "name": "Loops",
      "colour": "#5ba55b",
      "kind": "category",
      "contents": [
        {
          "type": "controls_repeat_ext",
          "kind": "block"
        },
        {
          "type": "controls_repeat",
          "kind": "block"
        },
        {
          "type": "controls_whileUntil",
          "kind": "block"
        },
        {
          "type": "controls_for",
          "kind": "block"
        },
        {
          "type": "controls_forEach",
          "kind": "block"
        },
        {
          "type": "controls_flow_statements",
          "kind": "block"
        }
      ]
    },
    {
      "name": "Color",
      "colour": "#a5745b",
      "kind": "category",
      "contents": [
        {
          "type": "colour_picker",
          "kind": "block"
        },
        {
          "type": "colour_random",
          "kind": "block"
        },
        {
          "type": "colour_rgb",
          "kind": "block"
        },
        {
          "type": "colour_blend",
          "kind": "block"
        }
      ]
    },
    {
      "name": "Lists",
      "colour": "#745ba5",
      "kind": "category",
      "contents": [
        {
          "type": "lists_create_empty",
          "kind": "block"
        },
        {
          "type": "lists_repeat",
          "kind": "block"
        },
        {
          "type": "lists_reverse",
          "kind": "block"
        },
        {
          "type": "lists_isEmpty",
          "kind": "block"
        },
        {
          "type": "lists_length",
          "kind": "block"
        },
        {
          "type": "lists_create_with",
          "kind": "block"
        },
        {
          "type": "lists_indexOf",
          "kind": "block"
        },
        {
          "type": "lists_getIndex",
          "kind": "block"
        },
        {
          "type": "lists_setIndex",
          "kind": "block"
        },
        {
          "type": "lists_getSublist",
          "kind": "block"
        },
        {
          "type": "lists_sort",
          "kind": "block"
        },
        {
          "type": "lists_split",
          "kind": "block"
        }
      ]
    },
    {
      "name": "Variables",
      "colour": "#a55b80",
      "custom": "VARIABLE",
      "kind": "category"
    },
    {
      "name": "Functions",
      "colour": "#995ba5",
      "custom": "PROCEDURE",
      "kind": "category"
    }
  ]*/
    contents: [
        {
            name: "Values",
            kind: "category",
            contents: [
                {
                    type: "logic_boolean",
                    kind: "block"
                },
                {
                    type: "math_number",
                    kind: "block"
                },
                {
                    type: "text",
                    kind: "block"
                },
                {
                    type: "colour_picker",
                    kind: "block"
                }
            ]
        },
        {
            kind: "category",
            name: "DataFrames",
            colour: "90",
            contents: [
                {
                    kind: "block",
                    blockxml: '<block type="df_matrix"/>'
                },
                {
                    kind: "block",
                    blockxml: '<block type="df_create_empty"/>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="df_create">\n            <value name="HEAD_VAL">\n                <shadow type="text">\n                    <field name="TEXT">Col1, Col2</field>\n                </shadow>\n            </value>\n            <value name="DATA_VAL">\n                <shadow type="lists_create_with">\n                   <mutation items="3"/>\n                   <value name="ADD0">\n                     <shadow type="text">\n                       <field name="TEXT">1,5</field>\n                     </shadow>\n                   </value>\n                   <value name="ADD1">\n                     <shadow type="text">\n                       <field name="TEXT">2,4</field>\n                     </shadow>\n                   </value>\n                   <value name="ADD2">\n                     <shadow type="text">\n                       <field name="TEXT">3,3</field>\n                     </shadow>\n                   </value>\n                </shadow>\n            </value>\n        </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="df_load_file">\n            <value name="NAME_VAL">\n                <shadow type="text">\n                    <field name="TEXT">file.csv</field>\n                </shadow>\n            </value>\n        </block>'
                },
                {
                    kind: "block",
                    blockxml: '<block type="df_transpose"/>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="df_loc">\n            <value name="COL_VAL">\n                <shadow type="lists_create_with">\n                   <mutation items="2"/>\n                   <value name="ADD0">\n                     <shadow type="text">\n                       <field name="TEXT">Col1</field>\n                     </shadow>\n                   </value>\n                   <value name="ADD1">\n                     <shadow type="text">\n                       <field name="TEXT">Col2</field>\n                     </shadow>\n                   </value>\n                </shadow>\n            </value>\n        </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="df_col_to_array">\n            <value name="COL_VAL">\n                <shadow type="text">\n                    <field name="TEXT">Col1</field>\n                </shadow>\n            </value>\n        </block>'
                }
            ]
        },
        {
            name: "Plots",
            colour: "110",
            kind: "category",
            contents: [
                {
                    type: "dv_reset",
                    kind: "block"
                },
                {
                    type: "dv_set_is_active",
                    kind: "block"
                },
                {
                    type: "dv_set_title",
                    kind: "block"
                },
                {
                    type: "dv_add_series",
                    kind: "block"
                },
                {
                    type: "dv_remove_series",
                    kind: "block"
                }
            ]
        },
        {
            kind: "sep",
            cssConfig: {
                container: "sep_ml"
            }
        },
        {
            name: "Linear regression",
            colour: "0",
            kind: "category",
            contents: [
                {
                    type: "linr_create",
                    kind: "block"
                },
                {
                    type: "linr_fit",
                    kind: "block"
                },
                {
                    type: "linr_predict",
                    kind: "block"
                }
            ]
        },
        {
            name: "Logistic regression",
            colour: "60",
            kind: "category",
            contents: [
                {
                    type: "logr_create",
                    kind: "block"
                },
                {
                    type: "logr_fit",
                    kind: "block"
                },
                {
                    type: "logr_predict",
                    kind: "block"
                }
            ]
        },
        {
            name: "K-nearest neighbors",
            colour: "300",
            kind: "category",
            contents: [
                {
                    type: "knn_create",
                    kind: "block"
                },
                {
                    type: "knn_fit",
                    kind: "block"
                },
                {
                    type: "knn_predict",
                    kind: "block"
                }
            ]
        },
        {
            name: "Random forest",
            colour: "150",
            kind: "category",
            contents: [
                {
                    type: "rfc_create",
                    kind: "block"
                },
                {
                    type: "rfc_fit",
                    kind: "block"
                },
                {
                    type: "rfc_predict",
                    kind: "block"
                },
                {
                    type: "rfr_create",
                    kind: "block"
                },
                {
                    type: "rfr_fit",
                    kind: "block"
                },
                {
                    type: "rfr_predict",
                    kind: "block"
                }
            ]
        },
        {
            name: "Support vector",
            colour: "150",
            kind: "category",
            contents: [
                {
                    type: "svc_create",
                    kind: "block"
                },
                {
                    type: "svc_fit",
                    kind: "block"
                },
                {
                    type: "svc_predict",
                    kind: "block"
                }
            ]
        },
        {
            kind: "sep",
            cssConfig: {
                container: "custom_sep"
            }
        },

        {
            kind: "category",
            name: "Logic",
            colour: "#5b80a5",
            contents: [
                {
                    kind: "block",
                    blockxml: '<block type="controls_if"/>'
                },
                {
                    kind: "block",
                    blockxml: '<block type="controls_ifelse"/>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="logic_compare">\n      <field name="OP">EQ</field>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="logic_operation">\n      <field name="OP">AND</field>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml: '<block type="logic_negate"/>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="logic_boolean">\n      <field name="BOOL">TRUE</field>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml: '<block type="logic_null"/>'
                },
                {
                    kind: "block",
                    blockxml: '<block type="logic_ternary"/>'
                }
            ]
        },
        {
            kind: "category",
            name: "Loops",
            colour: "#5ba55b",
            contents: [
                {
                    kind: "block",
                    blockxml:
                        '<block type="controls_repeat_ext">\n      <value name="TIMES">\n        <shadow type="math_number">\n          <field name="NUM">10</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="controls_whileUntil">\n      <field name="MODE">WHILE</field>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="controls_for">\n      <field name="VAR" id="V))%dWHjve?Io5K}@vCS">i</field>\n      <value name="FROM">\n        <shadow type="math_number">\n          <field name="NUM">1</field>\n        </shadow>\n      </value>\n      <value name="TO">\n        <shadow type="math_number">\n          <field name="NUM">10</field>\n        </shadow>\n      </value>\n      <value name="BY">\n        <shadow type="math_number">\n          <field name="NUM">1</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="controls_forEach">\n      <field name="VAR" id="g1@h[5;{bmoSBZ.xVnmf">j</field>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="controls_flow_statements">\n      <field name="FLOW">BREAK</field>\n    </block>'
                }
            ]
        },
        {
            kind: "category",
            name: "Math",
            colour: "#5b67a5",
            contents: [
                {
                    kind: "block",
                    blockxml:
                        '<block type="math_number">\n      <field name="NUM">0</field>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="math_arithmetic">\n      <field name="OP">ADD</field>\n      <value name="A">\n        <shadow type="math_number">\n          <field name="NUM">1</field>\n        </shadow>\n      </value>\n      <value name="B">\n        <shadow type="math_number">\n          <field name="NUM">1</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="math_single">\n      <field name="OP">ROOT</field>\n      <value name="NUM">\n        <shadow type="math_number">\n          <field name="NUM">9</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="math_trig">\n      <field name="OP">SIN</field>\n      <value name="NUM">\n        <shadow type="math_number">\n          <field name="NUM">45</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="math_constant">\n      <field name="CONSTANT">PI</field>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="math_number_property">\n      <mutation divisor_input="false"/>\n      <field name="PROPERTY">EVEN</field>\n      <value name="NUMBER_TO_CHECK">\n        <shadow type="math_number">\n          <field name="NUM">0</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="math_round">\n      <field name="OP">ROUND</field>\n      <value name="NUM">\n        <shadow type="math_number">\n          <field name="NUM">3.1</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="math_on_list">\n      <mutation op="SUM"/>\n      <field name="OP">SUM</field>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="math_modulo">\n      <value name="DIVIDEND">\n        <shadow type="math_number">\n          <field name="NUM">64</field>\n        </shadow>\n      </value>\n      <value name="DIVISOR">\n        <shadow type="math_number">\n          <field name="NUM">10</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="math_constrain">\n      <value name="VALUE">\n        <shadow type="math_number">\n          <field name="NUM">50</field>\n        </shadow>\n      </value>\n      <value name="LOW">\n        <shadow type="math_number">\n          <field name="NUM">1</field>\n        </shadow>\n      </value>\n      <value name="HIGH">\n        <shadow type="math_number">\n          <field name="NUM">100</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="math_random_int">\n      <value name="FROM">\n        <shadow type="math_number">\n          <field name="NUM">1</field>\n        </shadow>\n      </value>\n      <value name="TO">\n        <shadow type="math_number">\n          <field name="NUM">100</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml: '<block type="math_random_float"/>'
                }
            ]
        },
        {
            kind: "category",
            name: "Text",
            colour: "#5ba58c",
            contents: [
                {
                    kind: "block",
                    blockxml:
                        '<block type="text">\n      <field name="TEXT"/>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="text_print_console">\n      <value name="VALUE">\n        <shadow type="text">\n          <field name="TEXT">abc</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="text_prompt_console">\n      <mutation type="TEXT"/>\n      <field name="TYPE">TEXT</field>\n      <value name="TEXT">\n        <shadow type="text">\n          <field name="TEXT">abc</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="text_join">\n      <mutation items="2"/>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="text_append">\n      <field name="VAR" id="Z!YjMgk~iD.eU-c?1f#~">item</field>\n      <value name="TEXT">\n        <shadow type="text">\n          <field name="TEXT"/>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="text_length">\n      <value name="VALUE">\n        <shadow type="text">\n          <field name="TEXT">abc</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="text_isEmpty">\n      <value name="VALUE">\n        <shadow type="text">\n          <field name="TEXT"/>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="text_indexOf">\n      <field name="END">FIRST</field>\n      <value name="VALUE">\n        <block type="variables_get">\n          <field name="VAR" id="61)_0I6ELfX^(JbCQ_)P">text</field>\n        </block>\n      </value>\n      <value name="FIND">\n        <shadow type="text">\n          <field name="TEXT">abc</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="text_charAt">\n      <mutation at="true"/>\n      <field name="WHERE">FROM_START</field>\n      <value name="VALUE">\n        <block type="variables_get">\n          <field name="VAR" id="61)_0I6ELfX^(JbCQ_)P">text</field>\n        </block>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="text_getSubstring">\n      <mutation at1="true" at2="true"/>\n      <field name="WHERE1">FROM_START</field>\n      <field name="WHERE2">FROM_START</field>\n      <value name="STRING">\n        <block type="variables_get">\n          <field name="VAR" id="61)_0I6ELfX^(JbCQ_)P">text</field>\n        </block>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="text_changeCase">\n      <field name="CASE">UPPERCASE</field>\n      <value name="TEXT">\n        <shadow type="text">\n          <field name="TEXT">abc</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="text_trim">\n      <field name="MODE">BOTH</field>\n      <value name="TEXT">\n        <shadow type="text">\n          <field name="TEXT">abc</field>\n        </shadow>\n      </value>\n    </block>'
                }
            ]
        },
        {
            kind: "category",
            name: "Lists",
            colour: "#745ba5",
            contents: [
                {
                    kind: "block",
                    blockxml:
                        '<block type="lists_create_with">\n      <mutation items="0"/>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="lists_create_with">\n      <mutation items="3"/>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="lists_repeat">\n      <value name="NUM">\n        <shadow type="math_number">\n          <field name="NUM">5</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="lists_reverse">\n      <value name="LIST">\n        <block type="variables_get">\n          <field name="VAR" id="IQdlM~{0XjLm?P@uE(H:">list</field>\n        </block>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml: '<block type="lists_length"/>'
                },
                {
                    kind: "block",
                    blockxml: '<block type="lists_isEmpty"/>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="lists_indexOf">\n      <field name="END">FIRST</field>\n      <value name="VALUE">\n        <block type="variables_get">\n          <field name="VAR" id="IQdlM~{0XjLm?P@uE(H:">list</field>\n        </block>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="lists_getIndex">\n      <mutation statement="false" at="true"/>\n      <field name="MODE">GET</field>\n      <field name="WHERE">FROM_START</field>\n      <value name="VALUE">\n        <block type="variables_get">\n          <field name="VAR" id="IQdlM~{0XjLm?P@uE(H:">list</field>\n        </block>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="lists_setIndex">\n      <mutation at="true"/>\n      <field name="MODE">SET</field>\n      <field name="WHERE">FROM_START</field>\n      <value name="LIST">\n        <block type="variables_get">\n          <field name="VAR" id="IQdlM~{0XjLm?P@uE(H:">list</field>\n        </block>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="lists_getSublist">\n      <mutation at1="true" at2="true"/>\n      <field name="WHERE1">FROM_START</field>\n      <field name="WHERE2">FROM_START</field>\n      <value name="LIST">\n        <block type="variables_get">\n          <field name="VAR" id="IQdlM~{0XjLm?P@uE(H:">list</field>\n        </block>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="lists_split">\n      <mutation mode="SPLIT"/>\n      <field name="MODE">SPLIT</field>\n      <value name="DELIM">\n        <shadow type="text">\n          <field name="TEXT">,</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="lists_sort">\n      <field name="TYPE">NUMERIC</field>\n      <field name="DIRECTION">1</field>\n    </block>'
                }
            ]
        },
        {
            kind: "category",
            name: "Color",
            colour: "#a5745b",
            contents: [
                {
                    kind: "block",
                    blockxml:
                        '<block type="colour_picker">\n      <field name="COLOUR">#ff0000</field>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml: '<block type="colour_random"/>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="colour_rgb">\n      <value name="RED">\n        <shadow type="math_number">\n          <field name="NUM">100</field>\n        </shadow>\n      </value>\n      <value name="GREEN">\n        <shadow type="math_number">\n          <field name="NUM">50</field>\n        </shadow>\n      </value>\n      <value name="BLUE">\n        <shadow type="math_number">\n          <field name="NUM">0</field>\n        </shadow>\n      </value>\n    </block>'
                },
                {
                    kind: "block",
                    blockxml:
                        '<block type="colour_blend">\n      <value name="COLOUR1">\n        <shadow type="colour_picker">\n          <field name="COLOUR">#ff0000</field>\n        </shadow>\n      </value>\n      <value name="COLOUR2">\n        <shadow type="colour_picker">\n          <field name="COLOUR">#3333ff</field>\n        </shadow>\n      </value>\n      <value name="RATIO">\n        <shadow type="math_number">\n          <field name="NUM">0.5</field>\n        </shadow>\n      </value>\n    </block>'
                }
            ]
        },
        {
            kind: "sep",
            cssConfig: {
                container: "custom_sep"
            }
        },
        {
            kind: "category",
            name: "Variables",
            colour: "#a55b80",
            custom: "VARIABLE"
        },
        {
            kind: "category",
            name: "Functions",
            colour: "#995ba5",
            custom: "PROCEDURE"
        }
    ]
};

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
