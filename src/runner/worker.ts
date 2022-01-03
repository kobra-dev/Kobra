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
    RunError,
    serializeError
} from "./shared";

const comlink: typeof Comlink = require("comlink");

const importedBlocks: any[] = [
    require("./../blocks/DataFrame_block"),
    require("./../blocks/mock/DataView_block"),
    require("./../blocks/mock/misc_block")
];

export type ProxiedFn<T extends Function> = Comlink.ProxyMarked &
    (T extends AsyncFunction
        ? T
        : (...args: Parameters<T>) => Promise<ReturnType<T>>);

declare global {
    var IS_WORKER: boolean;

    var worker_getCSVFromCache: ProxiedFn<typeof getCSVFromCache>;
    var worker_currentlyRunningBlock: string | undefined;
    var worker_comlinkExposed: boolean;
    var MOCK_ML_MODELS: boolean;
}

globalThis.IS_WORKER = true;
globalThis.MOCK_ML_MODELS = true;

// This function is only called by the evaled code
const highlightBlockInner = makeHighlightBlock((id) => {
    globalThis.worker_currentlyRunningBlock = id;
}, "worker_currentlyRunningBlock");

export type RunResult = {
    errors: RunError[];
};

export const RunnerWorker = {
    // This is NOT a sandbox, it is only used to provide all of the necessary functions (and as few possible non-necessary ones) to the evaled code
    async run(
        source: string,
        // This function can only accept clonable values or callbacks as parameters due to the limitations of Comlink
        worker_getCSVFromCache: typeof globalThis.worker_getCSVFromCache
    ): Promise<RunResult> {
        globalThis.worker_currentlyRunningBlock = undefined;

        const collectedErrors: RunResult["errors"] = [];
        const highlightBlock = (id: string, f: Function) =>
            highlightBlockInner(id, async () => {
                try {
                    return await f();
                } catch (error) {
                    collectedErrors.push({
                        exception: serializeError(error),
                        blockId: globalThis.worker_currentlyRunningBlock
                    });
                }
            });

        // Worker globalThis is different from that of the main thread, even if something is global in the main thread it has to be made global in the worker
        const globals = {
            worker_getCSVFromCache,
            mlFunctions,
            highlightBlock
        };
        addGlobals(globals);
        addImportedBlocks(importedBlocks);
        globalThis.modelsDb = [];

        // Shouldn't throw because highlightBlock wraps everything in try catch
        await makeAsyncFn(source)();

        removeImportedBlocks(importedBlocks);
        removeGlobals(globals);

        return {
            errors: collectedErrors
        };
    }
};

if (!globalThis.worker_comlinkExposed) {
    comlink.expose(RunnerWorker);
    globalThis.worker_comlinkExposed = true;
}
