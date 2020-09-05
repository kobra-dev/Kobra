export default class LogisticRegression {
	X: number[];
	y: number[];

	constructor(X: number[], y: number[]) {
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
