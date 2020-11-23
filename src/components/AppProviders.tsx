import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useDarkTheme } from './DarkThemeProvider';
import { useAuth0 } from '@auth0/auth0-react';
import { Backdrop, CircularProgress, createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useAsyncMemo } from 'use-async-memo';
import getMuiTheme from './getMuiTheme';
import Loader from './Loader';

interface AppProvidersProps {
  children: React.ReactNode
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
    async () => {
      let headers: Record<string, string> | undefined = undefined;
      console.log("Getting access token");
      try {
        const token = await getAccessTokenSilently();
        console.log(token);
        headers = {
          authorization: token
        };
      }
      finally {
        return new ApolloClient({
          uri: process.env.NEXT_PUBLIC_GQL_URI,
          cache: new InMemoryCache(),
          headers: headers
        });
      }
    },
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