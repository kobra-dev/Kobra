import Papa from "papaparse";
import { KobraError } from "./blockUtils";

function parseNumberWithFallback(n: string) {
    const parsed = Number(n);
    return isNaN(parsed) ? n : parsed;
}

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
        let parsedData = Papa.parse<string[]>(dataStr).data;

        const headers = parsedData[0];

        const dataset = parsedData
            .slice(1, parsedData.length)
            .map((row) => row.map((cell) => parseNumberWithFallback(cell)));

        this.headers = headers;
        this.data = dataset;
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

        const indexes = columnsSelected.map((col) => this.headers.indexOf(col));
        indexes.forEach((colIndex, inputIndex) => {
            if (colIndex === -1) {
                throw new KobraError(
                    `Column ${columnsSelected[inputIndex]} doesn't exist in the DataFrame`,
                    "Try looking at what columns the dataset has in the Datasets tab"
                );
            }
        });
        const returnDF = new DataFrame();
        returnDF.headers = columnsSelected;
        returnDF.data = indexes.map((index) => this.data[index]);

        return returnDF;

        // let newData = [];

        // for (
        //     let headerIndex = 0;
        //     headerIndex < this.headers.length;
        //     headerIndex++
        // ) {
        //     for (
        //         let columnIndex = 0;
        //         columnIndex < columnsSelected.length;
        //         columnIndex++
        //     ) {
        //         if (
        //             String(this.headers[headerIndex]).trim() ===
        //                 String(columnsSelected[columnIndex]).trim() &&
        //             this.data !== undefined
        //         ) {
        //             newData.push(this.data[headerIndex]);
        //         }
        //     }
        // }

        // const returnDF = new DataFrame();
        // returnDF.headers = columnsSelected;
        // returnDF.data = newData;

        // return returnDF;
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

    standardize(arrs: string[]) {
        this.transpose();
        for (let i = 0; i < this.headers.length; i++) {
            for (let j = 0; j < arrs.length; j++) {
                if (this.headers[i] === arrs[j]) {
                    if (!(this.data === undefined)) {
                        this.data[i] = this.standardizeArr(this.data[i]);
                        console.log(this.data[i]);
                    }
                }
            }
        }
        this.transpose();
    }

    normalize() {}

    private standardizeArr(arr: any[]) {
        let mean = this.calcMean(arr);
        let sd = this.calcSD(arr);

        for (let i = 0; i < arr.length; i++) {
            arr[i] = (arr[i] - mean) / sd;
        }

        return arr;
    }

    private normalizeArr(arr: any[]) {
        return arr;
    }

    // credit to https://jrsinclair.com/articles/2019/five-ways-to-average-with-js-reduce/
    private calcMean(arr: any[]): number {
        return arr.reduce((a, b) => a + b) / arr.length;
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
