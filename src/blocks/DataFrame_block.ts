import { DataFrame } from './DataFrame';
import Blockly from 'blockly/core';
import {
  valuePkg,
  constructCodeFromParams,
  ArgType,
  statementPkg,
  BlocklyJSDef
} from './blockUtils';
import satGPA from './datasets/kobraDS/satGPA';

export function df_create_empty(): DataFrame {
  return new DataFrame(undefined, undefined);
}

export function df_create(headers: string, data: string[]): DataFrame {
  return new DataFrame(headers, data);
}

export function df_create_from_csv(csvPath: string): DataFrame {
  if (csvPath === 'satGPA') {
    return satGPA;
  }
  return df_create_empty();
}

export function df_transpose(df: DataFrame): void {
  df.transpose();
}

export function df_loc(df: DataFrame, columnsSelected: string): DataFrame {
  return df.loc(columnsSelected);
}

export function df_drop(df: DataFrame): void {
  // TODO: not implemented in DataFrame.js
}

export function df_trainTestSplit(df: DataFrame): void {
  // TODO: not fully implemented in DataFrame.js
  df.trainTestSplit();
}

export function df_init_blocks(): BlocklyJSDef[] {
  Blockly.defineBlocksWithJsonArray([
    {
      type: 'df_create_empty',
      message0: 'empty DataFrame',
      output: 'DataFrame',
      colour: 90
    },
    {
      type: 'df_create',
      message0: 'DataFrame with headers %1 and data %2',
      args0: [
        {
          type: 'input_value',
          name: 'HEAD_VAL',
          check: 'String'
        },
        {
          type: 'input_value',
          name: 'DATA_VAL',
          check: 'Array'
        }
      ],
      output: 'DataFrame',
      colour: 90
    },
    {
      type: 'df_create_from_csv',
      message0: 'DataFrame from dataset %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'CSV_DROPDOWN',
          options: [['satGPA', 'satGPA']]
        }
      ],
      output: 'DataFrame',
      colour: 90
    },
    {
      type: 'df_transpose',
      message0: 'transpose Dataframe %1',
      args0: [
        {
          type: 'field_variable',
          name: 'VALUE',
          variable: 'df',
          check: 'DataFrame'
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 90
    },
    {
      type: 'df_loc',
      message0: 'select columns %1 from Dataframe %2',
      args0: [
        {
          type: 'input_value',
          name: 'COL_VAL',
          check: 'String'
        },
        {
          type: 'field_variable',
          name: 'DF_VAL',
          variable: 'df',
          check: 'DataFrame'
        }
      ],
      output: 'DataFrame',
      colour: 90
    }
  ]);

  return [
    {
      block: 'df_create_empty',
      f: (block) => valuePkg(constructCodeFromParams(block, 'df_create_empty'))
    },
    {
      block: 'df_create',
      f: (block) =>
        valuePkg(
          constructCodeFromParams(block, 'df_create', 'HEAD_VAL', 'DATA_VAL')
        )
    },
    {
      block: 'df_create_from_csv',
      f: (block) =>
        valuePkg(
          constructCodeFromParams(block, 'df_create_from_csv', {
            type: ArgType.Field,
            arg: 'CSV_DROPDOWN'
          })
        )
    },
    {
      block: 'df_transpose',
      f: (block) =>
        statementPkg(
          constructCodeFromParams(block, 'df_transpose', {
            type: ArgType.Variable,
            arg: 'VALUE'
          })
        )
    },
    {
      block: 'df_loc',
      f: (block) =>
        valuePkg(
          constructCodeFromParams(
            block,
            'df_loc',
            {
              type: ArgType.Variable,
              arg: 'DF_VAL'
            },
            {
              type: ArgType.Value,
              arg: 'COL_VAL'
            }
          )
        )
    }
  ];
}
