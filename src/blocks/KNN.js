const KNN = require('ml-knn');

class KNN {
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
		console.log(this.model.predict(X));
	}
}
