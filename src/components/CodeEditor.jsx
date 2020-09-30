import React, { useEffect } from 'react';
import ReactBlocklyComponent from 'react-blockly';
import Blockly from 'blockly/core';
import 'blockly/javascript_compressed';

import { df_init_blocks } from './../blocks/DataFrame_block';
import { dv_init_blocks } from './../blocks/DataView_block';
import { linr_init_blocks } from './../blocks/LinearRegression_block';
import { logr_init_blocks } from './../blocks/LogisticRegression_block';
import { knn_init_blocks } from './../blocks/KNN_block';
import { rfc_init_blocks } from './../blocks/RFClassifier_block';
import { misc_init_blocks } from './../blocks/misc_block';

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
concatToBlocklyJS(dv_init_blocks());
concatToBlocklyJS(linr_init_blocks());
concatToBlocklyJS(logr_init_blocks());
concatToBlocklyJS(knn_init_blocks());
concatToBlocklyJS(rfc_init_blocks());
concatToBlocklyJS(misc_init_blocks());

const _toolbox = [
	{
		name: 'DataFrames',
		colour: '90',
		blocks: [
			{
				type: 'df_create_empty'
			},
			{
				type: 'df_create'
			},
			{
				type: 'df_create_from_csv'
			},
			{
				type: 'df_transpose'
			},
			{
				type: 'df_loc'
			}
		]
	},
	{
		name: 'Plots',
		colour: '90',
		blocks: [
			{
				type: 'dv_set_is_active'
			},
			{
				type: 'dv_set_title'
			},
			{
				type: 'dv_add_series'
			}
		]
	},
	{
		name: 'Linear Regression',
		colour: '0',
		blocks: [
			{
				type: 'linr_create'
			},
			{
				type: 'linr_fit'
			},
			{
				type: 'linr_predict'
			}
		]
	},
	{
		name: 'Logistic Regression',
		colour: '60',
		blocks: [
			{
				type: 'logr_create'
			},
			{
				type: 'logr_fit'
			},
			{
				type: 'logr_predict'
			}
		]
	},
	{
		name: 'K-nearest neighbors',
		colour: '300',
		blocks: [
			{
				type: 'knn_create'
			},
			{
				type: 'knn_fit'
			},
			{
				type: 'knn_predict'
			}
		]
	},
	{
		name: 'Random forest',
		colour: '150',
		blocks: [
			{
				type: 'rfc_create'
			},
			{
				type: 'rfc_fit'
			},
			{
				type: 'rfc_predict'
			}
		]
	},
	{
		name: 'Control',
		colour: '#5b80a5',
		blocks: [
			{
				type: 'controls_if'
			},
			{
				type: 'controls_ifelse'
			},
			{
				type: 'controls_if_if'
			},
			{
				type: 'controls_if_elseif'
			},
			{
				type: 'controls_if_else'
			}
		]
	},
	{
		name: 'Logic',
		colour: '#5b80a5',
		blocks: [
			{
				type: 'logic_boolean'
			},
			{
				type: 'logic_compare'
			},
			{
				type: 'logic_operation'
			},
			{
				type: 'logic_negate'
			},
			{
				type: 'logic_null'
			},
			{
				type: 'logic_ternary'
			}
		]
	},
	{
		name: 'Math',
		colour: '#5b67a5',
		blocks: [
			{
				type: 'math_number'
			},
			{
				type: 'math_arithmetic'
			},
			{
				type: 'math_single'
			},
			{
				type: 'math_trig'
			},
			{
				type: 'math_constant'
			},
			{
				type: 'math_number_property'
			},
			{
				type: 'math_change'
			},
			{
				type: 'math_round'
			},
			{
				type: 'math_on_list'
			},
			{
				type: 'math_modulo'
			},
			{
				type: 'math_constrain'
			},
			{
				type: 'math_random_int'
			},
			{
				type: 'math_random_float'
			},
			{
				type: 'math_atan2'
			}
		]
	},
	{
		name: 'Text',
		colour: '#5ba58c',
		blocks: [
			{
				type: 'text'
			},
			{
				type: 'text_join'
			},
			{
				type: 'text_append'
			},
			{
				type: 'text_length'
			},
			{
				type: 'text_isEmpty'
			},
			{
				type: 'text_indexOf'
			},
			{
				type: 'text_charAt'
			},
			{
				type: 'text_getSubstring'
			},
			{
				type: 'text_changeCase'
			},
			{
				type: 'text_trim'
			},
			{
				type: 'text_print_console'
			},
			{
				type: 'text_prompt_console'
			}
		]
	},
	{
		name: 'Loops',
		colour: '#5ba55b',
		blocks: [
			{
				type: 'controls_repeat_ext'
			},
			{
				type: 'controls_repeat'
			},
			{
				type: 'controls_whileUntil'
			},
			{
				type: 'controls_for'
			},
			{
				type: 'controls_forEach'
			},
			{
				type: 'controls_flow_statements'
			}
		]
	},
	{
		name: 'Colour',
		colour: '#a5745b',
		blocks: [
			{
				type: 'colour_picker'
			},
			{
				type: 'colour_random'
			},
			{
				type: 'colour_rgb'
			},
			{
				type: 'colour_blend'
			}
		]
	},
	{
		name: 'Lists',
		colour: '#745ba5',
		blocks: [
			{
				type: 'lists_create_empty'
			},
			{
				type: 'lists_repeat'
			},
			{
				type: 'lists_reverse'
			},
			{
				type: 'lists_isEmpty'
			},
			{
				type: 'lists_length'
			},
			{
				type: 'lists_create_with'
			},
			{
				type: 'lists_create_with_container'
			},
			{
				type: 'lists_create_with_item'
			},
			{
				type: 'lists_indexOf'
			},
			{
				type: 'lists_getIndex'
			},
			{
				type: 'lists_setIndex'
			},
			{
				type: 'lists_getSublist'
			},
			{
				type: 'lists_sort'
			},
			{
				type: 'lists_split'
			}
		]
	},
	{ name: 'Variables', colour: '#a55b80', custom: 'VARIABLE' },
	{ name: 'Functions', colour: '#995ba5', custom: 'PROCEDURE' }
];

export function getCode() {
	return Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
}

export default function CodeEditor() {
	useEffect(() => {
		const targetNode = document.getElementsByTagName("ion-app")[0];
		const config = { attributes: true, childList: false, subtree: false };
		const callback = (_mutationsList, observer) => {
			window.dispatchEvent(new Event('resize'));
			observer.disconnect();
		}
		const observer = new MutationObserver(callback);
		observer.observe(targetNode, config);
	}, []);
	
	return (
		<ReactBlocklyComponent.BlocklyEditor
			toolboxCategories={_toolbox}
			style={{ height: 500 }}
			wrapperDivClassName="codeEditor"
		/>
	);
}

export function componentDidMount() {
	console.log('componentdidmount called');
	Blockly.getMainWorkspace().setTheme(Blockly.Themes.Dark);
}
