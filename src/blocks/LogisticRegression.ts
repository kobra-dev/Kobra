import { Matrix } from 'ml-matrix';
import { LogisticRegression } from 'ml-logistic-regression';

class LogReg {
  X : Matrix | undefined;
  y : Matrix | undefined;
  model : LogisticRegression | undefined;

  loadData(X:number[][], y:number[]) {
    //loads the data
    this.X = new Matrix(X);
    this.y = Matrix.columnVector(y);
  }

  fit() {
    this.model = new LogisticRegression({ numSteps: 1000, learningRate: 5e-3 });
    if (this.model!==undefined){
    this.model.train(this.X, this.y);
  }
  }

  predict(x:number[]) {
    if (this.model!==undefined){
    var preds = [];
    var X: number[][]= [x]

    for (var i = 0; i < X.length; i++) {
      var X_pred = new Matrix([X[i]]);
      preds.push(this.model.predict(X_pred)[0]);
    }

    return preds;
  }
  }
}

export { LogReg };
