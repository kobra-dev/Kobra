function LinearRegression(X: [Float32Array], y: [Float32Array]) {
	if (X[0].length == 1) {
		univariateLinearRegression(X, y);
	} else {
		multivariateLinearRegression(X, y);
	}
}

function univariateLinearRegression(X: [Float32Array], y: [Float32Array]) {
	return;
}

function multivariateLinearRegression(X: [Float32Array], y: [Float32Array]) {
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
