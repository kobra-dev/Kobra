import React from 'react';
import ReactBlocklyComponent from 'react-blockly';
import Blockly from 'blockly/core';
import 'blockly/javascript_compressed';

import { df_init_blocks } from './../blocks/DataFrame_block';
import { linr_init_blocks } from './../blocks/LinearRegression_block';
import { logr_init_blocks } from './../blocks/LogisticRegression_block';
import { knn_init_blocks } from './../blocks/KNN_block';

function concatToBlocklyJS(blocks) {
	blocks.forEach(block => {
		Blockly.JavaScript[block.block] = block.f;
	});
}

df_init_blocks();
concatToBlocklyJS(linr_init_blocks());
logr_init_blocks();
concatToBlocklyJS(knn_init_blocks());

const _toolbox = [
	{
		name: 'DataFrames',
		colour: '400',
		blocks: [
			{
				type: "df_create_empty"
			},
			{
				type: "df_create"
			},
			{
				type: "df_create_from_csv"
			},
			{
				type: "df_transpose"
			},
			{
				type: "df_loc"
			}
		]
	},
	{
		name: 'Linear Regression',
		colour: '190',
		blocks: [
			{
				type: "linr_create"
			},
			{
				type: "linr_fit"
			},
			{
				type: "linr_predict"
			}
		]
	},
	{
		name: 'Logistic Regression',
		colour: '80',
		blocks: [
			{
				type: "logr_create"
			},
			{
				type: "logr_fit"
			},
			{
				type: "logr_predict"
			}
		]
	},
	{
		name: 'K-nearest neighbors',
		colour: '70',
		blocks: [
			{
				type: "knn_create"
			},
			{
				type: "knn_fit"
			},
			{
				type: "knn_predict"
			}
		]
	},
	{
		name: 'Control',
		colour: '230',
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
		colour: '210',
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
		colour: '190',
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
		colour: '300',
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
				type: 'text_print'
			},
			{
				type: 'text_prompt_ext'
			},
			{
				type: 'text_helloworld'
			}
		]
	},
	{
		name: 'Loops',
		colour: '190',
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
		colour: '45',
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
		colour: '55',
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
	{ name: 'Variables', colour: '80', custom: 'VARIABLE' },
	{ name: 'Functions', colour: '150', custom: 'PROCEDURE' }
];

Blockly.defineBlocksWithJsonArray([{
	"type": "text_helloworld",
	"message0": "Hello world!",
	"output": "string"
}]);

Blockly.JavaScript['text_helloworld'] = block => {
	return "Hello world!";
}

export function testBuild() {
	console.log(Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace()));
}

export default function CodeEditor() {
	return (
		<ReactBlocklyComponent.BlocklyEditor
			toolboxCategories={_toolbox}
			style={{ height: 500 }}
			wrapperDivClassName="codeEditor"
		/>
	);

}