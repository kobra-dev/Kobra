import { DataFrame } from './DataFrame'
import Blockly from 'blockly/core';

export function df_create_empty() : DataFrame {
    return new DataFrame(undefined, undefined);
}

export function df_create(headers : string, data : string[]) : DataFrame {
    return new DataFrame(headers, data);
}

export function df_create_from_csv(csvPath : string) : DataFrame {
    let df = new DataFrame();
    df.read_csv(csvPath);
    return df;
}

export function df_transpose(df : DataFrame) : void {
    df.transpose();
}

export function df_loc(df : DataFrame, columnsSelected : string) : void {
    df.loc(columnsSelected);
}

export function df_drop(df : DataFrame) : void {
    // TODO: not implemented in DataFrame.js
}

export function df_trainTestSplit(df : DataFrame) : void {
    // TODO: not fully implemented in DataFrame.js
    df.trainTestSplit();
}

/*Blockly.defineBlocksWithJsonArray([
    {
        "type": "df_create",
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
]);*/