// https://github.com/mui-org/material-ui/blob/next/examples/nextjs/pages/_document.js

import createEmotionServer from "@emotion/server/create-instance";
import { ServerStyleSheets } from "@material-ui/core/styles";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import {
    DARK_BACKGROUND_COLOR,
    LIGHT_BACKGROUND_COLOR
} from "src/components/DarkThemeProvider";
import getMuiTheme from "../components/getMuiTheme";
import { cache } from "./_app";

const { extractCritical } = createEmotionServer(cache);

export default class MyDocument extends Document {
    render() {
        // @ts-ignore
        const theme = getMuiTheme(this.props.isDarkTheme);

        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <meta
                        name="theme-color"
                        content={theme.palette.primary.main}
                    />

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
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
        });

    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);

    // TODO: find a way to detect if it's being rendered by ISG or SSR
    // If it's ISG the page uses the theme preference of the first user to request the page then serves that to everyone regardless of preference
    // For now it will just ignore the cookie
    //const isDarkTheme = cookies(ctx).isDarkTheme ?? false;
    const isDarkTheme = false;

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            ...React.Children.toArray(initialProps.styles),
            sheets.getStyleElement(),
            <style
                key="emotion-style-tag"
                data-emotion-css={styles.ids.join(" ")}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: styles.css }}
            />,
            <style
                key="theme-bgcolor"
                id="theme-bgcolor"
                dangerouslySetInnerHTML={{
                    __html: `body {
    background-color: ${
        isDarkTheme ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR
    } !important;
}`
                }}
            />
        ],
        isDarkTheme
    };
};
