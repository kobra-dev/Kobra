import Head from 'next/head';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { DarkThemeProvider } from '../components/DarkThemeProvider';
import { Auth0Provider } from '@auth0/auth0-react';
import AppProviders from '../components/AppProviders';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@material-ui/core';

export const cache = createCache({ key: 'css' });

export default function MyApp({ Component, pageProps }: AppProps) {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

  if(domain === undefined || clientId === undefined) {
      throw new Error("NEXT_PUBLIC_AUTH0_DOMAIN and/or NEXT_PUBLIC_AUTH0_CLIENT_ID are/is undefined");
  }

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
        { /* On server globalThis is defined but window isn't */}
        <Auth0Provider
          domain={ domain }
          clientId={ clientId }
          redirectUri={ globalThis.window?.location.origin ?? undefined }
          audience={ process.env.NEXT_PUBLIC_AUTH0_AUDIENCE }
        >
          {/* Other providers that depend on hooks from providers in this component */}
          <AppProviders initialApolloState={pageProps.initialApolloState}>
            <Component {...pageProps} />
          </AppProviders>
        </Auth0Provider>
      </DarkThemeProvider>
    </CacheProvider>
  );
}
