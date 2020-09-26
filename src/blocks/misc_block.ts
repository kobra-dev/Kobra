import Blockly from 'blockly/core';
import {
    valuePkg,
    constructCodeFromParams,
    ArgType,
    statementPkg,
    BlocklyJSDef
} from './blockUtils';

export function text_print_console(item: any) {
    runnerConsole.log(item as string);
}

export async function text_prompt_console(type: string) {
    if(runnerConsoleGetInput === undefined) {
        throw new Error("text_prompt_console was not run through the console run button");
    }
    runnerConsole.setBusy(false);
    const result = await runnerConsoleGetInput();

    if(type === "number") {
        return Number(result);
    }
    return result;
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
        },
        {
            type: 'text_prompt_console',
            message0: 'prompt for %1',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'TYPE_DROPDOWN',
                    options: [['text', 'text'], ['number', 'number']]
                }
            ],
            output: null,
            colour: '#5ba58c'
        }
    ]);

    return [
        {
            block: 'text_print_console',
            f: (block) =>
                statementPkg(constructCodeFromParams(block, 'text_print_console', 'VALUE'))
        },
        {
            block: 'text_prompt_console',
            f: (block) =>
                valuePkg(constructCodeFromParams(block, 'await text_prompt_console', {
                    type: ArgType.Field,
                    arg: 'TYPE_DROPDOWN'
                }))
        }
    ];
}
