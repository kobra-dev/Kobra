import type Comlink from "comlink";
import type { ProxiedFn, RunnerWorker } from "./worker";
import getCSVFromCache from "src/utils/csvFetcher";
import { Function, RunError } from "./shared";

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

export async function run(source: string): Promise<RunError | void> {
    globalThis.modelsDb = [];
    const res = await getWorker().run(source, comlink.proxy(getCSVFromCache));
    try {
        return res.error;
    } finally {
        currentHighlightedBlock = undefined;
    }
}
