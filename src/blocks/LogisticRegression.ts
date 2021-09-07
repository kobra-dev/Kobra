// import jsregression from "js-regression";

import { LogReg } from "kobra.js";
import { BlockType, MLModuleConfig } from "./MLModel";

export default LogReg;

export const _MLModuleConfig: MLModuleConfig = {
    createStr: "logistic regression model",
    fitStr: "fit logistic regression model",
    predictStr: "predict with logistic regression model",
    predictInputType: BlockType.None,
    predictOutputType: BlockType.Array,
    colour: 0,
    blockPrefix: "logr",
    additionalFitParams: []
};
