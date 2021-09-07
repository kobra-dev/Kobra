import { BlockType, MLModuleConfig } from "./MLModel";
import { KNearestNeighbors } from "kobra.js";

// For compatibility with the MLModule system
export default KNearestNeighbors;

export const _MLModuleConfig: MLModuleConfig = {
    createStr: "KNN model",
    fitStr: "fit KNN model",
    predictStr: "predict with KNN model",
    predictInputType: BlockType.None,
    predictOutputType: BlockType.Number,
    colour: 300,
    blockPrefix: "knn",
    additionalFitParams: [
        {
            id: "K_VAL",
            message: "with k",
            check: "Number"
        }
    ]
};
