import { Console } from "react-console-component";
import { UploadedDatasets } from "../components/FileUpload";

declare global {
    var runnerConsole: Console;
    // Somehow runnerConsole didn't cause an error without undefined but runnerConsoleGetInput did
    var runnerConsoleGetInput: { (): Promise<string> } | undefined;

    var dataViewNewRun: boolean = false;

    var uploadedDatasets: UploadedDatasets;

    var blocklyToolboxRevealCollapsed: boolean;
}

declare module "*.svg" {
    const content: string;
    export default content;
}
