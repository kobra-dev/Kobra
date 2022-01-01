import type Comlink from "comlink";
import { mlFunctions } from "src/blocks/ML_block";
import type { RunError } from "./runner";
import type { getCSVFromCache } from "../utils/csvFetcher";
import type { getState, patchState, resetState } from "../components/DataView";

const comlink: typeof Comlink = require("comlink");

const importedBlocks: any[] = [
    require("./../blocks/DataFrame_block"),
    require("./../blocks/DataView_block"),
    require("./../blocks/misc_block")
];

function importedBlocksIterate(action: {
    (k: string, importedModule: any): void;
}) {
    importedBlocks.forEach((importedModule) => {
        Object.keys(importedModule)
            .filter((item) => !item.includes("_init_blocks"))
            .forEach((k) => {
                action(k, importedModule);
            });
    });
}

type RunResult = {
    error: Omit<RunError, "blockId"> | undefined;
    modelsDb: typeof globalThis.modelsDb;
    dataViewNewRun: typeof globalThis.dataViewNewRun;
    currentHighlightedBlock: typeof globalThis.currentHighlightedBlock;
};

export type Function = (...args: any[]) => any;
type AsyncFunction = (...args: any[]) => Promise<any>;
export type ProxiedFn<T extends Function> = Comlink.ProxyMarked &
    (T extends AsyncFunction
        ? T
        : (...args: Parameters<T>) => Promise<ReturnType<T>>);

export type RunnerConsole_unproxied = (text: string) => void;
export type RunnerConsoleGetInput_unproxied = () => Promise<string>;

declare global {
    var runnerConsole: ProxiedFn<RunnerConsole_unproxied>;
    var runnerConsoleGetInput: ProxiedFn<RunnerConsoleGetInput_unproxied>;
    var getCSVFromCache_proxied: ProxiedFn<typeof getCSVFromCache>;
    var dvGetState: ProxiedFn<typeof getState>;
    var dvPatchState: ProxiedFn<typeof patchState>;
    var dvResetState: ProxiedFn<typeof resetState>;
}

const RunnerWorker = {
    // This is NOT a sandbox, it is only used to provide all of the necessary functions (and as few possible non-necessary ones) to the evaled code
    async run(
        source: string,
        // This function can only accept clonable values or callbacks as parameters due to the limitations of Comlink
        blocklyHighlightBlock: ProxiedFn<(id: string | undefined) => void>,
        runnerConsole: typeof globalThis.runnerConsole,
        runnerConsoleGetInput: typeof globalThis.runnerConsoleGetInput,
        getCSVFromCache_proxied: typeof globalThis.getCSVFromCache_proxied,
        dataViewNewRun: typeof globalThis.dataViewNewRun,
        dvGetState: typeof globalThis.dvGetState,
        dvPatchState: typeof globalThis.dvPatchState,
        dvResetState: typeof globalThis.dvResetState
    ): Promise<RunResult> {
        globalThis.currentHighlightedBlock = undefined;
        async function highlightBlock(id: string | undefined) {
            await blocklyHighlightBlock(id);
            globalThis.currentHighlightedBlock = id;
        }
        // This function is only called by the evaled code
        async function highlightBlockWrapper(id: string, f: { (): any }) {
            const prevId = currentHighlightedBlock;
            await highlightBlock(id);
            const ret = await f();
            await highlightBlock(prevId);
            return ret;
        }
        // Worker globalThis is different from that of the main thread, even if something is global in the main thread it has to be made global in the worker
        const globals = {
            runnerConsole,
            runnerConsoleGetInput,
            getCSVFromCache_proxied,
            dataViewNewRun,
            dvGetState,
            dvPatchState,
            dvResetState,
            mlFunctions
        };
        Object.entries(globals).forEach(([k, v]) => {
            globalThis[k] = v;
        });
        // Add modules to global
        importedBlocksIterate((k, importedModule) => {
            globalThis[k] = importedModule[k];
        });
        globalThis["highlightBlock"] = highlightBlockWrapper;
        globalThis["modelsDb"] = [];

        let error: Omit<RunError, "blockId"> | undefined = undefined;

        try {
            // Get constructor of an async function and use it to eval the source
            // It is like doing Function(source)() but is async
            await Object.getPrototypeOf(async function () {}).constructor(
                source
            )();
        } catch (ex) {
            error = {
                exception: ex.toString()
            };
        } finally {
            const dataViewNewRun = globalThis["dataViewNewRun"];
            // Remove modules from global
            importedBlocksIterate((k) => {
                delete globalThis[k];
            });
            delete globalThis["highlightBlock"];
            Object.keys(globals).forEach((k) => {
                delete globalThis[k];
            });

            return {
                error,
                modelsDb: globalThis.modelsDb,
                dataViewNewRun,
                currentHighlightedBlock: globalThis.currentHighlightedBlock
            };
        }
    }
};

if (!globalThis.exposed) {
    comlink.expose(RunnerWorker);
    globalThis.exposed = true;
}
