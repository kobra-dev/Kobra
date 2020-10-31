var SVM = require('ml-svm');

class SVC {
  X : number[] | undefined;
  y : number[] | undefined;
  model: SVM | undefined;

  loadData(X : number[], y : number[]) {
    this.X = X;
    this.y = y;
  }

  fit() {
    if (this.model==undefined){
      throw "model undefined"
    } else {
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

      this.model.train(this.X, this.y);
    }
  }

  predict(X) {
    if (X[0][0] === undefined) {
      return this.model.predict([X]);
    } else {
      return this.model.predict(X);
    }
  }
}

export { SVC };