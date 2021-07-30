import { BlockType, IMLModel, MLModuleConfig, is1DArray } from "./MLModel";

var SVM = require("ml-svm");

export class SVC implements IMLModel {
    X: any | undefined;
    y: any | undefined;
    model: SVM | undefined;

    loadData(X: any, y: any) {
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

        this.model = new SVM({
            C: 0.01,
            tol: 10e-4,
            maxPasses: 10,
            maxIterations: 10000,
            kernel: "rbf",
            kernelOptions: {
                sigma: 0.5
            }
        });
    }

    fit() {
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

    save() {
        // TODO: Implement
        return "Not implemented";
    }
}

export const _MLModuleConfig: MLModuleConfig = {
    createStr: "support vector classifier model",
    fitStr: "fit support vector classifier model",
    predictStr: "predict with support vector classifier model",
    predictInputType: BlockType.None,
    predictOutputType: BlockType.Number,
    colour: 150,
    blockPrefix: "svc",
    additionalFitParams: []
};
