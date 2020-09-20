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
}

const svcTest = new SVC();

svcTest.loadData(
	[
		[0, 0],
		[0, 1],
		[1, 1],
		[1, 0]
	],
	[1, -1, 1, -1]
);

svcTest.fit();
