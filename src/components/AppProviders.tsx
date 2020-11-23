import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useDarkTheme } from './DarkThemeProvider';
import { useAuth0 } from '@auth0/auth0-react';
import { Backdrop, CircularProgress, createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { ApolloClient, InMemoryCache, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { useAsyncMemo } from 'use-async-memo';
import getMuiTheme from './getMuiTheme';
import Loader from './Loader';

interface AppProvidersProps {
  initialApolloState: any,
  children: React.ReactNode
}

// https://www.apollographql.com/blog/building-a-next-js-app-with-apollo-client-slash-graphql/
let apolloClient: ApolloClient<NormalizedCacheObject>;

async function createApolloClient(tokenFactory: {(): Promise<string>}) {
  let headers: Record<string, string> | undefined = undefined;
  console.log("Getting access token");
  try {
    const token = await tokenFactory();
    headers = {
      authorization: token
    };
  }
  finally {
    return new ApolloClient({
      ssrMode: typeof window === undefined,
      uri: process.env.NEXT_PUBLIC_GQL_URI,
      cache: new InMemoryCache(),
      headers: headers
    });
  }
}

async function initializeApollo(initialState: any = null, tokenFactory: {(): Promise<string>}) {
  const _apolloClient = apolloClient ?? await createApolloClient(tokenFactory);

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

export default function AppProviders(props: AppProvidersProps) {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { isDark } = useDarkTheme();

  if(globalThis.window !== undefined) {
    document.body.style.backgroundColor = isDark ? "#121212" : "#ffffff";
  }

  const theme = useMemo(
    () => getMuiTheme(isDark),
    [isDark]
  );

  const client = useAsyncMemo(
    async () => await initializeApollo(props.initialApolloState, getAccessTokenSilently),
    [isAuthenticated]
  );

  return (
    <ThemeProvider theme={theme}>
      {(isLoading || client === undefined) ? <Loader /> : (
        <ApolloProvider client={client}>
          {props.children}
        </ApolloProvider>
      )}
    </ThemeProvider>
  );
}