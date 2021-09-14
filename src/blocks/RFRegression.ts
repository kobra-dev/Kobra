import { RFRegression as RFRegression_kjs } from "kobra.js";
import { BlockType, MLModuleConfig } from "./MLModel";

export default class RFRegression extends RFRegression_kjs {
    loadData(x: number[], y: number[]) {
        // Hopefully temporary (TODO) workaround for weird bug
        // Actually this doesn't actually work, so I've disabled random forest for now
        if (x.length < 7 || y.length < 7) {
            throw new Error(
                "Random forest regression model must have at least 7 datapoints to function"
            );
        }
        super.loadData(x, y);
    }
}

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
