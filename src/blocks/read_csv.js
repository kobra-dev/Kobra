const fetch = require('node-fetch');

async function loadData() {
	const response = fetch('../datasets/satGPA.csv');
	console.log(response);
}

loadData();
