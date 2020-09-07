const regression = require('regression');

class UnivariateLinearRegression {
	data;

	gradient;
	bias;

	constructor(data, gradient, bias) {
		this.data = data;

		this.gradient = gradient;
		this.bias = bias;
	}

	fit() {
		let data = this.data;

		let model = regression.linear(data, { order: 2, precision: 5 });
		this.model = model;

		this.equation = model.equation;

		this.gradient = model.equation[0];
		this.bias = model.equation[1];
	}
}

var linearRegression = new UnivariateLinearRegression();

let trainData = [
	[1, 2],
	[2, 3],
	[3, 4],
	[4, 5],
	[5, 6],
	[6, 7],
	[7, 8],
	[8, 9],
	[9, 10],
	[10, 11],
	[11, 12],
	[12, 13]
];

linearRegression.data = trainData;

linearRegression.fit();

function uniLinRegPredict(X, equation) {
	let pred = X[0] * equation[0] + equation[1];
	return pred;
}

console.log(uniLinRegPredict([2], linearRegression.equation));
