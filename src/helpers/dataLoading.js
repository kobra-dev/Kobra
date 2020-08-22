function loadData(dataset) {
  d3.csv("../datasets/" + dataset).then(function (data) {
    console.log(data[0]);
  });
}

loadData("satGPA.csv");
