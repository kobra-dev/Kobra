import Blockly from 'blockly/core';

const importedBlocks : any[] = [
    require('./../blocks/DataFrame_block'),
    require('./../blocks/LinearRegression_block'),
    require('./../blocks/LogisticRegression_block'),
    require('./../blocks/KNN_block')
];

function importedBlocksIterate(action : {(k : string, importedModule : any) : void}) {
    importedBlocks.forEach(importedModule => {
        Object.keys(importedModule).filter(item => !item.includes('_init_blocks')).forEach(k => {
            action(k, importedModule);
        });
    });
}

// This function is only called by the evaled code
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function highlightBlock(id : string) {
    // @ts-ignore
    Blockly.getMainWorkspace().highlightBlock(id);
}

// This is NOT a sandbox, it is only used to provide all of the necessary functions (and as few possible non-necessary ones) to the evaled code
export function runInContext(source : string) : string[] {
    try {
        // Add modules to global
        importedBlocksIterate((k, importedModule) => {
            // @ts-ignore
            globalThis[k] = importedModule[k];
        });
        // eslint-disable-next-line no-eval
        eval(source);
    }
    catch(ex) {
        return [ex.toString().replace(ex.message, ""), ex.message];
    }
    finally {
        // Remove modules from global
        importedBlocksIterate(k => {
            // @ts-ignore
            delete globalThis[k];
        });
    }

    return [""];
}