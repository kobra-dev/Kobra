import { KNearestNeighbors } from './KNN';
import Blockly from 'blockly/core';
import 'blockly/javascript_compressed';
import { constructCodeFromParams, valuePkg, statementPkg, BlocklyJSDef } from './blockUtils';

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

export function knn_init_blocks() : BlocklyJSDef[] {
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
            "output": "KNearestNeighbors",
            "colour": 300
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
            "nextStatement": null,
            "colour": 300
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
            "output": "Number",
            "colour": 300
        }
    ]);

    return [
        {
            block: 'knn_create',
            f: block => valuePkg(constructCodeFromParams(block, "knn_create", 'X_VAL', 'Y_VAL'))
        },
        {
            block: 'knn_fit',
            f: block => statementPkg(constructCodeFromParams(block, "knn_fit", 'MODEL_VAL', 'K_VAL'))
        },
        {
            block: 'knn_predict',
            f: block => valuePkg(constructCodeFromParams(block, "knn_predict", 'MODEL_VAL', 'INPUT_VAL'))
        }
    ];
}