var regressionJS: HTMLScriptElement = document.createElement('script');
regressionJS.src = 'https://unpkg.com/idk';
document.head.appendChild(regressionJS);

export default function LinearRegression(X: number[], y: number[]) {
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

function appendProgressUniLinReg(
	progress: number,
	slope: number,
	intercept: number,
	mse: number,
	r2: number
) {
	var newElem: HTMLElement = document.createElement('div');
	newElem.innerHTML = '';
	return;
}

function appendProgressMultiLinReg(progress: number, mse: number, r2: number) {
	var newElem: HTMLElement = document.createElement('div');
	newElem.innerHTML = '';
	return;
}
