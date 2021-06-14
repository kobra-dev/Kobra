import { Matrix } from "ml-matrix";
import LogisticRegression from "ml-logistic-regression";
import * as tf from "@tensorflow/tfjs";

import {
    BlockType,
    IMLModel,
    MLModuleConfig,
    oneOrTwoDArray,
    is1DArray
} from "./MLModel";

export class LogReg implements IMLModel {
    X: Matrix | undefined;
    y: Matrix | undefined;
    model: LogisticRegression | undefined;

    loadData(X: oneOrTwoDArray, y: oneOrTwoDArray) {
        //loads the data
        if (is1DArray(X)) {
            let arr: number[][] = [];

            for (let n of X) {
                arr.push([n]);
            }

            this.X = new Matrix(arr);
            console.log(X.length);
        } else {
            this.X = new Matrix(X);
        }

        if (is1DArray(y)) {
            this.y = Matrix.columnVector(y);
            console.log(y.length);
        } else {
            this.y = Matrix.columnVector(y[0]);
        }
    }

    fit() {
        this.model = new LogisticRegression({
            numSteps: 1000,
            learningRate: 5e-3
        });
        if (this.model !== undefined) {
            this.model.train(this.X, this.y);
        }
    }

    predict(x: number | number[] | number[][]): number | number[] | number[][] {
        if (x[0] === undefined) {
            // type number
            console.log("hi");
            // @ts-ignore
            return this.model.predict(new Matrix([[x]]))[0];
        } else if (x[0][0] === undefined) {
            // type number[]
        } else {
            // type number[][]
        }
        // if (this.model !== undefined) {
        //     var preds = [];
        //     let X: number[][] = x;

        //     for (var i = 0; i < X.length; i++) {
        //         var X_pred = new Matrix([X[i]]);
        //         preds.push(this.model.predict(X_pred)[0]);
        //     }

        //     console.log(preds);
        //     return preds;
        // }
    }
}

export const _MLModuleConfig: MLModuleConfig = {
    createStr: "logistic regression model",
    fitStr: "fit logistic regression model",
    predictStr: "predict with logistic regression model",
    predictInputType: BlockType.Number,
    predictOutputType: BlockType.Array,
    colour: 0,
    blockPrefix: "logr",
    additionalFitParams: []
};
