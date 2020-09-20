var SVM = require('ml-svm');

var options = {
	C: 0.01,
	tol: 10e-4,
	maxPasses: 10,
	maxIterations: 10000,
	kernel: 'rbf',
	kernelOptions: {
		sigma: 0.5
	}
};

var svm = new SVM(options);

// Train the classifier - we give him an xor
var features = [
	[0, 0],
	[0, 1],
	[1, 1],
	[1, 0]
];
var labels = [1, -1, 1, -1];
svm.train(features, labels);

// Let's see how narrow the margin is
var margins = svm.margin(features);

// Let's see if it is separable by testing on the training data
console.log(svm.predict(features)); // [1, -1, 1, -1]
