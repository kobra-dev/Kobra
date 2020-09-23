import { RFClassification } from './RFClassifier';
import Blockly from 'blockly/core';
import {
  valuePkg,
  constructCodeFromParams,
  statementPkg,
  BlocklyJSDef
} from './blockUtils';

export function rfc_create(x: number[], y: number[]): RFClassification {
  let rfc = new RFClassification();
  rfc.loadData(x, y);
  return rfc;
}

export function rfc_fit(rfc: RFClassification): void {
    rfc.fit();
}

export function rfc_predict(rfc: RFClassification, x: number): number[] {
  return rfc.predict(x);
}

export function rfc_init_blocks(): BlocklyJSDef[] {
  Blockly.defineBlocksWithJsonArray([
    {
      type: 'rfc_create',
      message0:
        'random forest classifier model: %1 Training data x: %2 Training data y: %3',
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
      output: 'RFClassification',
      colour: 150
    },
    {
      type: 'rfc_fit',
      message0: 'fit random forest classifier model %1',
      args0: [
        {
          type: 'input_value',
          name: 'VALUE',
          check: 'RFClassification'
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 150
    },
    {
      type: 'rfc_predict',
      message0: 'predict with random forest classifier model %1 input: %2',
      args0: [
        {
          type: 'input_value',
          name: 'MODEL_VAL',
          check: 'RFClassification'
        },
        {
          type: 'input_value',
          name: 'INPUT_VAL',
          check: 'Number'
        }
      ],
      output: 'Number',
      colour: 150
    }
  ]);

  return [
    {
      block: 'rfc_create',
      f: (block) =>
        valuePkg(
          constructCodeFromParams(block, 'rfc_create', 'X_VAL', 'Y_VAL')
        )
    },
    {
      block: 'rfc_fit',
      f: (block) =>
        statementPkg(constructCodeFromParams(block, 'rfc_fit', 'VALUE'))
    },
    {
      block: 'rfc_predict',
      f: (block) =>
        valuePkg(
          constructCodeFromParams(
            block,
            'rfc_predict',
            'MODEL_VAL',
            'INPUT_VAL'
          )
        )
    }
  ];
}
