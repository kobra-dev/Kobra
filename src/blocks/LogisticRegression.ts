import { Matrix } from "ml-matrix";
import LogisticRegression from "ml-logistic-regression";
import {
    BlockType,
    IMLModel,
    MLModuleConfig,
    oneOrTwoDArray,
    is1DArray
} from "./MLModel";

export class LogReg implements IMLModel {
    X: oneOrTwoDArray;
    xMatrix: Matrix | undefined;
    y: any;
    model: LogisticRegression | undefined;

    loadData(X: oneOrTwoDArray, y: oneOrTwoDArray) {
        //loads the data
        //loads the data
        if (is1DArray(X)) {
            this.X = [];

            for (let el of X) {
                //@ts-ignore
                this.X.push([el]);
            }

            this.xMatrix = new Matrix(this.X as number[][]);
        } else {
            this.X = X[0].map((_, colIndex) => X.map((row) => row[colIndex]));

            this.xMatrix = new Matrix(this.X);
        }

        if (is1DArray(y)) {
            this.y = Matrix.columnVector(y);
        } else {
            this.y = Matrix.columnVector(y[0]);
        }
    }

    fit() {
        this.model = new LogisticRegression({
            numSteps: 1000,
            learningRate: 5e-3
        });
        this.model.train(this.xMatrix, this.y);
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

        return this.model.predict(X);
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
