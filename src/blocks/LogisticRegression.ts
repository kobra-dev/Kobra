// import jsregression from "js-regression";

import {
    BlockType,
    IMLModel,
    MLModuleConfig,
    oneOrTwoDArray,
    is1DArray
} from "./MLModel";
import { LogisticRegression } from "@kobra-dev/js-regression";

export class LogReg implements IMLModel {
    data: any;
    model: any;

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
            if ((this.data as number[][])[0].length === X.length + 1) {
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

                X = xArr;
            }
        }

        for (let i = 0; i < X.length; i++) {
            X[i].push(0);
        }

        let preds = [];

        for (let r of X) {
            console.log(r);
            console.log(this.model.transform(r));
            preds.push(this.model.transform(r) >= 0.6 ? 1 : 0);
        }

        return preds;
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
