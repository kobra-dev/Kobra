class LogisticRegression {
	X;
	y;

	constructor(X, y) {
		this.X = X;
		this.y = y;
	}

	fit() {
		let X = this.X;
		let y = this.y;

		console.log(X);
		console.log(y);
	}
}

function logReg(X, y) {
	var logisticRegression = new LogisticRegression();
	logisticRegression.X = X;
	logisticRegression.y = y;

	logisticRegression.fit();
}
