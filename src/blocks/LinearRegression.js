class LinearRegression {
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

function linReg(X, y) {
	var linearRegression = new LinearRegression();
	linearRegression.X = X;
	linearRegression.y = y;

	linearRegression.fit();
}
