import { Console } from "react-console-component";

declare global {
    var runnerConsole : Console;
    // Somehow runnerConsole didn't cause an error without undefined but runnerConsoleGetInput did
    var runnerConsoleGetInput : { () : Promise<string> } | undefined;
}