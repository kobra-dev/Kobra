// Another wrapper for the editor page to wait until accounts have been loaded
import { Typography } from "@material-ui/core";
import React from "react";
import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import Editor from "./Editor";
import Loader from "./Loader";
import firebase from "../utils/firebase";
import AutosaverProvider from "src/AutosaverProvider";

export default function EditorAccountLoaderWrapper() {
    const [, loading] = useAuthState(firebase.auth());

    return loading ? (
        <Loader>
            <Typography color="textSecondary">
                Getting account data...
            </Typography>
        </Loader>
    ) : (
        <AutosaverProvider
            saveFn={(data) => {
                console.log(`Batch sent: ${data}`);
            }}
        >
            <Editor />
        </AutosaverProvider>
    );
}
