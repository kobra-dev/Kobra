import Blockly from "blockly/core";
import {
    valuePkg,
    constructCodeFromParams,
    statementPkg,
    BlocklyJSDef
} from "./blockUtils";
<<<<<<< HEAD
import { BlockType, MLModuleConfig } from "./MLModel";
import { LinReg, LogReg, KNearestNeighbors, RFClassifier, RFRegression } from "kobra.js"
=======
import {
    BlockType,
    IMLModel,
    MLModuleConfig
} from "./MLModel";
>>>>>>> 0f410a5 (chore: fix prettier stuffs)

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
]

const blockFunctionsLocation = "globalThis.mlFunctions.";

<<<<<<< HEAD
let blockFunctions: { [key: string]: { (..._: any): any } } = {
    generic_predict: (model: any, x): any => {
=======
let blockFunctions: {
    [key: string]: { (..._: any): any };
} = {
    generic_predict: (model: IMLModel, x): any => {
>>>>>>> 0f410a5 (chore: fix prettier stuffs)
        const result = model.predict(x);
        if (result === undefined) {
            throw new Error(
                "Predict called before model fitted"
            );
        }
        return result;
    }
};

let blocklyDefs: any[] = [];
let blocklyJSDefs: BlocklyJSDef[] = [];

<<<<<<< HEAD
mlModelConfig.forEach((modelConfig) => {
    const moduleClass = modelConfig.model;

    const createBlock = modelConfig.blockPrefix + "_create";
    const fitBlock = modelConfig.blockPrefix + "_fit";
    const predictBlock = modelConfig.blockPrefix + "_predict";
=======
importedML.forEach((importedModule) => {
    // TypeScript doesn't like me indexing importedModule
    // @ts-ignore
    const moduleClass =
        importedModule[
            Object.keys(importedModule).filter(
                (item) => item !== "_MLModuleConfig"
            )[0]
        ];
    const createBlock =
        importedModule._MLModuleConfig.blockPrefix +
        "_create";
    const fitBlock =
        importedModule._MLModuleConfig.blockPrefix + "_fit";
    const predictBlock =
        importedModule._MLModuleConfig.blockPrefix +
        "_predict";
>>>>>>> 0f410a5 (chore: fix prettier stuffs)

    blockFunctions[createBlock] = (x: any, y: any) => {
        let model = new moduleClass();
        model.loadData(x, y);
        return model;
    };

<<<<<<< HEAD
    blockFunctions[fitBlock] = (model: any, ...variadic) => {
        model.fit(...variadic);
        globalThis.modelsDb.push({
            type: modelConfig.friendlyName,
=======
    blockFunctions[fitBlock] = (
        model: IMLModel,
        ...variadic
    ) => {
        model.fit(...variadic);
        globalThis.modelsDb.push({
            type: importedModule._MLModuleConfig
                .friendlyName,
>>>>>>> 0f410a5 (chore: fix prettier stuffs)
            // We could also add this as a parameter to this function in codegen but this is easier
            blockId: globalThis.currentHighlightedBlock,
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
                (modelConfig.createStr ??
                    `${modelConfig.friendlyName} model`) +
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
<<<<<<< HEAD
            output: modelConfig.blockPrefix,
            colour: modelConfig.colour
=======
            output: importedModule._MLModuleConfig
                .blockPrefix,
            colour: importedModule._MLModuleConfig.colour
>>>>>>> 0f410a5 (chore: fix prettier stuffs)
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
                            additionalParam.message +
                            " %" +
                            (index + 2)
                    )
                    .join(" "),
            args0: [
                {
                    type: "input_value",
                    name: "MODEL_VAL",
<<<<<<< HEAD
                    check: modelConfig.blockPrefix
=======
                    check: importedModule._MLModuleConfig
                        .blockPrefix
>>>>>>> 0f410a5 (chore: fix prettier stuffs)
                }
            ].concat(
                modelConfig.additionalFitParams.map(
                    (additionalParam) => ({
                        type: "input_value",
                        name: additionalParam.id,
                        check: additionalParam.check
                    })
                )
            ),
            previousStatement: null,
            nextStatement: null,
            colour: modelConfig.colour
        },
        {
            type: predictBlock,
            message0:
<<<<<<< HEAD
                (modelConfig.predictStr ??
                    `predict with ${modelConfig.friendlyName} model`) +
=======
                (importedModule._MLModuleConfig
                    .predictStr ??
                    `predict with ${importedModule._MLModuleConfig.friendlyName} model`) +
>>>>>>> 0f410a5 (chore: fix prettier stuffs)
                " %1 input: %2",
            args0: [
                {
                    type: "input_value",
                    name: "MODEL_VAL",
<<<<<<< HEAD
                    check: modelConfig.blockPrefix
=======
                    check: importedModule._MLModuleConfig
                        .blockPrefix
>>>>>>> 0f410a5 (chore: fix prettier stuffs)
                },
                {
                    type: "input_value",
                    name: "INPUT_VAL",
                    ...(BlockType[
<<<<<<< HEAD
                        modelConfig.predictInputType
                    ] !== "None" && {
                        // This converts the enum value to a string
                        check: BlockType[
                            modelConfig.predictInputType
=======
                        importedModule._MLModuleConfig
                            .predictInputType
                    ] !== "None" && {
                        // This converts the enum value to a string
                        check: BlockType[
                            importedModule._MLModuleConfig
                                .predictInputType
>>>>>>> 0f410a5 (chore: fix prettier stuffs)
                        ]
                    })
                }
            ],
<<<<<<< HEAD
            output: BlockType[modelConfig.predictOutputType],
            colour: modelConfig.colour
=======
            output: BlockType[
                importedModule._MLModuleConfig
                    .predictOutputType
            ],
            colour: importedModule._MLModuleConfig.colour
>>>>>>> 0f410a5 (chore: fix prettier stuffs)
        }
    ]);

    blocklyJSDefs = blocklyJSDefs.concat([
        {
            block: createBlock,
            f: (block) =>
                valuePkg(
                    constructCodeFromParams(
                        block,
                        blockFunctionsLocation +
                            createBlock,
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
<<<<<<< HEAD
                        ...modelConfig.additionalFitParams.map(
                            (additionalParam) => additionalParam.id
=======
                        ...importedModule._MLModuleConfig.additionalFitParams.map(
                            (additionalParam) =>
                                additionalParam.id
>>>>>>> 0f410a5 (chore: fix prettier stuffs)
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
                        blockFunctionsLocation +
                            "generic_predict",
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
