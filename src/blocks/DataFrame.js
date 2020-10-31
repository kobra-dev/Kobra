class DataFrame {
  data;
  headers;

  constructor(headers, data) {
    this.headers = headers;
    this.data = data;
  }

  read_csv(dataStr) {
    var data = dataStr.split('\n');

    const headers = data[0].split(',');

    const dataset = [];

    for (var elemIndex = 0; elemIndex < data.length; elemIndex++) {
      let element = data[elemIndex];
      element = String(element).split(',').map(Number);
      dataset.push(element);
    }

    this.headers = headers;
    this.data = dataset.slice(1, dataset.length);
    this.isTranspose = false;
  }

  transpose() {
    if (this.isTranspose === false) {
      this.isTranspose = true;
    } else {
      this.isTranspose = false;
    }

    this.data = this.data[0].map((_, colIndex) =>
      this.data.map((row) => row[colIndex])
    );
  }

  loc(columnsSelected) {
    if (this.isTranspose === false) {
      this.transpose();
    }

    var newData = [];

    for (
      var headerIndex = 0;
      headerIndex < this.headers.length;
      headerIndex++
    ) {
      for (
        var columnIndex = 0;
        columnIndex < columnsSelected.length;
        columnIndex++
      ) {
        if (
          String(this.headers[headerIndex]).trim() ===
          String(columnsSelected[columnIndex]).trim()
        ) {
          newData.push(this.data[headerIndex]);
        }
      }
    }

    const returnDF = new DataFrame();
    returnDF.headers = columnsSelected;
    returnDF.data = newData;

    return returnDF;
  }

  drop(cols) {
    const colsToKeep = [];

    for (var i = 0; i < this.headers.length; i++) {
      for (var e = 0; i < cols.length; e++) {
        if (this.headers[i] !== cols[e]) {
          colsToKeep.push(this.headers[0]);
        }
      }
    }

    return this.loc(colsToKeep);
  }

  trainTestSplit() {
    if (this.isTranspose === false) {
      this.transpose();
    }
    // shuffle dataset & index first 80% of elements for train or whatever threshold is wanted
  }
}

export { DataFrame };
/*
const data = new DataFrame();

data.read_csv('BreastCancer.csv');

console.log(data.headers);
console.log(data.data);

console.log(data.drop(['diagnosis']));
*/
