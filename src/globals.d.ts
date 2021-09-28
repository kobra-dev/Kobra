import { UploadedDatasets } from "../components/FileUpload";
import { DataSet, ModelsDbEntry } from "./utils/types";

declare global {
    var runnerConsole: { (text: string): void };
    // Somehow runnerConsole didn't cause an error without undefined but runnerConsoleGetInput did
    var runnerConsoleGetInput: { (): Promise<string> } | undefined;

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
