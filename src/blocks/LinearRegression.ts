// Dependencies from ml.js
//const SimpleLinearRegression = require('ml-regression-simple-linear');
import MLR from "ml-regression-multivariate-linear";
import SLR from "ml-regression-simple-linear";
import {
    BlockType,
    IMLModel,
    MLModuleConfig,
    oneOrTwoDArray,
    numberOr1dArray
} from "./MLModel";

function is1DArray(array: oneOrTwoDArray): array is number[] {
    return (array as number[][])[0][0] === undefined;
}

// LinReg Class
export class LinReg implements IMLModel {
    X: oneOrTwoDArray | undefined;
    y: oneOrTwoDArray | undefined;
    slr: SLR | undefined;
    mlr: MLR | undefined;
    modelType: string | undefined;

    loadData(X: oneOrTwoDArray, y: oneOrTwoDArray) {
        //loads the data
        this.X = X;
        this.y = y;
    }

    fit() {
        if (this.X === undefined || this.y === undefined) {
            throw new Error("X and Y data have not been loaded");
        }
        //fits linreg to dataset
        if (is1DArray(this.X)) {
            this.slr = new SLR(this.X, this.y as number[]);
            this.modelType = "SLR";
        } else {
            if (is1DArray(this.y)) {
                let newY: number[][] = [];
                for (var i = 0; i < this.y.length; i++) {
                    newY[i] = [this.y[i]];
                }
                this.y = newY;
            }
            this.mlr = new MLR(this.X, this.y);
            this.modelType = "MLR";
        }
    }
    predict(X: w) {
        if (this.X === undefined) {
            throw new Error("X data is undefined");
        }
        if (!is1DArray(this.X)) {
            throw new Error(
                "X data is not 2D array, did you forget to fit the model?"
            );
        }
        if (this.modelType === "SLR") {
            // TODO: TypeScript is saying that slope and intercept aren't properties
            // @ts-ignore
            return this.slr?.toJSON().slope * X + this.slr?.toJSON().intercept;
        } else {
            var sum = 0;
            for (var i = 0; i < this.X.length; i++) {
                // @ts-ignore
                sum += this.X[i] * this.mlr?.toJSON().weights[i][0];
                console.log(sum);
            }
            // @ts-ignore
            const weights = this.mlr?.toJSON().weights;
            sum += Number(weights[weights.length - 1]);

            sum = Math.round((sum * (10 ^ 5)) / (10 ^ 5));
            return sum;
        }
    }
}

export const _MLModuleConfig: MLModuleConfig = {
    createStr: "linear regression model",
    fitStr: "fit linear regression model",
    predictStr: "predict with linear regression model",
    predictInputType: BlockType.Number,
    predictOutputType: BlockType.Number,
    colour: 0,
    blockPrefix: "linr",
    additionalFitParams: []
};

/*//testing stuf
const simpleLR = new LinReg();

simpleLR.loadData([1, 2, 3], [1, 2, 3]);

simpleLR.fit();

console.log(simpleLR.slr.toJSON());

console.log(simpleLR.modelType);

console.log(simpleLR.predict(3));

const multiLR = new LinReg();

multiLR.loadData(
  [
    [1, 2, 3],
    [2, 3, 4],
    [5, 6, 7]
  ],
  [7, 10, 19]
);

multiLR.fit();

console.log(multiLR.mlr.toJSON());

console.log(multiLR.predict([1, 2, 3]));
*/
