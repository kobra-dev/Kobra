import { Matrix } from "ml-matrix";
import LogisticRegression from "ml-logistic-regression";
import {
    BlockType,
    IMLModel,
    MLModuleConfig,
    oneOrTwoDArray,
    is1DArray
} from "./MLModel";
import { ThreeSixty } from "@material-ui/icons";

export class LogReg implements IMLModel {
    X: oneOrTwoDArray;
    xMatrix: Matrix | undefined;
    y: any;
    model: LogisticRegression | undefined;
    mean: number[];
    sd: number[];

    loadData(X: oneOrTwoDArray, y: oneOrTwoDArray) {
        //loads the data
        this.mean = [];
        this.sd = [];

        if (is1DArray(X)) {
            this.mean.push(this.getMean(X));
            this.sd.push(this.getSD(X));

            for (let i = 0; i < X.length; i++) {
                X[i] = (X[i] - this.mean[0]) / this.sd[0];
            }

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

        console.log(this.X);
        console.log(this.y);
    }

    fit() {
        this.model = new LogisticRegression({
            numSteps: 1000,
            learningRate: 5e-3
        });
        this.model.train(this.xMatrix, this.y);

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

    getMean(array) {
        return array.reduce((a, c) => a + c) / array.length;
    }

    // https://stackoverflow.com/a/53577159
    getSD(array) {
        const n = array.length;
        const mean = array.reduce((a, b) => a + b) / n;
        return Math.sqrt(
            array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
        );
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
