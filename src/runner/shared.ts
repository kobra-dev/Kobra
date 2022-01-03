function importedBlocksIterate(
    importedBlocks: any[],
    action: {
        (k: string, importedModule: any): void;
    }
) {
    importedBlocks.forEach((importedModule) => {
        Object.keys(importedModule)
            .filter((item) => !item.includes("_init_blocks"))
            .forEach((k) => {
                action(k, importedModule);
            });
    });
}

export const addImportedBlocks = (importedBlocks: any[]) =>
    importedBlocksIterate(importedBlocks, (k, importedModule) => {
        globalThis[k] = importedModule[k];
    });

export const removeImportedBlocks = (importedBlocks: any[]) =>
    importedBlocksIterate(importedBlocks, (k) => {
        delete globalThis[k];
    });

export interface RunError {
    exception: Error;
    blockId: string;
}

export type Function = (...args: any[]) => any;
export type AsyncFunction = (...args: any[]) => Promise<any>;

// Get constructor of an async function and use it to eval the source
// It is like doing Function(source) but is async
export const makeAsyncFn: (source: string) => AsyncFunction =
    Object.getPrototypeOf(async function () {}).constructor;

export const makeHighlightBlock = (
    highlighter: (id: string | undefined) => void,
    globalThisIdKey: string
) =>
    async function (id: string, f: Function) {
        const prevId = globalThis[globalThisIdKey];
        highlighter(id);
        const ret = await f();
        highlighter(prevId);
        return ret;
    };

export const addGlobals = (globals: Record<string, any>) =>
    Object.entries(globals).forEach(([k, v]) => {
        globalThis[k] = v;
    });

export const removeGlobals = (globals: Record<string, any>) =>
    Object.keys(globals).forEach((k) => {
        delete globalThis[k];
    });

export const serializeError = <T extends Error>(error: T) =>
    Object.fromEntries(
        Array.from(
            new Set([
                ...Object.getOwnPropertyNames(Object.getPrototypeOf(error)),
                ...Object.getOwnPropertyNames(error)
            ])
        )
            .filter((k) => typeof error[k] !== "function")
            .map((k) => [k, error[k]])
    ) as T;
