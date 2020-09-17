// Dependencies from ml.js
const SimpleLinearRegression = require('ml-regression-simple-linear');
const MLR = require('ml-regression-multivariate-linear');

// LinReg Class
class LinReg {
	loadData(X, y) {
		//loads the data
		this.X = X;
		this.y = y;
	}

	fit() {
		//fits linreg to dataset
		if (this.X[0][0] === undefined) {
			this.slr = new SimpleLinearRegression(this.X, this.y);
			this.modelType = 'SLR';
		} else {
			if (this.y[0][0] === undefined) {
				for (var i = 0; i < this.y.length; i++) {
					this.y[i] = [this.y[i]];
				}
			}
			this.mlr = new MLR(this.X, this.y);
			this.modelType = 'MLR';
		}
	}
	predict(X) {
		if (this.modelType === 'SLR') {
			return this.slr.toJSON().slope * X + this.slr.toJSON().intercept;
		} else {
			var sum = 0;
			for (var i = 0; i < X.length; i++) {
				sum += X[i] * this.mlr.toJSON().weights[i][0];
				console.log(sum);
			}
			const weights = this.mlr.toJSON().weights;
			sum += Number(weights[weights.length - 1]);

			sum = Math.round((sum * (10 ^ 5)) / (10 ^ 5));
			return sum;
		}
	}
}

export { LinReg }

/*//testing stuf
const simpleLR = new LinReg();

simpleLR.loadData([1, 2, 3], [1, 2, 3]);

simpleLR.fit();

console.log(simpleLR.slr.toJSON());

console.log(simpleLR.modelType);

console.log(simpleLR.predict(3));

const multiLR = new LinReg();

multiLR.loadData(
	[
		[1, 2, 3],
		[2, 3, 4],
		[5, 6, 7]
	],
	[7, 10, 19]
);

multiLR.fit();

console.log(multiLR.mlr.toJSON());

console.log(multiLR.predict([1, 2, 3]));
*/