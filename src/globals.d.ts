import { UploadedDatasets } from "../components/FileUpload";
import { DataSet } from "./utils/types";

declare global {
    var runnerConsole: { (text: string): void };
    // Somehow runnerConsole didn't cause an error without undefined but runnerConsoleGetInput did
    var runnerConsoleGetInput: { (): Promise<string> } | undefined;

    var dataViewNewRun: boolean = false;

    var datasetCache: UploadedDatasets;

    var dataSetsList: DataSet[];

    var blocklyToolboxRevealCollapsed: boolean;
}

declare module "*.svg" {
    const content: string;
    export default content;
}
