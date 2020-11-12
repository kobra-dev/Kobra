import { RandomForestClassifier } from 'ml-random-forest';
import { BlockType, IMLModel, MLModuleConfig } from './MLModel';

export class RFClassification implements IMLModel {
  X : number[][] | undefined;
  y : number[] | undefined;
  model : RandomForestClassifier | undefined;
  seed : number | undefined;

  loadData(X : number[][], y : number[]) {
    this.X = X;
    this.y = y;

    this.seed = X[0].length;
  }

  fit() {
    let hyperparams = {
      seed: this.seed,
      maxFeatures: 2,
      replacement: false,
      nEstimators: 200
    };

    this.model = new RandomForestClassifier(hyperparams);
    this.model?.train(this.X, this.y);
  }

  predict(X : number) {
    return this.model?.predict([X]);
  }
}

export const _MLModuleConfig : MLModuleConfig = {
  createStr: "random forest classifier model",
  fitStr: "fit random forest classifier model",
  predictStr: "predict with random forest classifier model",
  predictInputType: BlockType.Number,
  predictOutputType: BlockType.Number,
  colour: 150,
  blockPrefix: "rfc",
  additionalFitParams: []
};