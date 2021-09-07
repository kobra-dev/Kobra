import { RFRegression } from "kobra.js";
import { BlockType, MLModuleConfig } from "./MLModel";

export default RFRegression;

export const _MLModuleConfig: MLModuleConfig = {
    createStr: "random forest regression model",
    fitStr: "fit random forest regression model",
    predictStr: "predict with random forest regression model",
    predictInputType: BlockType.None,
    predictOutputType: BlockType.Number,
    colour: 150,
    blockPrefix: "rfr",
    additionalFitParams: []
};
