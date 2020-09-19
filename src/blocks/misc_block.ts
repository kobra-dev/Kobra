import Blockly from 'blockly/core';
import {
  constructCodeFromParams,
  statementPkg,
  BlocklyJSDef
} from './blockUtils';

export function text_print_console(item : any) {
    globalThis.runnerConsole.log(item as string);
}

export function misc_init_blocks(): BlocklyJSDef[] {
  Blockly.defineBlocksWithJsonArray([
    {
      type: 'text_print_console',
      message0: 'print %1',
      args0: [
        {
          type: 'input_value',
          name: 'VALUE'
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#5ba58c'
    }
  ]);

  return [
    {
      block: 'text_print_console',
      f: (block) =>
        statementPkg(constructCodeFromParams(block, 'text_print_console', 'VALUE'))
    }
  ];
}
