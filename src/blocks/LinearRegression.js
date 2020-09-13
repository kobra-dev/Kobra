const SimpleLinearRegression = require('ml-regression-simple-linear');
const MLR = require('ml-regression-multivariate-linear');

class LinReg {
	loadData(X, y) {
		this.X = X;
		this.y = y;
	}

	fit() {
		if (this.X[0][0] === undefined) {
			console.log('SLR');
			this.slr = new SimpleLinearRegression(this.X, this.y);
		} else {
			console.log('MLR');
			if (this.y[0][0] == undefined) {
				this.mlr = new MLR(this.X, this.y);
			}
		}
	}
	predict() {}
}

const simpleLR = new LinReg();

simpleLR.loadData([1, 2, 3], [1, 2, 3]);

simpleLR.fit();

console.log(simpleLR.slr);

const multiLR = new LinReg();

multiLR.loadData(
	[
		[1, 2, 3],
		[2, 3, 4],
		[5, 6, 7]
	],
	[[1], [2], [3]]
);

multiLR.fit();

console.log(multiLR.mlr);
