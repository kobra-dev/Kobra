import Blockly from "blockly/core";
import {
    addImportedBlocks,
    addGlobals,
    RunError,
    makeAsyncFn,
    removeImportedBlocks,
    removeGlobals,
    makeHighlightBlock
} from "./shared";
import { mlFunctions } from "src/blocks/ML_block";

const importedBlocks: any[] = [
    require("./../blocks/DataFrame_block"),
    require("./../blocks/DataView_block"),
    require("./../blocks/misc_block")
];
globalThis.currentHighlightedBlock = undefined;

export function highlightBlock(id: string | undefined) {
    // @ts-ignore
    Blockly.getMainWorkspace().highlightBlock(id);
    currentHighlightedBlock = id;
}

const highlightBlockRunner = makeHighlightBlock(
    highlightBlock,
    "currentHighlightedBlock"
);

export async function run(
    source: string,
    consoleGlobals: {
        runnerConsole: typeof globalThis.runnerConsole;
        runnerConsoleGetInput: typeof globalThis.runnerConsoleGetInput;
    }
): Promise<RunError | void> {
    const globals = {
        ...consoleGlobals,
        mlFunctions,
        highlightBlock: highlightBlockRunner
    };
    addGlobals(globals);
    addImportedBlocks(importedBlocks);
    globalThis.modelsDb = [];

    try {
        await makeAsyncFn(source)();
    } catch (ex) {
        return {
            exception: ex.toString(),
            blockId: currentHighlightedBlock!
        };
    } finally {
        removeImportedBlocks(importedBlocks);
        removeGlobals(globals);

        globalThis.currentHighlightedBlock = undefined;
    }
}
