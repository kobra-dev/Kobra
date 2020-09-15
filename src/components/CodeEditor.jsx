import React from 'react';
import ReactBlocklyComponent from 'react-blockly';

const _toolbox = [
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
				type: 'logic_operation'
			},
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
				type: 'logic_boolean'
			},
			{
				type: 'logic_compare'
			},
			{
				type: 'logic_operation'
			},
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
				type: 'logic_boolean'
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
export default function CodeEditor() {
	return (
		<ReactBlocklyComponent.BlocklyEditor
			toolboxCategories={_toolbox}
			style={{ height: 500 }}
			wrapperDivClassName="codeEditor"
		/>
	);
}
