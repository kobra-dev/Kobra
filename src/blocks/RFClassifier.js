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

var XTrain = [
	[73, 80, 75, 152],
	[93, 88, 93, 185],
	[89, 91, 90, 180],
	[96, 98, 100, 196],
	[73, 66, 70, 142]
];

var yTrain = [0, 1, 2, 3, 2];

rfcTest.loadData(XTrain, yTrain);

rfcTest.fit();

console.log(rfcTest.predict([1, 2, 3, 4]));
