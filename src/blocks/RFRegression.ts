import { RandomForestRegression} from 'ml-random-forest';
import { BlockType, IMLModel, MLModuleConfig } from './MLModel';

export class RFRegression implements IMLModel {
  X : number[][] | undefined;
  y : number[] | undefined;
  model : RandomForestClassifier | undefined;
  seed : number | undefined;

  loadData(X:number[][], y:number[]) {
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

    this.model = new RandomForestRegression(hyperparams);
    this.model?.train(this.X, this.y);
  }

  predict(X : number) {
    return this.model?.predict([X]);
  }
}

export const _MLModuleConfig : MLModuleConfig = {
  createStr: "random forest regression model",
  fitStr: "fit random forest regression model",
  predictStr: "predict with random forest regression model",
  predictInputType: BlockType.Number,
  predictOutputType: BlockType.Number,
  colour: 150,
  blockPrefix: "rfr",
  additionalFitParams: []
};