const RF = require('ml-random-forest');
const RFRegressor = RF.RandomForestRegression;

class RFRegression {
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

		this.model = new RFRegressor(hyperparams);
		this.model.train(this.X, this.y);
	}

	predict(X) {
		return this.model.predict([X]);
	}
}
