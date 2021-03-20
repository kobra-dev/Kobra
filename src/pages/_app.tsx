import Head from "next/head";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { DarkThemeProvider } from "../components/DarkThemeProvider";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@material-ui/core";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../utils/apolloClient";
import LoginDialogProvider from "../components/auth/LoginDialogProvider";

export const cache = createCache({ key: "css" });

export default function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
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
                    <LoginDialogProvider>
                        <Component {...pageProps} />
                    </LoginDialogProvider>
                </ApolloProvider>
            </DarkThemeProvider>
        </CacheProvider>
    );
}
