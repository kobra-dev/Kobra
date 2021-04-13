export class DataFrame {
    data: any[][] | undefined;
    headers: string[];
    isTranspose: boolean;

    constructor() {
        this.headers = [];
        this.data = [[]];
        this.isTranspose = false;
    }

    loadData(headers: string[], data: any[][]) {
        this.headers = headers;
        this.data = data;
    }

    read_csv(dataStr: string) {
        let data: any[] = dataStr.split("\n");

        const headers = data[0].split(",");

        const dataset = [];

        for (let elemIndex = 0; elemIndex < data.length; elemIndex++) {
            let element = data[elemIndex];
            element = String(element).split(",").map(Number);
            dataset.push(element);
        }

        this.headers = headers;
        this.data = dataset.slice(1, dataset.length);
        this.isTranspose = false;
    }

    transpose() {
        if (!this.isTranspose) {
            this.isTranspose = true;
        } else {
            this.isTranspose = false;
        }
        if (this.data !== undefined) {
            // @ts-ignore
            this.data = this.data[0].map((_, colIndex) =>
                // @ts-ignore
                this.data.map((row) => row[colIndex])
            );
        }
    }

    loc(columnsSelected: string[]) {
        if (!this.isTranspose) {
            this.transpose();
        }

        let newData = [];

        for (
            let headerIndex = 0;
            headerIndex < this.headers.length;
            headerIndex++
        ) {
            for (
                let columnIndex = 0;
                columnIndex < columnsSelected.length;
                columnIndex++
            ) {
                if (
                    String(this.headers[headerIndex]).trim() ===
                        String(columnsSelected[columnIndex]).trim() &&
                    this.data !== undefined
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

    drop(cols: string[]) {
        const colsToKeep = [];

        for (let i = 0; i < this.headers.length; i++) {
            for (let e = 0; i < cols.length; e++) {
                if (this.headers[i] !== cols[e]) {
                    colsToKeep.push(this.headers[0]);
                }
            }
        }

        return this.loc(colsToKeep);
    }

    trainTestSplit(splitRatio: number) {
        if (!this.isTranspose) {
            this.transpose();
        }

        console.log(splitRatio);
        // TODO: shuffle dataset & index first 80% of elements for train or whatever threshold is wanted
    }

    clone(): DataFrame {
        let df = new DataFrame();
        df.loadData(this.headers, this.data as any[][]);
        return df;
    }

    standardize() {}

    normalize() {}

    private standardize_arr(arr: any[]) {
        let mean = arr.
        let sd = this.calcSD(arr);

    }

    private normalize_arr(arr: any[]) {
        return arr;
    }

    // full credit to https://stackoverflow.com/a/53577159 for this method
    private calcSD(arr: any[]): number {
        const n = arr.length;
        const mean: number = arr.reduce((a, b) => a + b) / n;
        return Math.sqrt(
            arr.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
        );
    }


}

/*
const data = new DataFrame();

data.read_csv('BreastCancer.csv');

console.log(data.headers);
console.log(data.data);

console.log(data.drop(['diagnosis']));
*/
