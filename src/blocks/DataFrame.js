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

var fs = require('fs');
const path = require('path');

var text = String(fs.readFileSync(path.resolve(__dirname, './satGPA.csv')));
var textByLine = text.split('\n');

for (var elemIndex = 0; elemIndex < textByLine.length; elemIndex++) {
	console.log(elemIndex);
}
