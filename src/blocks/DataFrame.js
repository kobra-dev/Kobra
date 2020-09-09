var fs = require('fs');
const path = require('path');

class DataFrame {
	data;
	csvPath;
	isTranspose;
	headers;
	columnsSelected;

	constructor(data, csvPath, headers, isTranspose, columnsSelected) {
		this.data = data;
		this.csvPath = csvPath;
		this.isTranspose = isTranspose;
		this.headers = headers;
		this.columnsSelected = columnsSelected;
	}

	read_csv() {
		var data = String(
			fs.readFileSync(
				path.resolve(__dirname, String('./datasets/' + this.csvPath))
			)
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
	}

	transpose() {
		if (this.isTranspose == false) {
			this.isTranspose = true;
		} else {
			this.isTranspose = false;
		}

		this.data = this.data[0].map((_, colIndex) =>
			this.data.map((row) => row[colIndex])
		);
	}

	loc() {
		if (this.isTranspose == true) {
			this.transpose();
		}

		var newData = [];
		var newHeaders = this.columnsSelected;

		for (
			var headerIndex = 0;
			headerIndex < this.headers.length;
			headerIndex++
		) {
			for (
				var columnIndex = 0;
				columnIndex < this.columnsSelected.length;
				columnIndex++
			) {
				if (
					String(this.headers[headerIndex]).trim() ==
					String(this.columnsSelected[columnIndex]).trim()
				) {
					newData.push(this.data[headerIndex]);
				}
			}
		}
		this.data = newData;
		this.headers = this.columnsSelected;
	}

	drop() {}

	trainTestSplit() {}
}

var data = new DataFrame();
data.csvPath = 'satGPA.csv';
data.columnsSelected = ['SAT'];
data.read_csv();
data.transpose();
data.transpose();
data.loc();
console.log(data.data);
console.log(data.headers);
