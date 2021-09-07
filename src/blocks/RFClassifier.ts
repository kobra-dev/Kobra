import { RFClassifier } from "kobra.js";
import { BlockType, MLModuleConfig } from "./MLModel";

export default RFClassifier;

export const _MLModuleConfig: MLModuleConfig = {
    createStr: "random forest classifier model",
    fitStr: "fit random forest classifier model",
    predictStr: "predict with random forest classifier model",
    predictInputType: BlockType.None,
    predictOutputType: BlockType.Number,
    colour: 150,
    blockPrefix: "rfc",
    additionalFitParams: []
};
