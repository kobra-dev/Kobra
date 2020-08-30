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

function appendProgress(
	progress: number,
	slope: number,
	intercept: number,
	r2: number
) {
	return;
}
