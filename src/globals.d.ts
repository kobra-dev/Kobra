import { UploadedDatasets } from "../components/FileUpload";
import { DataSet, ModelsDbEntry } from "./utils/types";

declare global {
    var dataViewNewRun: boolean = false;

    var datasetCache: UploadedDatasets;

    var dataSetsList: DataSet[];

    var blocklyToolboxRevealCollapsed: boolean;

    // Global models DB so that we can track what models are available to deploy
    var modelsDb: ModelsDbEntry[];

    var currentHighlightedBlock: string | undefined;
}

declare module "*.svg" {
    const content: string;
    export default content;
}
