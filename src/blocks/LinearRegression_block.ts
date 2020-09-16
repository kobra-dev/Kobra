import { LinReg } from './LinearRegression'

export function linr_create(x : number[], y : number[]) : LinReg {
    let lr = new LinReg();
    lr.loadData(x, y);
    return lr;
}

export function linr_fit(lr : LinReg) : void {
    lr.fit();
}

export function linr_predict(lr : LinReg, x : number) : number {
    return lr.predict(x);
}