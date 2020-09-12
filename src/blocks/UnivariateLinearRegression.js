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
		let model = regression.linear(this.data, { order: 2, precision: 5 });
		this.model = model;

		this.equation = model.equation;
	}
}

var a = new UnivariateLinearRegression();
a.data = [
	[1, 2],
	[3, 4],
	[5, 6],
	[7, 8],
	[9, 10]
];

a.fit();

console.log(a.model.predict);

/*

var linearRegression = new UnivariateLinearRegression();

linearRegression.data = data.data;

linearRegression.fit();

function uniLinRegPredict(X, equation) {
	let pred = X[0] * equation[0] + equation[1];
	return pred;
}

console.log(uniLinRegPredict([2], linearRegression.equation));
*/
