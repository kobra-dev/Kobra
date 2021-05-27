import KNN from "ml-knn";
import { BlockType, IMLModel, MLModuleConfig } from "./MLModel";

export class KNearestNeighbors implements IMLModel {
    X: number[] | undefined;
    y: number[] | undefined;
    model: KNN | undefined;

    loadData(X: number[], y: number[]) {
        this.X = X;
        this.y = y;
    }

    fit(k: number) {
        this.model = new KNN(this.X, this.y, { k: k });
    }

    predict(X: number) {
        return this.model?.predict([X]);
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
