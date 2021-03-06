/** Declaration file generated by dts-gen */

declare module 'ml-svm';

declare class SVM {
    constructor(options: any);

    margin(features: any): any;

    marginOne(features: any, noWhitening: any): any;

    predict(features: any): any;

    predictOne(p: any): any;

    supportVectors(): any;

    toJSON(): any;

    train(features: any, labels: any): void;

    static load(model: any): any;

}

