// Until I can figure out the correct type for MyApp I'll just disable checking
//@ts-nocheck

import Head from "next/head";
import type { AppProps } from "next/app";
import React, { createContext, useEffect } from "react";
import { DarkThemeProvider } from "../components/DarkThemeProvider";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@material-ui/core";
import { ApolloProvider } from "@apollo/client";
import { initializeApollo, useApollo } from "../utils/apolloClient";
import LoginDialogProvider from "../components/auth/LoginDialogProvider";
import { NextPage } from "next";
import {
    GetDataDocument,
    GetDataQuery,
    GetDataQueryVariables
} from "src/generated/queries-ctf";

export const cache = createCache({ key: "css" });

interface AppCustomProps {
    faviconUrl: string;
    navbarLogoUrl: string;
}

export const CtfDataCtx = createContext<Pick<AppCustomProps, "navbarLogoUrl">>({});

const MyApp = ({ Component, pageProps, faviconUrl, navbarLogoUrl }) => {
    const apolloClient = useApollo();

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
                <link rel="icon" href={faviconUrl} />
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
            <CtfDataCtx.Provider value={{navbarLogoUrl}}>
                <DarkThemeProvider>
                    <ApolloProvider client={apolloClient}>
                        <LoginDialogProvider>
                            <Component {...pageProps} />
                        </LoginDialogProvider>
                    </ApolloProvider>
                </DarkThemeProvider>
            </CtfDataCtx.Provider>
        </CacheProvider>
    );
};

MyApp.getInitialProps = async (ctx) => {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query<
        GetDataQuery,
        GetDataQueryVariables
    >({
        query: GetDataDocument,
        context: {
            clientName: "ctf"
        }
    });

    const faviconUrl = data.assetCollection?.items[0]?.url;
    const navbarLogoUrl = data.pageCollection?.items[0].navbar.logo.url;

    if (!faviconUrl || !navbarLogoUrl)
        throw new Error("Item from Contentful is undefined");

    return {
        faviconUrl,
        navbarLogoUrl
    };
};

export default MyApp;
