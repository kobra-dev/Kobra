const RF = require('ml-random-forest');
const RFRegressor = RF.RandomForestRegression;

class RFRegression {
  loadData(X, y) {
    this.X = X;
    this.y = y;
  }
  fit() {
    this.model = new RFRegressor({
      seed: 3,
      maxFeatures: 2,
      replacement: false,
      nEstimators: 200
    });
    this.model.train(this.X, this.y);
  }
  predict() {}
}
