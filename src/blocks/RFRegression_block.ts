import { RFRegression } from './RFRegression';
import Blockly from 'blockly/core';
import {
  valuePkg,
  constructCodeFromParams,
  statementPkg,
  BlocklyJSDef
} from './blockUtils';

export function rfr_create(x: number[], y: number[]): RFRegression {
  let rfr = new RFRegression();
  rfr.loadData(x, y);
  return rfr;
}

export function rfr_fit(rfr: RFRegression): void {
  rfr.fit();
}

export function rfr_predict(rfr: RFRegression, x: number): number[] {
  return rfr.predict(x);
}

export function rfr_init_blocks(): BlocklyJSDef[] {
  Blockly.defineBlocksWithJsonArray([
    {
      type: 'rfr_create',
      message0:
        'random forest regression model: %1 Training data x: %2 Training data y: %3',
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
      output: 'RFRegression',
      colour: 150
    },
    {
      type: 'rfr_fit',
      message0: 'fit random forest regression model %1',
      args0: [
        {
          type: 'input_value',
          name: 'VALUE',
          check: 'RFRegression'
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 150
    },
    {
      type: 'rfr_predict',
      message0: 'predict with random forest regression model %1 input: %2',
      args0: [
        {
          type: 'input_value',
          name: 'MODEL_VAL',
          check: 'RFRegression'
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
      block: 'rfr_create',
      f: (block) =>
        valuePkg(constructCodeFromParams(block, 'rfr_create', 'X_VAL', 'Y_VAL'))
    },
    {
      block: 'rfr_fit',
      f: (block) =>
        statementPkg(constructCodeFromParams(block, 'rfr_fit', 'VALUE'))
    },
    {
      block: 'rfr_predict',
      f: (block) =>
        valuePkg(
          constructCodeFromParams(
            block,
            'rfr_predict',
            'MODEL_VAL',
            'INPUT_VAL'
          )
        )
    }
  ];
}
