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
				type: 'controls_whileUntil'
			},
			{
				type: 'controls_for'
			}
		]
	},
	{
		name: 'Logic',
		colour: '210',
		blocks: [
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
		name: 'Math',
		colour: '190',
		blocks: [
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
				type: 'math_arithmetic'
			},
			{
				type: 'math_number'
			},
			{
				type: 'logic_boolean'
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
