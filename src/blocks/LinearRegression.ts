// Dependencies from ml.js
//const SimpleLinearRegression = require('ml-regression-simple-linear');
import MLR from "ml-regression-multivariate-linear";

import {
    BlockType,
    IMLModel,
    MLModuleConfig,
    oneOrTwoDArray,
    is1DArray
} from "./MLModel";

// LinReg Class
export class LinReg implements IMLModel {
    X: oneOrTwoDArray | undefined;
    y: oneOrTwoDArray | undefined;
    model: MLR;

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
            this.y = [];

            for (let el of y) {
                //@ts-ignore
                this.y.push([el]);
            }
        } else {
            this.y = y;
        }
    }

    fit() {
        if (this.X === undefined || this.y === undefined) {
            throw new Error("X and Y data have not been loaded");
        }

        console.log(this.X.length);
        console.log(this.y.length);

        this.model = new MLR(this.X as number[][], this.y as number[][]);

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

        let pred = this.model.predict(X);

        let preds = [];

        for (let x of pred) {
            preds.push(x[0]);
        }

        if (preds.length === 1) preds = preds[0];

        return preds;
    }

    save() {
        // TODO: Implement
        return "Not implemented";
    }
}

export const _MLModuleConfig: MLModuleConfig = {
    friendlyName: "linear regression",
    predictInputType: BlockType.None,
    predictOutputType: BlockType.Number,
    colour: 0,
    blockPrefix: "linr",
    additionalFitParams: []
};
