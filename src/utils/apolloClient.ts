import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { useMemo } from "react";
import { fetchToken } from "./user";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GQL_URI
});

const authLink = setContext(async (_, { headers }) => {
    const token = await fetchToken();
    if(token === undefined) return {};

    return {
        headers: {
            ...headers,
            authorization: token
        }
    }
});

const createApolloClient = () => new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export function initializeApollo(initialState: any = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client,
    // the initial state gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Restore the cache using the data passed from
        // getStaticProps/getServerSideProps combined with the existing cached data
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

export function useApollo(initialState: any) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}