import Blockly from 'blockly/core';
import {
  valuePkg,
  constructCodeFromParams,
  statementPkg,
  BlocklyJSDef
} from './blockUtils';
import { BlockType, IMLModel, MLModuleConfig } from './MLModel';

interface MLModule {
    _MLModuleConfig: MLModuleConfig
}

const importedML: MLModule[] = [
    require('./KNN'),
    require('./LinearRegression'),
    require('./LogisticRegression'),
    require('./RFClassifier'),
    require('./RFRegression'),
    require('./SVC')
];

const blockFunctionsLocation = 'globalThis.mlFunctions.';
let blockFunctions : {[key: string] : {(..._ : any) : any}} = {
    'generic_fit': (model : IMLModel, ...variadic) => {
        model.fit(...variadic);
    },
    'generic_predict': (model : IMLModel, x) : any => {
        const result = model.predict(x);
        if (result === undefined) {
            throw new Error("Predict called before model fitted");
        }
        return result;
    }
}

let blocklyDefs : any[] = [];
let blocklyJSDefs : BlocklyJSDef[] = [];

importedML.forEach(importedModule => {
    // TypeScript doesn't like me indexing importedModule
    // @ts-ignore
    const moduleClass = importedModule[Object.keys(importedModule).filter(item => item !== "_MLModuleConfig")[0]];
    const createBlock = importedModule._MLModuleConfig.blockPrefix + '_create';
    const fitBlock = importedModule._MLModuleConfig.blockPrefix + '_fit';
    const predictBlock = importedModule._MLModuleConfig.blockPrefix + '_predict';

    blockFunctions[createBlock] = (x: any, y: any) => {
        let model = new moduleClass();
        model.loadData(x, y);
        return model;
    };

    blocklyDefs = blocklyDefs.concat([{
        type: createBlock,
        message0: importedModule._MLModuleConfig.createStr + ': %1 Training data x: %2 Training data y: %3',
        args0: [
            {
                type: 'input_dummy'
            },
            {
                type: 'input_value',
                name: 'X_VAL',
                check: 'Array'
            },
            {
                type: 'input_value',
                name: 'Y_VAL',
                check: 'Array'
            }
        ],
        inputsInline: false,
        output: importedModule._MLModuleConfig.blockPrefix,
        colour: importedModule._MLModuleConfig.colour
    },
    {
        type: fitBlock,
        message0: importedModule._MLModuleConfig.fitStr + ' %1 ' + importedModule._MLModuleConfig.additionalFitParams.map(
            (additionalParam, index) => additionalParam.message + ' %' + (index + 2)).join(' '),
        args0: [
            {
                type: 'input_value',
                name: 'MODEL_VAL',
                check: importedModule._MLModuleConfig.blockPrefix
            }
        ].concat(importedModule._MLModuleConfig.additionalFitParams.map(additionalParam => ({
            type: 'input_value',
            name: additionalParam.id,
            check: additionalParam.check
        }))),
        previousStatement: null,
        nextStatement: null,
        colour: importedModule._MLModuleConfig.colour
    },
    {
        type: predictBlock,
        message0: importedModule._MLModuleConfig.predictStr + ' %1 input: %2',
        args0: [
            {
                type: 'input_value',
                name: 'MODEL_VAL',
                check: importedModule._MLModuleConfig.blockPrefix
            },
            {
                type: 'input_value',
                name: 'INPUT_VAL',
                // This converts the enum value to a string
                check: BlockType[importedModule._MLModuleConfig.predictInputType]
            }
        ],
        output: BlockType[importedModule._MLModuleConfig.predictOutputType],
        colour: importedModule._MLModuleConfig.colour
    }]);
    
    blocklyJSDefs = blocklyJSDefs.concat([{
        block: createBlock,
        f: (block) =>
            valuePkg(constructCodeFromParams(block, blockFunctionsLocation + createBlock, 'X_VAL', 'Y_VAL'))
    },
    {
        block: fitBlock,
        f: (block) =>
            statementPkg(constructCodeFromParams(block, blockFunctionsLocation + 'generic_fit', 'MODEL_VAL',
            ...importedModule._MLModuleConfig.additionalFitParams.map(additionalParam => additionalParam.id)))
    },
    {
        block: predictBlock,
        f: (block) =>
            valuePkg(
                constructCodeFromParams(
                    block,
                    blockFunctionsLocation + 'generic_predict',
                    'MODEL_VAL',
                    'INPUT_VAL'
                )
            )
    }]);
});

export { blockFunctions as mlFunctions };

export function init_blocks() : BlocklyJSDef[] {
    Blockly.defineBlocksWithJsonArray(blocklyDefs);
    return blocklyJSDefs;
}