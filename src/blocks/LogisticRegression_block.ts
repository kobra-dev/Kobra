import { LogReg } from './LogisticRegression'
import Blockly from 'blockly/core';

export function logr_create(x : number[], y : number[]) : LogReg {
    let lr = new LogReg();
    lr.loadData(x, y);
    return lr;
}
// TODO
//Blockly.JavaScript['logr_create'] = logr_create;

export function logr_fit(lr : LogReg) : void {
    lr.fit();
}

export function logr_predict(lr : LogReg, x : number) : number[] {
    return lr.predict(x);
}

export function logr_init_blocks() {
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "logr_create",
            "message0": "logistic regression model: %1 Training data x: %2 Training data y: %3",
            //"message0": "%1 %2",
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
            "output": "LogReg"
        },
        {
            "type": "logr_fit",
            "message0": "fit logistic regression model %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "LogReg"
                }
            ],
            "previousStatement": null,
            "nextStatement": null
        },
        {
            "type": "logr_predict",
            "message0": "predict with logistic regression model %1 input: %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "MODEL_VAL",
                    "check": "LogReg"
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
}