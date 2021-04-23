import { Typography } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import PageLayout from "../components/PageLayout";

export default function Index() {
    return (
        <>
            <Head>
                <title>Kobra Studio</title>
            </Head>
            <PageLayout>
                <Typography variant="h1" color="textPrimary">
                    This page isn't finished yet
                </Typography>
            </PageLayout>
        </>
    );
}
