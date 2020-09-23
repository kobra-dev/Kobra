import { Console } from "react-console-component";

declare global {
    var runnerConsole : Console;
    var runnerConsoleGetInput : { () : Promise<string> };
}