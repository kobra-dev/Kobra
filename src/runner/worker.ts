import type Comlink from "comlink";
import { mlFunctions } from "src/blocks/ML_block";
import type getCSVFromCache from "../utils/csvFetcher";
import {
    addGlobals,
    addImportedBlocks,
    AsyncFunction,
    Function,
    makeAsyncFn,
    makeHighlightBlock,
    removeGlobals,
    removeImportedBlocks,
    RunError
} from "./shared";

const comlink: typeof Comlink = require("comlink");

const importedBlocks: any[] = [
    require("./../blocks/mock/DataFrame_block"),
    require("./../blocks/mock/DataView_block"),
    require("./../blocks/misc_block")
];

type RunResult = {
    error: RunError | undefined;
};

export type ProxiedFn<T extends Function> = Comlink.ProxyMarked &
    (T extends AsyncFunction
        ? T
        : (...args: Parameters<T>) => Promise<ReturnType<T>>);

declare global {
    var IS_WORKER: boolean;

    var worker_getCSVFromCache: ProxiedFn<typeof getCSVFromCache>;
    var worker_currentlyRunningBlock: string | undefined;
    var worker_comlinkExposed: boolean;
}

globalThis.IS_WORKER = true;

// This function is only called by the evaled code
const highlightBlock = makeHighlightBlock((id) => {
    globalThis.worker_currentlyRunningBlock = id;
}, "worker_currentlyRunningBlock");

export const RunnerWorker = {
    // This is NOT a sandbox, it is only used to provide all of the necessary functions (and as few possible non-necessary ones) to the evaled code
    async run(
        source: string,
        // This function can only accept clonable values or callbacks as parameters due to the limitations of Comlink
        getCSVFromCache_proxied: typeof globalThis.worker_getCSVFromCache
    ): Promise<RunResult> {
        globalThis.worker_currentlyRunningBlock = undefined;

        // Worker globalThis is different from that of the main thread, even if something is global in the main thread it has to be made global in the worker
        const globals = {
            getCSVFromCache_proxied,
            mlFunctions,
            highlightBlock
        };
        addGlobals(globals);
        addImportedBlocks(importedBlocks);
        globalThis.modelsDb = [];

        let error: RunError | undefined = undefined;

        try {
            await makeAsyncFn(source)();
        } catch (ex) {
            error = {
                exception: ex.toString(),
                blockId: globalThis.worker_currentlyRunningBlock!
            };
        } finally {
            removeImportedBlocks(importedBlocks);
            removeGlobals(globals);

            return {
                error
            };
        }
    }
};

if (!globalThis.worker_comlinkExposed) {
    comlink.expose(RunnerWorker);
    globalThis.worker_comlinkExposed = true;
}
