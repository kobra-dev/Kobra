import * as tf from "@tensorflow/tfjs";

import {
    BlockType,
    IMLModel,
    MLModuleConfig,
    oneOrTwoDArray,
    is1DArray
} from "./MLModel";

export class LogReg implements IMLModel {
    X: any;
    y: any;
    model: any;

    constructor() {
        this.model = tf.sequential();
    }

    loadData(X: oneOrTwoDArray, y: oneOrTwoDArray) {
        //loads the data
        if (is1DArray(X)) {
            let arr: number[][] = [];

            for (let n of X) {
                arr.push([n]);
            }

            this.X = arr;
        }

        if (!is1DArray(y)) {
            this.y = y[0];
        } else {
            this.y = y;
        }

        this.X = tf.tensor2d(this.X, [this.X.length, this.X[0].length]);
        this.y = tf.tensor2d(this.y, [this.y.length, 1]);
    }

    fit() {
        this.model.add(
            tf.layers.dense({
                units: 12,
                activation: "relu",
                inputShape: [1]
            })
        );

        this.model.add(
            tf.layers.dense({
                units: 1,
                activation: "sigmoid"
            })
        );

        this.model.compile({
            optimizer: tf.train.sgd(0.001),
            loss: "binaryCrossentropy",
            metrics: ["accuracy"]
        });

        this.model.fit(this.X, this.y, {
            epochs: 1000,
            batchSize: 32,
            shuffle: true
        });
    }

    predict(x: number | number[] | number[][]) {
        if (x[0] === undefined) {
            //@ts-ignore
            x = [[x]];
        } else if (x[0][0] === undefined) {
            //@ts-ignore
            x = [x];
        }

        let preds = [];

        for (let el of x) {
            preds.push(
                this.model.predict(tf.tensor2d(el, [el.length, 1])).print()
            );
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
