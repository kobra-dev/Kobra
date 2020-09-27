import Blockly from 'blockly/core';

const importedBlocks: any[] = [
	require('./../blocks/DataFrame_block'),
	require('./../blocks/LinearRegression_block'),
	require('./../blocks/LogisticRegression_block'),
	require('./../blocks/KNN_block'),
	require('./../blocks/RFClassifier_block'),
	require('./../blocks/misc_block')
];

function importedBlocksIterate(action: {
	(k: string, importedModule: any): void;
}) {
	importedBlocks.forEach((importedModule) => {
		Object.keys(importedModule)
			.filter((item) => !item.includes('_init_blocks'))
			.forEach((k) => {
				action(k, importedModule);
			});
	});
}

let currentHighlightedBlock: string | undefined = undefined;

// This function is only called by the evaled code
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function highlightBlock(id: string) {
	// @ts-ignore
	Blockly.getMainWorkspace().highlightBlock(id);
	currentHighlightedBlock = id;
}

export interface RunResult {
	exception: string;
	blockId: string;
}

// This is NOT a sandbox, it is only used to provide all of the necessary functions (and as few possible non-necessary ones) to the evaled code
export async function runInContext(
	source: string
): Promise<RunResult | undefined> {
	try {
		// Add modules to global
		importedBlocksIterate((k, importedModule) => {
			// @ts-ignore
			globalThis[k] = importedModule[k];
		});
		// @ts-ignore
		globalThis['highlightBlock'] = highlightBlock;

		// Get constructor of an async function and use it to eval the source
		// It is like doing Function(source)() but is async
		await Object.getPrototypeOf(async function () {}).constructor(source)();
	} catch (ex) {
		return {
			exception: ex.toString(),
			blockId: currentHighlightedBlock as string
		};
	} finally {
		// Remove modules from global
		importedBlocksIterate((k) => {
			// @ts-ignore
			delete globalThis[k];
		});
		// @ts-ignore
		delete globalThis['highlightBlock'];
	}

	currentHighlightedBlock = undefined;
	return undefined;
}
