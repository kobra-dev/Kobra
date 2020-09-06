export default class LogisticRegression {
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
