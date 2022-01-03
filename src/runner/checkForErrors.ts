import { getCode } from "src/components/CodeEditor";
import { run } from "./runInWorker";

let currentlyChecking = false;
let shouldCheckAgain = false;

export const ERROR_EVENT_NAME = "kobra-errorupdate";

export default async function checkForErrors() {
    if (currentlyChecking) {
        shouldCheckAgain = true;
        return;
    }
    currentlyChecking = true;

    const res = await runCode();
    document.dispatchEvent(
        new CustomEvent(ERROR_EVENT_NAME, {
            detail: res.errors[0]
        })
    );

    currentlyChecking = false;
    if (shouldCheckAgain) {
        shouldCheckAgain = false;
        checkForErrors();
    }
}

async function runCode() {
    const code = getCode();
    return await run(code);
}
