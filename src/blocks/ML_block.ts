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
    RFRegression
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

let blockFunctions: { [key: string]: { (..._: any): any } } = {
    generic_predict: (model: any, x): any => {
        const result = model.predict(x);
        if (result === undefined) {
            throw new Error("Predict called before model fitted");
        }
        return result;
    }
};

let blocklyDefs: any[] = [];
let blocklyJSDefs: BlocklyJSDef[] = [];

mlModelConfig.forEach((modelConfig) => {
    const moduleClass = modelConfig.model;

    const createBlock = modelConfig.blockPrefix + "_create";
    const fitBlock = modelConfig.blockPrefix + "_fit";
    const predictBlock = modelConfig.blockPrefix + "_predict";

    blockFunctions[createBlock] = (x: any, y: any) => {
        let model = new moduleClass();
        model.loadData(x, y);
        return model;
    };

    blockFunctions[fitBlock] = (model: any, ...variadic) => {
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
