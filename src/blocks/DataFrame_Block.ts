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

export function df_init_blocks() {
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "df_create_empty",
            "message0": "empty DataFrame",
            "output": "DataFrame"
        },
        {
            "type": "df_create",
            "message0": "DataFrame with headers %1 and data %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "HEAD_VAL",
                    "check": "String"
                },
                {
                    "type": "input_value",
                    "name": "DATA_VAL",
                    "check": "Array"
                }
            ],
            "output": "DataFrame"
        },
        {
            "type": "df_create_from_csv",
            "message0": "DataFrame from dataset %1",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "CSV_DROPDOWN",
                    "options": [
                        [
                            "satGPA",
                            "SATGPA"
                        ]
                    ]
                }
            ],
            "output": "DataFrame"
        },
        {
            "type": "df_transpose",
            "message0": "transpose Dataframe %1",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VALUE",
                    "variable": "df",
                    "check": "DataFrame"
                }
            ],
            "previousStatement": null,
            "nextStatement": null
        },
        {
            "type": "df_loc",
            "message0": "select columns %1 from Dataframe %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "COL_VAL",
                    "check": "String"
                },
                {
                    "type": "field_variable",
                    "name": "DF_VAL",
                    "variable": "df",
                    "check": "DataFrame"
                }
            ],
            "previousStatement": null,
            "nextStatement": null
        }
    ]);
}