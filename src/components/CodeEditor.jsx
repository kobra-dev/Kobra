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
	}
];

export default function CodeEditor() {
	return <ReactBlocklyComponent.BlocklyEditor toolboxCategories={_toolbox} />;
}
