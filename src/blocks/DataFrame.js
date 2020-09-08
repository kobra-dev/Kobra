var fs = require('fs');
const path = require('path');

class DataFrame {
	data;
	csvPath;
	isTranspose;
	headers;

	constructor(data, csvPath, headers, isTranspose) {
		this.data = data;
		this.path = csvPath;
		this.isTranspose = isTranspose;
		this.headers = headers;
	}

	read_csv() {
		//read csv with this.path
	}

	transpose() {}

	drop() {}
}

var data = String(
	fs.readFileSync(path.resolve(__dirname, './datasets/satGPA.csv'))
);
data = String(data).split('\n');

const headers = data[0].split(',');

const dataset = [];

for (var elemIndex = 0; elemIndex < data.length; elemIndex++) {
	let element = data[elemIndex];
	element = String(element).split(',').map(Number);
	dataset.push(element);
}

console.log(dataset);
