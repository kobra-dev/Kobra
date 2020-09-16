import Blockly from 'blockly/core';
import 'blockly/javascript_compressed';

export function constructCodeFromParams(block : Blockly.Block, method : string, ...args : string[]) : string {
    let result = method + "(";
    args.forEach((arg : string, index : number) => {
        if(index !== 0) {
            result += ", ";
        }
        // @ts-ignore
        result += Blockly.JavaScript.valueToCode(block, arg, Blockly.JavaScript.ORDER_ATOMIC);
    });
    result += ")"
    
    return result;
}

export function valuePkg(code : string) : string[] {
    // @ts-ignore
    return [code, Blockly.JavaScript.ORDER_NONE];
}

// We don't really need a function for this but it makes things more consistent
export function statementPkg(code : string) : string {
    return code + ";"
}