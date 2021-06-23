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
            this.X = [];

            for (let el of X) {
                //@ts-ignore
                this.X.push([el]);
            }
        } else {
            this.X = X[0].map((_, colIndex) => X.map((row) => row[colIndex]));
        }

        if (is1DArray(y)) {
            this.y = y;
        } else {
            this.y = y[0];
        }

        this.seed = this.X[0].length;
    }

    fit() {
        this.model = new RandomForestClassifier({
            seed: this.seed,
            maxFeatures: 0.2,
            replacement: false,
            nEstimators: 200
        });

        this.model.train(this.X, this.y);
    }

    predict(X: number | number[] | number[][]) {
        if (typeof X == "number") {
            X = [[X]];
        } else if (X[0][0] === undefined) {
            if ((this.X as number[][])[0].length === X.length) {
                X = [X as number[]];
            } else {
                let xArr = [];

                for (let el of X) {
                    xArr.push([el]);
                }

                X = xArr;
            }
        } else {
            if (X.length === 1 && (X as number[][])[0].length === 1) {
                let xArr = [];

                for (let el of (X as number[][])[0]) {
                    xArr.push([el]);
                }
            }
        }

        return this.model.predict(X);
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
