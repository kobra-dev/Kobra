/*const regressionJS: HTMLScriptElement = document.createElement('script');
regressionJS.src = '../../node_modules/data-forge/dist/web/index.js';
document.head.appendChild(regressionJS);*/

const dataForge: any = require('data-forge');
require('data-forge-fs');

function read_csv(csv_selected: string) {
	if (csv_selected === 'satGPA') {
		var dataset: any = dataForge
			.readFileSync('../datasets/satGPA.csv')
			.parseCSV();
		console.log(dataset);
	}
}

read_csv('satGPA');
