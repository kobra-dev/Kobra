//@ts-nocheck
import React, { useEffect, useMemo, useRef } from 'react';
import { useDarkTheme } from './DarkThemeProvider';
import Blockly from 'blockly/core';
import locale from 'blockly/msg/en';
import 'blockly/blocks_compressed';
import 'blockly/javascript_compressed';
import '@blockly/block-plus-minus';

import { df_init_blocks } from '../blocks/DataFrame_block';
import { dv_init_blocks } from '../blocks/DataView_block';
import { misc_init_blocks } from '../blocks/misc_block';

import { init_blocks } from '../blocks/ML_block';
import { matrix_js_gen } from '../blocks/matrix_block';

import Head from 'next/head';

Blockly.setLocale(locale);

// Allow for blocks to be highlighted as a program runs
Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
// Everything that is in RunnerContext.ts
// Some of these probably aren't accessible to the evaled code but it doesn't hurt to include them
Blockly.JavaScript.addReservedWords(
  'highlightBlock',
  'RunnerContext',
  'importedBlocksIterate',
  'importedBlocks',
  'Blockly',
  'globalThis',
  'runnerConsole',
  'runnerConsoleGetInput'
);

function concatToBlocklyJS(blocks) {
  blocks.forEach((block) => {
    Blockly.JavaScript[block.block] = block.f;
  });
}

concatToBlocklyJS(df_init_blocks());
Blockly.JavaScript['df_matrix'] = matrix_js_gen;
concatToBlocklyJS(dv_init_blocks());
concatToBlocklyJS(misc_init_blocks());

concatToBlocklyJS(init_blocks());

const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
  kind: "categoryToolbox",
  contents: [
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
  ]
}

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
      toolbox
    });
    window.addEventListener('resize', () => {
      Blockly.svgResize(ws);
    }, false);
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
    margin: 5px 0;
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
      <div ref={wrapperRef} className={props.className}/>
    </>
  );
}
