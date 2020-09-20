var SVM = require('ml-svm');

class SVC {
	constructor() {
		this.hyperparams = {
			C: 0.01,
			tol: 10e-4,
			maxPasses: 10,
			maxIterations: 10000,
			kernel: 'rbf',
			kernelOptions: {
				sigma: 0.5
			}
		};
	}

	loadData(X, y) {
		this.X = X;
		this.y = y;
	}

	fit() {
		this.model = new SVM(this.hyperparams);
		this.model.train(this.X, this.y);
	}

	predict(X) {
		if (X[0][0] == undefined) {
			return this.model.predict([X]);
		} else {
			return this.model.predict(X);
		}
	}
}
export { SVC };
