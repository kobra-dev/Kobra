import { LogReg } from './LogisticRegression';
import Blockly from 'blockly/core';
import {
  valuePkg,
  constructCodeFromParams,
  statementPkg,
  BlocklyJSDef
} from './blockUtils';

export function logr_create(x: number[][], y: number[]): LogReg {
  let lr = new LogReg();
  lr.loadData(x, y);
  return lr;
}

export function logr_fit(lr: LogReg): void {
  lr.fit();
}

export function logr_predict(lr: LogReg, x: number[]): number {
  var pred: any[] | undefined | number= lr.predict(x);
  if (pred!==undefined) {
    pred = +pred
  } else {
    return -1;
  }
  if (pred===undefined){
    try{
      return pred;
    } catch(error) {
      return -1
    }
  } else {
    return -1;
  }
}

export function logr_init_blocks(): BlocklyJSDef[] {
  Blockly.defineBlocksWithJsonArray([
    {
      type: 'logr_create',
      message0:
        'logistic regression model: %1 Training data x: %2 Training data y: %3',
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
      output: 'LogReg',
      colour: 60
    },
    {
      type: 'logr_fit',
      message0: 'fit logistic regression model %1',
      args0: [
        {
          type: 'input_value',
          name: 'VALUE',
          check: 'LogReg'
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 60
    },
    {
      type: 'logr_predict',
      message0: 'predict with logistic regression model %1 input: %2',
      args0: [
        {
          type: 'input_value',
          name: 'MODEL_VAL',
          check: 'LogReg'
        },
        {
          type: 'input_value',
          name: 'INPUT_VAL',
          check: 'Number'
        }
      ],
      output: 'Number',
      colour: 60
    }
  ]);

  return [
    {
      block: 'logr_create',
      f: (block) =>
        valuePkg(
          constructCodeFromParams(block, 'logr_create', 'X_VAL', 'Y_VAL')
        )
    },
    {
      block: 'logr_fit',
      f: (block) =>
        statementPkg(constructCodeFromParams(block, 'logr_fit', 'VALUE'))
    },
    {
      block: 'logr_predict',
      f: (block) =>
        valuePkg(
          constructCodeFromParams(
            block,
            'logr_predict',
            'MODEL_VAL',
            'INPUT_VAL'
          )
        )
    }
  ];
}
