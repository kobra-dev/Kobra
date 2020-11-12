import { BlockType, IMLModel, MLModuleConfig } from "./MLModel";

var SVM = require('ml-svm');

export class SVC implements IMLModel {
  X : number[] | undefined;
  y : number[] | undefined;
  model: SVM | undefined;

  loadData(X : number[], y : number[]) {
    this.X = X;
    this.y = y;
    this.model = new SVM({
      C: 0.01,
      tol: 10e-4,
      maxPasses: 10,
      maxIterations: 10000,
      kernel: 'rbf',
      kernelOptions: {
        sigma: 0.5
      }
    });
  }

  fit() {
    if (this.model===undefined){
      return;
    } else {
      this.model.train(this.X, this.y);
    }
  }

  predict(X: number[] | number[][]): number {
    if (this.model===undefined){
      return -1;
    }
    return this.model.predict([X]);
  }
}

export const _MLModuleConfig : MLModuleConfig = {
  createStr: "support vector classifier model",
  fitStr: "fit support vector classifier model",
  predictStr: "predict with support vector classifier model",
  predictInputType: BlockType.Array,
  predictOutputType: BlockType.Number,
  colour: 150,
  blockPrefix: "svc",
  additionalFitParams: []
};