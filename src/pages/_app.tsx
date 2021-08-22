import { ApolloProvider } from "@apollo/client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@material-ui/core";
import type { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";
import { SnackbarProvider } from "notistack";
import React, { useEffect, useState } from "react";
import Loader from "src/components/Loader";
import LoginDialogProvider from "../components/auth/LoginDialogProvider";
import { DarkThemeProvider } from "../components/DarkThemeProvider";
import { useApollo } from "../utils/apolloClient";

export const cache = createCache({ key: "css" });

export default function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // https://stackoverflow.com/a/59117532
    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    });

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <CacheProvider value={cache}>
            <CssBaseline />
            <DarkThemeProvider>
                <ApolloProvider client={apolloClient}>
                    <SnackbarProvider maxSnack={3}>
                        <LoginDialogProvider>
                            {loading ? (
                                <Loader />
                            ) : (
                                <Component {...pageProps} />
                            )}
                        </LoginDialogProvider>
                    </SnackbarProvider>
                </ApolloProvider>
            </DarkThemeProvider>
        </CacheProvider>
    );
}
