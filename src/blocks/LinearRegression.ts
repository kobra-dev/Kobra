// Dependencies from ml.js
//const SimpleLinearRegression = require('ml-regression-simple-linear');
import { LinReg } from "kobra.js";

import { BlockType, MLModuleConfig } from "./MLModel";

export default LinReg;

export const _MLModuleConfig: MLModuleConfig = {
    createStr: "linear regression model",
    fitStr: "fit linear regression model",
    predictStr: "predict with linear regression model",
    predictInputType: BlockType.None,
    predictOutputType: BlockType.Number,
    colour: 0,
    blockPrefix: "linr",
    additionalFitParams: []
};
