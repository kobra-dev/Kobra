import { loadCSV } from './load_csv';

var regressionJS: HTMLScriptElement = document.createElement('script');
regressionJS.src = 'https://unpkg.com/idk';
document.head.appendChild(regressionJS);

export function LinearRegression(X: number[], y: number[]) {
	if (X[0].length === 1) {
		univariateLinearRegression(X, y);
	} else {
		multivariateLinearRegression(X, y);
	}
}

function univariateLinearRegression(X: number[], y: number[]) {
	return;
}

function multivariateLinearRegression(X: number[], y: number[]) {
	return;
}

export function LogisticRegression(X: number[], y: number[]) {
	if (X[0].length === 1) {
		univariateLogisticRegression(X, y);
	} else {
		multivariateLogisticRegression(X, y);
	}
}

function univariateLogisticRegression(X: number[], y: number[]) {
	return;
}

function multivariateLogisticRegression(X: number[], y: number[]) {
	return;
}
