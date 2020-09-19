const RF = require('ml-random-forest');
const RFRegressor = RF.RandomForestRegression;
/*
class RFRegression {
	loadData(X, y) {
		this.X = new Array(X);
		this.y = new Array(y);
	}
	fit() {
		let hyperparams = {
			seed: 3,
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
var yTrain = [[152, 185, 180, 196, 142]];

rfrTest.loadData(XTrain, yTrain);

rfrTest.fit();

let XTest = new Array([[342, 233, 23, 43]]);

rfrTest.predict(XTrain);
*/
var dataset = [
	[73, 80, 75, 152],
	[93, 88, 93, 185],
	[89, 91, 90, 180],
	[96, 98, 100, 196],
	[73, 66, 70, 142],
	[53, 46, 55, 101],
	[69, 74, 77, 149],
	[47, 56, 60, 115],
	[87, 79, 90, 175],
	[79, 70, 88, 164],
	[69, 70, 73, 141],
	[70, 65, 74, 141],
	[93, 95, 91, 184],
	[79, 80, 73, 152],
	[70, 73, 78, 148],
	[93, 89, 96, 192],
	[78, 75, 68, 147],
	[81, 90, 93, 183],
	[88, 92, 86, 177],
	[78, 83, 77, 159],
	[82, 86, 90, 177],
	[86, 82, 89, 175],
	[78, 83, 85, 175],
	[76, 83, 71, 149],
	[96, 93, 95, 192]
];

var trainingSet = new Array(dataset.length);
var predictions = new Array(dataset.length);

for (var i = 0; i < dataset.length; ++i) {
	trainingSet[i] = dataset[i].slice(0, 3);
	predictions[i] = dataset[i][3];
}

var options = {
	seed: 3,
	maxFeatures: 2,
	replacement: false,
	nEstimators: 200
};

var regression = new RFRegressor(options);
regression.train(trainingSet, predictions);
var result = regression.predict(trainingSet);
console.log(result);
