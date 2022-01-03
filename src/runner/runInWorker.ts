import type Comlink from "comlink";
import type { ProxiedFn, RunnerWorker, RunResult } from "./worker";
import getCSVFromCache from "src/utils/csvFetcher";
import { Function } from "./shared";

// Something's wrong with the Comlink package
const comlink: typeof Comlink = require("comlink");

let worker: Comlink.Remote<typeof RunnerWorker> | undefined;

function getWorker() {
    // We can only access import.meta inside a module
    return (
        worker ??
        (worker = comlink.wrap<typeof RunnerWorker>(
            new Worker(new URL("./worker.ts", import.meta.url))
        ))
    );
}

// Fix the types of comlink.proxy
declare module "comlink" {
    function proxy<T extends Function>(f: T): ProxiedFn<T>;
}

export async function run(source: string): Promise<RunResult> {
    globalThis.modelsDb = [];
    try {
        return await getWorker().run(source, comlink.proxy(getCSVFromCache));
    } finally {
        currentHighlightedBlock = undefined;
    }
}
