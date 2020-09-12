const regression = require('regression');
var fs = require('fs');
const path = require('path');

class Kobra {
	data;
	headers;

	constructor(data, headers, columnsSelected) {
		this.data = data;

		this.headers = headers;

		this.models = [];
	}

	read_csv(csvPath) {
		var data = String(
			fs.readFileSync(path.resolve(__dirname, String('./datasets/' + csvPath)))
		).split('\n');

		const headers = data[0].split(',');

		const dataset = [];

		for (var elemIndex = 0; elemIndex < data.length; elemIndex++) {
			let element = data[elemIndex];
			element = String(element).split(',').map(Number);
			dataset.push(element);
		}

		this.headers = headers;
		this.data = dataset.slice(1, dataset.length);
		this.isTranspose = false;
	}

	transpose() {
		if (this.isTranspose === false) {
			this.isTranspose = true;
		} else {
			this.isTranspose = false;
		}

		this.data = this.data[0].map((_, colIndex) =>
			this.data.map((row) => row[colIndex])
		);
	}

	loc(columnsSelected) {
		if (this.isTranspose === false) {
			this.transpose();
		}

		var newData = [];

		for (
			var headerIndex = 0;
			headerIndex < this.headers.length;
			headerIndex++
		) {
			for (
				var columnIndex = 0;
				columnIndex < columnsSelected.length;
				columnIndex++
			) {
				if (
					String(this.headers[headerIndex]).trim() ===
					String(columnsSelected[columnIndex]).trim()
				) {
					newData.push(this.data[headerIndex]);
				}
			}
		}
		this.data = newData;
		this.headers = columnsSelected;
	}

	drop() {}

	trainTestSplit() {
		if (this.isTranspose == false) {
			this.transpose();
		}
		// shuffle dataset & index first 80% of elements for train or whatever threshold is wanted
	}

	uniLinearRegressionFit() {
		if (this.isTranspose === true) {
			this.transpose();
		}

		let model = regression.linear(this.data, { order: 2, precision: 5 });

		this.models.push(['UnivarLinReg', model]);
	}

	uniLinearRegressionPredict(x) {
		console.log(
			this.models[this.models.length - 1][1].equation[0] * x +
				this.models[this.models.length - 1][1].equation[1]
		);
	}

	predict(x) {
		const predModel = this.models[this.models.length - 1][0];

		if (predModel == 'UnivarLinReg') {
			this.uniLinearRegressionPredict(x);
		}
	}
}

const kobra = new Kobra();

kobra.read_csv('satGPA.csv');

kobra.uniLinearRegressionFit();

kobra.predict(2400);
