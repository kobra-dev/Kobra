import Head from 'next/head';
import type { AppProps } from 'next/app';
import React from 'react';
import { DarkThemeProvider } from '../components/DarkThemeProvider';
import { Auth0Provider } from '@auth0/auth0-react';
import AppProviders from '../components/AppProviders';

export default function MyApp({ Component, pageProps }: AppProps) {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  if(domain === undefined || clientId === undefined) {
      throw new Error("REACT_APP_AUTH0_DOMAIN and/or REACT_APP_AUTH0_CLIENT_ID are/is undefined");
  }

  return (
    <>
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
      <DarkThemeProvider>
        <Auth0Provider
          domain={ domain }
          clientId={ clientId }
          redirectUri={ window.location.origin }
          audience={ process.env.REACT_APP_AUTH0_AUDIENCE }
        >
          {/* Other providers that depend on hooks from providers in this component */}
          <AppProviders>
            <Component {...pageProps} />
          </AppProviders>
        </Auth0Provider>
      </DarkThemeProvider>
    </>
  );
}
