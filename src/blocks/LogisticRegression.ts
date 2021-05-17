import { Matrix } from "ml-matrix";
import LogisticRegression from "ml-logistic-regression";
import { BlockType, IMLModel, MLModuleConfig, oneOrTwoDArray } from "./MLModel";

function is1DArray(array: oneOrTwoDArray): array is number[] {
    return (array as number[][])[0][0] === undefined;
}

export class LogReg implements IMLModel {
    X: Matrix | undefined;
    y: Matrix | undefined;
    model: LogisticRegression | undefined;

    loadData(X: oneOrTwoDArray, y: oneOrTwoDArray) {
        //loads the data
        if (is1DArray(X)) {
            this.X = new Matrix([X]);
        } else {
            this.X = new Matrix(X);
        }

        if (is1DArray(y)) {
            this.y = Matrix.columnVector([y]);
        } else {
            this.y = Matrix.columnVector(y);
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

    predict(x: number[]) {
        if (this.model !== undefined) {
            var preds = [];
            var X: number[][] = [x];

            for (var i = 0; i < X.length; i++) {
                var X_pred = new Matrix([X[i]]);
                preds.push(this.model.predict(X_pred)[0]);
            }

            return preds;
        }
    }
}

export const _MLModuleConfig: MLModuleConfig = {
    createStr: "logistic regression model",
    fitStr: "fit logistic regression model",
    predictStr: "predict with logistic regression model",
    predictInputType: BlockType.Array,
    predictOutputType: BlockType.Array,
    colour: 0,
    blockPrefix: "logr",
    additionalFitParams: []
};
