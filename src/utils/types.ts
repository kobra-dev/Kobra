export type DataSet = {
    name: string;
    key: string;
};

export type ModelsDbEntry = {
    type: string;
    blockId: string;
    // TODO: better typings for modelJson from kobra.js
    modelJson: object;
    modelParamsJson: string;
    model?: any;
};
