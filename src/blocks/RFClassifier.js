const RF = require('ml-random-forest');
const RFClassifier = RF.RandomForestClassifier;

class RFClassification {
	loadData(X, y) {
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

		this.model = new RFClassifier(hyperparams);
		this.model.train(this.X, this.y);
	}

	predict(X) {
		return this.model.predict([X]);
	}
}

let rfcTest = new RFClassification();

rfcTest.loadData;
