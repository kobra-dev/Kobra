const KNN = require('ml-knn');

class KNearestNeighbors {
	loadData(X, y) {
		this.X = X;
		this.y = y;
	}

	fit(k) {
		this.k = k;
		this.model = new KNN(this.X, this.y, { k: this.k });
	}

	predict(X) {
		if (X[0][0] === undefined) {
			X = [X];
		}
		const result = this.model.predict(X);
		console.log(result);
		return result;
	}
}

export { KNearestNeighbors };

var knn = new KNearestNeighbors();

var X_train = [
	[0, 0, 0],
	[0, 1, 1],
	[1, 1, 0],
	[2, 2, 2],
	[1, 2, 2],
	[2, 1, 2]
];
var y_train = [0, 0, 0, 1, 1, 1];

knn.loadData(X_train, y_train);

knn.fit(2);

knn.predict([[0, 0, 0]]);
