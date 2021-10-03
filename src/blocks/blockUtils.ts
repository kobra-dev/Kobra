import Blockly from "blockly/core";
import "blockly/javascript_compressed";

export interface BlocklyJSDef {
    block: string;
    f: { (block: Blockly.Block): void };
}

export enum ArgType {
    Value,
    Variable,
    Field
}

export interface TypedArg {
    type: ArgType;
    arg: string;
}

export function constructCodeFromParams(
    block: Blockly.Block,
    method: string,
    ...args: string[] | TypedArg[]
): string {
    let result = method + "(";
    args.forEach(
        (arg: string | TypedArg, index: number) => {
            if (index !== 0) {
                result += ", ";
            }
            let resultAddition: string | undefined =
                undefined;
            if (typeof arg === "string") {
                // @ts-ignore
                resultAddition =
                    Blockly.JavaScript.valueToCode(
                        block,
                        arg,
                        // @ts-ignore
                        Blockly.JavaScript.ORDER_ATOMIC
                    );
            } else {
                let typedArg: TypedArg = arg as TypedArg;
                switch (typedArg.type) {
                    case ArgType.Value: {
                        // @ts-ignore
                        resultAddition =
                            Blockly.JavaScript.valueToCode(
                                block,
                                typedArg.arg,
                                // @ts-ignore
                                Blockly.JavaScript
                                    .ORDER_ATOMIC
                            );
                        break;
                    }
                    case ArgType.Variable: {
                        // @ts-ignore
                        resultAddition =
                            Blockly.JavaScript.variableDB_.getName(
                                block.getFieldValue(
                                    typedArg.arg
                                ),
                                Blockly.VARIABLE_CATEGORY_NAME
                            );
                        break;
                    }
                    case ArgType.Field: {
                        resultAddition =
                            '"' +
                            block
                                .getFieldValue(typedArg.arg)
                                .replace('"', '\\"') +
                            '"';
                        break;
                    }
                }
            }
            result +=
                resultAddition && resultAddition !== ""
                    ? resultAddition
                    : "undefined";
        }
    );
    result += ")";

    return result;
}

export function valuePkg(code: string): string[] {
    // @ts-ignore
    return [code, Blockly.JavaScript.ORDER_NONE];
}

// We don't really need a function for this but it makes things more consistent
export function statementPkg(code: string): string {
    return code + ";";
}

export const makeJSArray = (array: any[]) =>
    "[" +
    array.reduce((acc, cur, index) => acc + ", " + cur) +
    "]";
