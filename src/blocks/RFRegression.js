const RF = require('ml-random-forest');
const RFRegressor = RF.RandomForestRegression;

class RFRegression {
	loadData(X, y) {
		this.X = X;
		this.y = y;

		this.seed = X[0].length;

		console.log(X);
	}

	fit() {
		let hyperparams = {
			seed: this.seed,
			maxFeatures: 2,
			replacement: false,
			nEstimators: 200
		};
		this.model = new RFRegressor(hyperparams);
		this.model.train(this.X, this.y);
	}

	predict(X) {
		console.log(this.model.predict(X));
	}
}

var rfrTest = new RFRegression();
var XTrain = [
	[73, 80, 75, 152],
	[93, 88, 93, 185],
	[89, 91, 90, 180],
	[96, 98, 100, 196],
	[73, 66, 70, 142]
];

var yTrain = [152, 185, 180, 196, 142];

rfrTest.loadData(XTrain, yTrain);

rfrTest.fit();

let XTest = [[342, 233, 23, 43]];

rfrTest.predict(XTest);
