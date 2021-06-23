import KNN from "ml-knn";
import { BlockType, IMLModel, MLModuleConfig, is1DArray } from "./MLModel";

export class KNearestNeighbors implements IMLModel {
    X: any | undefined;
    y: any | undefined;
    model: KNN | undefined;

    loadData(X: number[], y: number[]) {
        if (is1DArray(X)) {
            this.X = [];

            for (let el of X) {
                //@ts-ignore
                this.X.push([el]);
            }
        } else {
            this.X = (X[0] as number[]).map((_, colIndex) =>
                (X as number[][]).map((row) => row[colIndex])
            );
        }

        if (is1DArray(y)) {
            this.y = y;
        } else {
            this.y = y[0];
        }
    }

    fit(k: number) {
        this.model = new KNN(this.X, this.y, { k: k });
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
            if (X.length === 1 && (X[0] as number[]).length === 1) {
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
    createStr: "KNN model",
    fitStr: "fit KNN model",
    predictStr: "predict with KNN model",
    predictInputType: BlockType.Number,
    predictOutputType: BlockType.Number,
    colour: 300,
    blockPrefix: "knn",
    additionalFitParams: [
        {
            id: "K_VAL",
            message: "with k",
            check: "Number"
        }
    ]
};

/*var knn = new KNearestNeighbors();

var X_train = [
	[0, 0, 0],
	[0, 1, 1],
	[1, 1, 0],
	[2, 2, 2],
	[1, 2, 2],
	[2, 1, 2]
];
var y_train = [0, 0, 0, 1, 1, 1];

knn.loadData(X_train, y_train);

knn.fit(2);

knn.predict([[0, 0, 0]]);
*/
