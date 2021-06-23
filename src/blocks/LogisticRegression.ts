import { Matrix } from "ml-matrix";
import { LogisticRegression } from "js-regression";

import {
    BlockType,
    IMLModel,
    MLModuleConfig,
    oneOrTwoDArray,
    is1DArray
} from "./MLModel";

export class LogReg implements IMLModel {
    data: any;
    model: LogisticRegression | undefined;

    loadData(X: oneOrTwoDArray, y: oneOrTwoDArray) {
        //loads the data
        if (is1DArray(X)) {
            this.data = [];

            for (let el of X) {
                //@ts-ignore
                this.data.push([el]);
            }
        } else {
            this.data = X[0].map((_, colIndex) =>
                X.map((row) => row[colIndex])
            );
        }

        if (!is1DArray(y)) {
            y = y[0];
        }

        for (let i = 0; i < y.length; i++) {
            this.data[i].push(y[i]);
        }

        console.log(this.data);
    }

    fit() {
        this.model = new LogisticRegression({
            alpha: 0.001,
            iterations: 1000,
            lambda: 0.0
        });
        this.model.fit(this.data);

        console.log(this.model);
    }

    predict(X: any) {
        if (typeof X == "number") {
            X = [[X]];
        } else if (X[0][0] === undefined) {
            if ((this.X as number[][])[0].length === X.length) {
                X = [X];
            } else {
                let xArr = [];

                for (let el of X) {
                    xArr.push([el]);
                }

                X = xArr;
            }
        } else {
            if (X.length === 1 && X[0].length === 1) {
                let xArr = [];

                for (let el of X[0]) {
                    xArr.push([el]);
                }
            }
        }

        console.log(X);

        return this.model.predict(new Matrix(X));
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
