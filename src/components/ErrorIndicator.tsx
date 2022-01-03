import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { highlightBlock } from "src/runner/runMain";
import { RunError } from "src/runner/shared";
import { ERROR_EVENT_NAME } from "../runner/checkForErrors";
import { Link, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        float: "right",
        zIndex: 100
    },
    inner: {
        position: "absolute",
        right: "1.5rem",
        width: "max-content",
        maxWidth: "25rem",
        zIndex: 1,
        opacity: 1,
        "&:hover": {
            opacity: 0.5
        },
        transition: "opacity 0.1s ease-in-out"
        //pointerEvents: "none"
        // Pointer events set to none doesn't work with the hover event
        // I tried so hard to get it to work but just couldn't
    },
    betaText: {
        marginTop: "0.4rem",
        display: "block",
        lineHeight: "1rem"
    }
}));

export default function ErrorIndicator() {
    const [error, setError] = useState<Error | undefined>(undefined);
    useEffect(() => {
        const handler = (e: { detail: RunError | undefined }) => {
            setError(e.detail?.exception);
            highlightBlock(e.detail?.blockId);
        };

        //@ts-expect-error
        document.addEventListener(ERROR_EVENT_NAME, handler);
        //@ts-expect-error
        return () => document.removeEventListener(ERROR_EVENT_NAME, handler);
    }, []);
    const styles = useStyles();

    return error ? (
        <div className={styles.root}>
            <Alert className={styles.inner} severity="error">
                <AlertTitle>{error["error"] ?? error.name}</AlertTitle>
                <div>{error["explanation"] ?? error.message}</div>
                <Typography className={styles.betaText} variant="caption">
                    Error checking is still in beta;{" "}
                    <Link href="https://github.com/kobra-dev/Kobra/issues/new/choose">
                        file an issue
                    </Link>{" "}
                    if something isn&apos;t working right
                </Typography>
            </Alert>
        </div>
    ) : null;
}
