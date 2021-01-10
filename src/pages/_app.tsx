import Head from 'next/head';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { DarkThemeProvider } from '../components/DarkThemeProvider';
import AppProviders from '../components/AppProviders';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@material-ui/core';
import { useFetchUser } from '../utils/user';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../utils/apolloClient';

export const cache = createCache({ key: 'css' });

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const { user, loading } = useFetchUser();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <CssBaseline />
      <DarkThemeProvider>
        <ApolloProvider client={apolloClient}>
          {/* Other providers that depend on hooks from providers in this component */}
          <AppProviders user={user} loading={loading}>
            <Component {...pageProps} />
          </AppProviders>
        </ApolloProvider>
      </DarkThemeProvider>
    </CacheProvider>
  );
}
