import { LinReg } from './LinearRegression';
import Blockly from 'blockly/core';
import 'blockly/javascript_compressed';
import { constructCodeFromParams, valuePkg, statementPkg } from './blockUtils';

export function linr_create(x : number[], y : number[]) : LinReg {
    let lr = new LinReg();
    lr.loadData(x, y);
    return lr;
}

export function linr_fit(lr : LinReg) : void {
    lr.fit();
}

export function linr_predict(lr : LinReg, x : number) : number {
    return lr.predict(x);
}

export function linr_init_blocks() : { block : string, f : { (block : Blockly.Block) : void; } }[] {
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "linr_create",
            "message0": "linear regression model: %1 Training data x: %2 Training data y: %3",
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "X_VAL",
                    "check": "Array"
                },
                {
                    "type": "input_value",
                    "name": "Y_VAL",
                    "check": "Array"
                }
            ],
            "inputsInline": false,
            "output": "LinReg"
        },
        {
            "type": "linr_fit",
            "message0": "fit linear regression model %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "LinReg"
                }
            ],
            "previousStatement": null,
            "nextStatement": null
        },
        {
            "type": "linr_predict",
            "message0": "predict with linear regression model %1 input: %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "MODEL_VAL",
                    "check": "LinReg"
                },
                {
                    "type": "input_value",
                    "name": "INPUT_VAL",
                    "check": "Number"
                }
            ],
            "output": "Number"
        }
    ]);

    return [
        {
            block: 'linr_create',
            f: block => valuePkg(constructCodeFromParams(block, "linr_create", 'X_VAL', 'Y_VAL'))
        },
        {
            block: 'linr_fit',
            f: block => statementPkg(constructCodeFromParams(block, "linr_fit", 'VALUE'))
        },
        {
            block: 'linr_predict',
            f: block => valuePkg(constructCodeFromParams(block, "linr_predict", 'MODEL_VAL', 'INPUT_VAL'))
        }
    ];
}