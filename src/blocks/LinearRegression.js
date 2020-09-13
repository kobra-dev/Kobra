const SimpleLinearRegression = require('ml-regression-simple-linear');
const MLR = require('ml-regression-multivariate-linear');
const { Matrix } = require('ml-matrix');

class LinReg {
	loadData(X, y) {
		this.X = X;
		this.y = y;
	}

	fit() {
		if (this.X[0][0] === undefined) {
			console.log('SLR');
		} else {
			console.log('MLR');
		}
	}
	predict() {}
}

const model = new LinReg();

model.loadData(
	[
		[1, 2],
		[2, 3],
		[4, 5]
	],
	[1, 2, 3]
);

model.fit();
