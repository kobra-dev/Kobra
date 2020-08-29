function loadSatGPA() {
  var X = [];
  var y = [];
  d3.csv("datasets/satGPA.csv").then(function (data) {
    for (var i = 0; i < data.length; i++) {
      X.push(parseFloat(data[i].GPA));
      y.push(parseFloat(data[i].SAT));
      console.log(X, y);
    }
  });
  return [y, X];
}
