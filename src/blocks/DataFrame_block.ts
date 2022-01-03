import Blockly from "blockly/core";
import {
    ArgType,
    BlocklyJSDef,
    constructCodeFromParams,
    statementPkg,
    valuePkg
} from "./blockUtils";
import { DataFrame } from "./DataFrame";

export function df_create_empty(): DataFrame {
    return new DataFrame();
}

export function df_create(headers: string[], data: any[][]): DataFrame {
    let newDF: DataFrame = new DataFrame();
    newDF.loadData(headers, data);
    return newDF;
}

export async function df_load_file(name: string) {
    const getCSVFromCache = globalThis.IS_WORKER
        ? globalThis.worker_getCSVFromCache
        : (await import("../utils/csvFetcher")).default;
    const csv = await getCSVFromCache(name);
    if (!csv) {
        throw new Error(
            `No dataset found with filename ${name}, try uploading it in the File Upload tab`
        );
    }
    const df = new DataFrame();
    df.read_csv(csv);
    return df;
}

export function df_transpose(df: DataFrame): void {
    df.transpose();
}

export function df_loc(df: DataFrame, columnsSelected: string[]): any[][] {
    return df.loc(columnsSelected).data;
}

export function df_col_to_array(df: DataFrame, column: string): any[] {
    const col = df.loc([column]);
    const res = col.data?.[0];
    if (!res) {
        const error = new Error(
            "Try looking at what columns the dataset has in the Datasets tab"
        );
        error.name = `Column ${column} doesn't exist in the DataFrame`;
        throw error;
    }
    return res;
}

export function df_drop(df: DataFrame): void {
    // TODO: not implemented in DataFrame.js
}

export function df_trainTestSplit(df: DataFrame): void {
    // TODO: not fully implemented in DataFrame.js
    df.trainTestSplit(80);
}

export function df_init_blocks(): BlocklyJSDef[] {
    Blockly.defineBlocksWithJsonArray([
        {
            type: "df_create_empty",
            message0: "empty DataFrame",
            output: "DataFrame",
            colour: 90
        },
        {
            type: "df_create",
            message0: "DataFrame with headers %1 and data %2",
            args0: [
                {
                    type: "input_value",
                    name: "HEAD_VAL",
                    check: "Array"
                },
                {
                    type: "input_value",
                    name: "DATA_VAL",
                    check: "Array"
                }
            ],
            output: "DataFrame",
            colour: 90
        },
        {
            type: "df_load_file",
            message0: "%1 as DataFrame",
            args0: [
                {
                    type: "input_value",
                    name: "NAME_VAL",
                    check: "String"
                }
            ],
            output: "DataFrame",
            colour: 90
        },
        /*{
            type: "df_create_from_csv",
            message0: "DataFrame from dataset %1",
            args0: [
                {
                    type: "field_dropdown",
                    name: "CSV_DROPDOWN",
                    options: [["satGPA", "satGPA"]]
                }
            ],
            output: "DataFrame",
            colour: 90
        },*/
        {
            type: "df_transpose",
            message0: "transpose DataFrame %1",
            args0: [
                {
                    type: "field_variable",
                    name: "VALUE",
                    variable: "data",
                    check: "DataFrame"
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 90
        },
        {
            type: "df_loc",
            message0: "select columns %1 from DataFrame %2",
            args0: [
                {
                    type: "input_value",
                    name: "COL_VAL",
                    check: "Array"
                },
                {
                    type: "field_variable",
                    name: "DF_VAL",
                    variable: "data",
                    check: "DataFrame"
                }
            ],
            output: "DataFrame",
            colour: 90
        },
        {
            type: "df_col_to_array",
            message0: "get column %1 from DataFrame %2 as array",
            args0: [
                {
                    type: "input_value",
                    name: "COL_VAL",
                    check: "String"
                },
                {
                    type: "field_variable",
                    name: "DF_VAL",
                    variable: "data",
                    check: "DataFrame"
                }
            ],
            output: "Array",
            colour: 90
        }
    ]);

    return [
        {
            block: "df_create_empty",
            f: (block) =>
                valuePkg(constructCodeFromParams(block, "df_create_empty"))
        },
        {
            block: "df_create",
            f: (block) =>
                valuePkg(
                    constructCodeFromParams(
                        block,
                        "df_create",
                        "HEAD_VAL",
                        "DATA_VAL"
                    )
                )
        },
        {
            block: "df_load_file",
            f: (block) =>
                valuePkg(
                    constructCodeFromParams(block, "df_load_file", "NAME_VAL")
                )
        },
        {
            block: "df_transpose",
            f: (block) =>
                statementPkg(
                    constructCodeFromParams(block, "df_transpose", {
                        type: ArgType.Variable,
                        arg: "VALUE"
                    })
                )
        },
        {
            block: "df_loc",
            f: (block) =>
                valuePkg(
                    constructCodeFromParams(
                        block,
                        "df_loc",
                        {
                            type: ArgType.Variable,
                            arg: "DF_VAL"
                        },
                        {
                            type: ArgType.Value,
                            arg: "COL_VAL"
                        }
                    )
                )
        },
        {
            block: "df_col_to_array",
            f: (block) =>
                valuePkg(
                    constructCodeFromParams(
                        block,
                        "df_col_to_array",
                        { type: ArgType.Variable, arg: "DF_VAL" },
                        { type: ArgType.Value, arg: "COL_VAL" }
                    )
                )
        }
    ];
}
