import React, { useEffect, useMemo } from 'react';
import { useDarkTheme } from './DarkThemeProvider';
import { ThemeProvider } from '@material-ui/core';
import { ApolloClient, InMemoryCache, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import getMuiTheme from './getMuiTheme';
import { UserProvider } from '../utils/user';

interface AppProvidersProps {
  initialApolloState: any,
  user: any,
  loading: boolean,
  children: React.ReactNode
}

// https://www.apollographql.com/blog/building-a-next-js-app-with-apollo-client-slash-graphql/
let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(token: string | undefined) {
  let headers: Record<string, string> | undefined = undefined;
  if(token !== undefined) {
    headers = {
      authorization: token
    };
  }
  return new ApolloClient({
    ssrMode: typeof window === undefined,
    uri: process.env.NEXT_PUBLIC_GQL_URI,
    cache: new InMemoryCache(),
    headers: headers
  });
}

function initializeApollo(initialState: any = null, token: string) {
  const _apolloClient = apolloClient ?? createApolloClient(token);

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

function useApollo(initialState: any, token: string) {
  const store = useMemo(() => initializeApollo(initialState, token), [initialState, token]);
  return store;
}

export default function AppProviders(props: AppProvidersProps) {
  const { isDark } = useDarkTheme();
  const apolloClient = useApollo(props.initialApolloState, props.user?.token);

  useEffect(() => {
    if(globalThis.window !== undefined) {
      document.body.style.backgroundColor = isDark ? "#121212" : "#ffffff";
    }
  }, [isDark]);

  const theme = useMemo(
    () => getMuiTheme(isDark),
    [isDark]
  );

  return (
    <ThemeProvider theme={theme}>
      <UserProvider value={{user: props.user, loading: props.loading}}>
        <ApolloProvider client={apolloClient}>
          {props.children}
        </ApolloProvider>
      </UserProvider>
    </ThemeProvider>
  );
}