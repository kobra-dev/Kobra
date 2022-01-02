import { getToken } from "./apolloClient";

async function getDataSetWithKey(key: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DATASET_API}/${key}`,
        {
            headers: {
                Authorization: await getToken()
            }
        }
    );
    return await response.text();
}

export default async function getCSVFromCache(
    name: string
): Promise<string | undefined> {
    // Check if the dataframe exists
    const dsListItem = globalThis.dataSetsList.find((ds) => ds.name === name);
    if (dsListItem) {
        // Try getting from cache
        const dsCache = globalThis.datasetCache[name];
        if (dsCache) return dsCache;
        // Get from API
        const fetchedData = await getDataSetWithKey(dsListItem.key);
        // Add to cache
        globalThis.datasetCache[name] = fetchedData;
        return fetchedData;
    } else {
        return undefined;
    }
}
