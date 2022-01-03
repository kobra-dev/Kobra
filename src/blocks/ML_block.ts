import Blockly from "blockly/core";
import {
    valuePkg,
    constructCodeFromParams,
    statementPkg,
    BlocklyJSDef
} from "./blockUtils";
import { BlockType, MLModuleConfig } from "./MLModel";
import {
    LinReg,
    LogReg,
    KNearestNeighbors,
    RFClassifier,
    RFRegression,
    IMLModel
} from "kobra.js";

interface MLModule {
    _MLModuleConfig: MLModuleConfig;
}

const mlModelConfig: MLModuleConfig[] = [
    {
        model: LinReg,
        friendlyName: "linear regression",
        predictInputType: BlockType.None,
        predictOutputType: BlockType.Number,
        colour: 0,
        blockPrefix: "linr",
        additionalFitParams: []
    },
    {
        model: LogReg,
        friendlyName: "logistic regression",
        predictInputType: BlockType.None,
        predictOutputType: BlockType.Array,
        colour: 0,
        blockPrefix: "logr",
        additionalFitParams: []
    },
    {
        model: KNearestNeighbors,
        friendlyName: "K-nearest neighbors",
        createStr: "KNN model",
        fitStr: "fit KNN model",
        predictStr: "predict with KNN model",
        predictInputType: BlockType.None,
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
    },
    {
        model: RFClassifier,
        friendlyName: "random forest classifier",
        predictInputType: BlockType.None,
        predictOutputType: BlockType.Number,
        colour: 150,
        blockPrefix: "rfc",
        additionalFitParams: []
    },
    {
        model: RFRegression,
        friendlyName: "random forest regression",
        predictInputType: BlockType.None,
        predictOutputType: BlockType.Number,
        colour: 150,
        blockPrefix: "rfr",
        additionalFitParams: []
    }
    //
    // {
    //     friendlyName: "support vector classifier",
    //     predictInputType: BlockType.None,
    //     predictOutputType: BlockType.Number,
    //     colour: 150,
    //     blockPrefix: "svc",
    //     additionalFitParams: []
    // }
];

const blockFunctionsLocation = "globalThis.mlFunctions.";

export class MLInputValidationError extends Error {
    error: string;
    explanation: string;

    constructor(error: string, explanation: string) {
        super(error + " - " + explanation);
        this.error = error;
        this.explanation = explanation;
        this.name = "MLInputValidationError";
    }
}

const getValueDimensionDescriptor = (dim: number) =>
    dim === 0 ? "single value" : `${dim}-dimensional list`;

let blockFunctions: { [key: string]: { (..._: any): any } } = {
    generic_predict: (model: any, x): any => {
        // Make sure x has the same dimensions as items in the model X training data
        const inputDim = getItemDimension(x);
        const xDim = getItemDimension(model.X[0]);
        const xIsActually1D = xDim === 1 && model.X[0].length === 1;
        if (
            !(inputDim === xDim || (inputDim === 0 && xIsActually1D)) ||
            (xIsActually1D && inputDim !== 0 && x.length !== 1)
        ) {
            throw new MLInputValidationError(
                "Input value passed to predict has different dimensions than the X values in the model's training data",
                `The input value was a ${getValueDimensionDescriptor(
                    inputDim
                )}, but the X values in the model's training data were ${getValueDimensionDescriptor(
                    xIsActually1D ? 0 : xDim
                )}s.`
            );
        }
        // If the input's an array, make sure it has the same length as the X values in the model's training data
        if (inputDim > 0) {
            if (x.length !== model.X[0].length) {
                throw new MLInputValidationError(
                    "Input value passed to predict has different length than the X values in the model's training data",
                    `The input list had ${x.length} elements, but the X values in the model's training data had ${model.X[0].length} elements.`
                );
            }
        }
        const PREDICT_BEFORE_FIT_TEXT = "Predict called before model fitted";
        if (globalThis.MOCK_ML_MODELS) {
            if (model["_mock_fitted"]) {
                // Make a placeholder based on the y training data
                const res = model.y[0];
                return Array.isArray(res) ? res : [res];
            } else throw new Error(PREDICT_BEFORE_FIT_TEXT);
        }
        const result = model.predict(x);
        if (result === undefined) {
            throw new Error(PREDICT_BEFORE_FIT_TEXT);
        }
        return result;
    }
};

let blocklyDefs: any[] = [];
let blocklyJSDefs: BlocklyJSDef[] = [];

function getItemDimension(item: any): number {
    if (Array.isArray(item)) {
        return 1 + getItemDimension(item[0]);
    }
    return 0;
}

