import type Comlink from "comlink";
import Blockly from "blockly/core";
import type {
    Function,
    ProxiedFn,
    RunnerConsoleGetInput_unproxied,
    RunnerConsole_unproxied,
    RunnerWorker
} from "./worker";
import { getCSVFromCache } from "src/utils/csvFetcher";
import { getState, patchState, resetState } from "src/components/DataView";

// Something's wrong with the Comlink package
const comlink: typeof Comlink = require("comlink");

let worker: Comlink.Remote<RunnerWorker> | undefined;

function getWorker() {
    // We can only access import.meta inside a module
    return (
        worker ??
        (worker = comlink.wrap<RunnerWorker>(
            new Worker(new URL("./worker.ts", import.meta.url))
        ))
    );
}

globalThis.currentHighlightedBlock = undefined;

export function highlightBlock(id: string | undefined) {
    // @ts-ignore
    Blockly.getMainWorkspace().highlightBlock(id);
    currentHighlightedBlock = id;
}

export interface RunError {
    exception: string;
    blockId: string;
}

export type RunnerGlobalsInput = {
    runnerConsole: RunnerConsole_unproxied;
    runnerConsoleGetInput: RunnerConsoleGetInput_unproxied;
};

// Fix the types of comlink.proxy
declare module "comlink" {
    function proxy<T extends Function>(f: T): ProxiedFn<T>;
}

export async function run(
    source: string,
    globals: RunnerGlobalsInput
): Promise<RunError | undefined> {
    globalThis.modelsDb = [];
    const res = await getWorker().run(
        source,
        //@ts-ignore
        comlink.proxy((id: string | undefined) =>
            Blockly.getMainWorkspace().highlightBlock(id)
        ),
        comlink.proxy(globals.runnerConsole),
        comlink.proxy(globals.runnerConsoleGetInput),
        comlink.proxy(getCSVFromCache),
        globalThis.dataViewNewRun,
        comlink.proxy(getState),
        comlink.proxy(patchState),
        comlink.proxy(resetState)
    );
    try {
        globalThis.modelsDb = res.modelsDb;
        globalThis.dataViewNewRun = res.dataViewNewRun;
        globalThis.currentHighlightedBlock = res.currentHighlightedBlock;
        return (
            res.error && {
                ...res.error,
                blockId: currentHighlightedBlock as string
            }
        );
    } finally {
        currentHighlightedBlock = undefined;
    }
}
