import { LogReg } from './LogisticRegression'

export function logr_create(x : number[], y : number[]) : LogReg {
    let lr = new LogReg();
    lr.loadData(x, y);
    return lr;
}

export function logr_fit(lr : LogReg) : void {
    lr.fit();
}

export function logr_predict(lr : LogReg, x : number) : number[] {
    return lr.predict(x);
}