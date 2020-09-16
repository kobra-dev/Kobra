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

Blockly.defineBlocksWithJsonArray([
    {
        "type": "logr_create",
        "message0": "Logistic regression model with training data x: %0 y: %1",
        "args0": [
            {
                "type": "input_value",
                "name": "X_VAL",
                "check": "number[]"
            },
            {
                "type": "input_value",
                "name": "Y_VAL",
                "check": "number[]"
            }
        ],
        "output": "LogReg"
    },
    {
        "type": "logr_fit",
        "message0": "Fit logistic regression model %0",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "LogReg"
            }
        ]
    },
    {
        "type": "logr_predict",
        "message0": "Predict with logistic regression model %0",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "LogReg"
            }
        ],
        "output": "number"
    }
]);