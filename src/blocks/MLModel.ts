export type oneOrTwoDArray = number[] | number[][];
export type numberOr1dArray = number | number[][];

export interface IMLModel {
    loadData: { (x: any, y: any): void };
    fit: { (..._: any): void };
    predict: { (x: any): any };
}

export interface AdditionalParam {
    // Short ID (like K_VAL)
    id: string;
    message: string;
    check: string;
}

export enum BlockType {
    "Array",
    "Number"
}

export interface MLModuleConfig {
    // Text to display on the create block
    createStr: string;
    // Text to display on the fit block
    fitStr: string;
    // Text to display on the predict block
    predictStr: string;
    // Type of prediction input
    predictInputType: BlockType;
    // Type of prediction output
    predictOutputType: BlockType;
    // Color of the blocks
    colour: number;
    // Short prefix to use to identify the blocks (prefix of foo will make foo_create, foo_fit, foo_predict blocks). This is also used as the type of the model by Blockly internally
    blockPrefix: string;
    // Additional parameters to add to the fit block
    additionalFitParams: AdditionalParam[];
}
