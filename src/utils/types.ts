export type DataSet = {
    name: string;
    key: string;
};

export type ModelsDbEntry = {
    type: string;
    blockId: string;
    modelJson: string;
    modelParamsJson: string;
    model?: any;
};