mlModelConfig.forEach((modelConfig) => {
    const moduleClass = modelConfig.model;

    const createBlock = modelConfig.blockPrefix + "_create";
    const fitBlock = modelConfig.blockPrefix + "_fit";
    const predictBlock = modelConfig.blockPrefix + "_predict";

    blockFunctions[createBlock] = <TDatapoint>(
        x: TDatapoint[] | TDatapoint[][],
        y: TDatapoint[]
    ) => {
        // Validate input
        const xIs2D = Array.isArray(x[0]);
        if (xIs2D) {
            // We have a 2D array
            // Check if all of the X columns are the same length
            const lens = x.map((col) => col.length);
            if (lens.some((len) => len !== lens[0])) {
                throw new MLInputValidationError(
                    "The columns of the X training data are not the same length",
                    "Each data point must have a value for each column of the X training data"
                );
            }
        }

        // Make sure the values in each column have the same dimension
        (xIs2D ? x : [x]).forEach((x, index) => {
            const firstItemDims = getItemDimension(x[0]);
            if (
                x
                    .slice(1)
                    .some((item) => getItemDimension(item) !== firstItemDims)
            ) {
                throw new MLInputValidationError(
                    `Not all values in ${
                        xIs2D ? `column ${index} of ` : ""
                    }the X training data are the same dimension`,
                    "Each data point must have a value for each column of the X training data"
                );
            }
        });

        // Make sure all values in y are 0 dimensional (Kobra doesn't support any models that output arrays)
        if (y.some(Array.isArray)) {
            throw new MLInputValidationError(
                "The y training data contains items that are lists of values",
                "Each item in the y training data must be a single value"
            );
        }

        if ((xIs2D ? (x[0] as TDatapoint[]) : x).length !== y.length) {
            throw new MLInputValidationError(
                `In the training data, ${
                    xIs2D ? "the columns of " : ""
                }X (input) ${
                    xIs2D ? "are" : "is"
                } not the same length as y (output)`,
                "Each input should have a corresponding output"
            );
        }

        if (y.length === 0) {
            throw new MLInputValidationError(
                "The training dataset is empty",
                "Please ensure there is data to train on"
            );
        }

        const model = new moduleClass();
        model.loadData(x, y);
        return model;
    };

    blockFunctions[fitBlock] = (model: IMLModel, ...variadic) => {
        // If there's a K_VAL param make sure it's a positive integer
        const kParamIndex = modelConfig.additionalFitParams.findIndex(
            (param) => param.id === "K_VAL"
        );
        if (kParamIndex !== -1) {
            const k = variadic[kParamIndex];
            if (!Number.isInteger(k) || k < 1) {
                throw new MLInputValidationError(
                    "Invalid k value",
                    "The k value parameter must be a positive integer"
                );
            }
        }

        if (globalThis.MOCK_ML_MODELS) {
            model["_mock_fitted"] = true;
        } else {
            model.fit(...variadic);
            globalThis.modelsDb.push({
                type: modelConfig.friendlyName,
                // We could also add this as a parameter to this function in codegen but this is easier
                blockId: globalThis.currentHighlightedBlock,
                model: model,
                modelJson: model.save(),
                modelParamsJson: JSON.stringify({
                    length: "4"
                })
            });
        }
    };

    blocklyDefs = blocklyDefs.concat([
        {
            type: createBlock,
            message0:
                (modelConfig.createStr ?? `${modelConfig.friendlyName} model`) +
                ": %1 Training data x: %2 Training data y: %3",
            args0: [
                {
                    type: "input_dummy"
                },
                {
                    type: "input_value",
                    name: "X_VAL",
                    check: "Array"
                },
                {
                    type: "input_value",
                    name: "Y_VAL",
                    check: "Array"
                }
            ],
            inputsInline: false,
            output: modelConfig.blockPrefix,
            colour: modelConfig.colour
        },
        {
            type: fitBlock,
            message0:
                (modelConfig.fitStr ??
                    `fit ${modelConfig.friendlyName} model`) +
                " %1 " +
                modelConfig.additionalFitParams
                    .map(
                        (additionalParam, index) =>
                            additionalParam.message + " %" + (index + 2)
                    )
                    .join(" "),
            args0: [
                {
                    type: "input_value",
                    name: "MODEL_VAL",
                    check: modelConfig.blockPrefix
                }
            ].concat(
                modelConfig.additionalFitParams.map((additionalParam) => ({
                    type: "input_value",
                    name: additionalParam.id,
                    check: additionalParam.check
                }))
            ),
            previousStatement: null,
            nextStatement: null,
            colour: modelConfig.colour
        },
        {
            type: predictBlock,
            message0:
                (modelConfig.predictStr ??
                    `predict with ${modelConfig.friendlyName} model`) +
                " %1 input: %2",
            args0: [
                {
                    type: "input_value",
                    name: "MODEL_VAL",
                    check: modelConfig.blockPrefix
                },
                {
                    type: "input_value",
                    name: "INPUT_VAL",
                    ...(BlockType[modelConfig.predictInputType] !== "None" && {
                        // This converts the enum value to a string
                        check: BlockType[modelConfig.predictInputType]
                    })
                }
            ],
            output: BlockType[modelConfig.predictOutputType],
            colour: modelConfig.colour
        }
    ]);

    blocklyJSDefs = blocklyJSDefs.concat([
        {
            block: createBlock,
            f: (block) =>
                valuePkg(
                    constructCodeFromParams(
                        block,
                        blockFunctionsLocation + createBlock,
                        "X_VAL",
                        "Y_VAL"
                    )
                )
        },
        {
            block: fitBlock,
            f: (block) =>
                statementPkg(
                    constructCodeFromParams(
                        block,
                        blockFunctionsLocation + fitBlock,
                        "MODEL_VAL",
                        ...modelConfig.additionalFitParams.map(
                            (additionalParam) => additionalParam.id
                        )
                    )
                )
        },
        {
            block: predictBlock,
            f: (block) =>
                valuePkg(
                    constructCodeFromParams(
                        block,
                        blockFunctionsLocation + "generic_predict",
                        "MODEL_VAL",
                        "INPUT_VAL"
                    )
                )
        }
    ]);
});

export { blockFunctions as mlFunctions };

export function init_blocks(): BlocklyJSDef[] {
    Blockly.defineBlocksWithJsonArray(blocklyDefs);
    return blocklyJSDefs;
}
