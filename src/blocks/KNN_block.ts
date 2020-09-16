import { KNearestNeighbors } from './KNN';
import Blockly from 'blockly/core';

export function knn_create(x: number[], y: number[]): KNearestNeighbors {
	let knn = new KNearestNeighbors();
	knn.loadData(x, y);
	return knn;
}

export function knn_fit(knn: KNearestNeighbors, k: number): void {
	knn.fit(k);
}

export function knn_predict(knn: KNearestNeighbors, x: number): number {
	return knn.predict(x);
}

export function knn_init_blocks() {
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "knn_create",
            "message0": "KNN model: %1 Training data x: %2 Training data y: %3",
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "X_VAL",
                    "check": "Array"
                },
                {
                    "type": "input_value",
                    "name": "Y_VAL",
                    "check": "Array"
                }
            ],
            "inputsInline": false,
            "output": "KNearestNeighbors"
        },
        {
            "type": "knn_fit",
            "message0": "fit KNN model %1 with k %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "MODEL_VAL",
                    "check": "KNearestNeighbors"
                },
                {
                    "type": "input_value",
                    "name": "K_VAL",
                    "check": "Number"
                }
            ],
            "previousStatement": null,
            "nextStatement": null
        },
        {
            "type": "knn_predict",
            "message0": "predict with KNN model %1 input: %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "MODEL_VAL",
                    "check": "KNearestNeighbors"
                },
                {
                    "type": "input_value",
                    "name": "INPUT_VAL",
                    "check": "Number"
                }
            ],
            "output": "Number"
        }
    ]);
}