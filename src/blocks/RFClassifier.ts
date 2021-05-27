import { RandomForestClassifier } from "ml-random-forest";
import {
    BlockType,
    IMLModel,
    MLModuleConfig,
    oneOrTwoDArray,
    is1DArray
} from "./MLModel";

export class RFClassification implements IMLModel {
    X: number[][] | undefined;
    y: number[] | undefined;
    model: RandomForestClassifier | undefined;
    seed: number | undefined;

    loadData(X: oneOrTwoDArray, y: oneOrTwoDArray) {
        //loads the data
        if (is1DArray(X)) {
            let arr: number[][] = [];

            for (let n of X) {
                arr.push([n]);
            }

            this.X = arr;
        } else {
            this.X = X;
        }

        if (is1DArray(y)) {
            this.y = y;
            console.log(y.length);
        } else {
            this.y = y[0];
        }

        this.seed = this.X.length;
    }

    fit() {
        let hyperparams = {
            seed: this.seed,
            maxFeatures: 0.2,
            replacement: false,
            nEstimators: 200
        };

        this.model = new RandomForestClassifier(hyperparams);
        this.model?.train(this.X, this.y);
    }

    predict(x: number | number[] | number[][]): number | number[] | number[][] {
        if (this.model !== undefined) {
            if (x[0] === undefined) {
                // type number
                console.log("hi");
                // @ts-ignore
                return this.model.predict([x]);
            } else if (x[0][0] === undefined) {
                // type number[]
                return this.model.predict(x);
            } else {
                // type number[][]
                let preds = [];

                for (let el of x as number[][]) {
                    preds.push(this.model.predict(el));
                }

                return preds;
            }
        }
    }
}

export const _MLModuleConfig: MLModuleConfig = {
    createStr: "random forest classifier model",
    fitStr: "fit random forest classifier model",
    predictStr: "predict with random forest classifier model",
    predictInputType: BlockType.Number,
    predictOutputType: BlockType.Number,
    colour: 150,
    blockPrefix: "rfc",
    additionalFitParams: []
};
