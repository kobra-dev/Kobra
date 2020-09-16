const { Matrix } = require('ml-matrix');
const LogisticRegression = require('ml-logistic-regression');

class LogReg {
	loadData(X, y) {
		//loads the data
		this.X = new Matrix(X);
		this.y = Matrix.columnVector(y);
	}

	fit() {
		this.model = LogisticRegression({ numSteps: 1000, learningRate: 5e-3 });
		this.model.train(this.X, this.y);
	}

	predict(X) {
		var preds = [];

		for (var i = 0; i < X.length; i++) {
			var X_pred = new Matrix([X[i]]);
			console.log(this.model.predict(X_pred));
		}
	}
}

const Xd = [
	[0, -1],
	[1, 0],
	[1, 1],
	[1, -1],
	[2, 0],
	[2, 1],
	[2, -1],
	[3, 2],
	[0, 4],
	[1, 3],
	[1, 4],
	[1, 5],
	[2, 3],
	[2, 4],
	[2, 5],
	[3, 4],
	[1, 10],
	[1, 12],
	[2, 10],
	[2, 11],
	[2, 14],
	[3, 11]
];
const Y = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2];

// The test set (Xtest, Ytest).
const Xtest = [
	[0, -2],
	[1, 0.5],
	[1.5, -1],
	[1, 2.5],
	[2, 3.5],
	[1.5, 4],
	[1, 10.5],
	[2.5, 10.5],
	[2, 11.5]
];
const Ytest = Matrix.columnVector([0, 0, 0, 1, 1, 1, 2, 2, 2]);

// We will train our model.
const logreg = new LogisticRegression({ numSteps: 1000, learningRate: 5e-3 });
logreg.train(X, Y);

// We try to predict the test set.
const finalResults = logreg.predict(Xtest);
