var SVM = require('ml-svm');

class SVC {
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

export { SVC };