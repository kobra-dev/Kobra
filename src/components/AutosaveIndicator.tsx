import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import {
    Typography,
    CircularProgress,
    makeStyles
} from "@material-ui/core";
import { Adjust, Check } from "@material-ui/icons";
import { useAutosaveStatus } from "./AutosaverProvider";
import firebase from "../utils/firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center"
    },
    indicator: {
        height: "1.5rem",
        marginRight: theme.spacing(1)
    }
}));

export default function AutosaveIndicator(props: {
    className?: string;
}) {
    const styles = useStyles();
    const status = useAutosaveStatus();
    const [user] = useAuthState(firebase.auth());

    return !status.haveAttemptedToSave ? null : (
        // Wrap it in a div so it still behaves as an inline block
        <div className={props.className}>
            <Typography
                variant="body2"
                className={styles.root}
            >
                {status.loading && user?.uid ? (
                    <CircularProgress
                        className={styles.indicator}
                        size="1.5rem"
                        color="inherit"
                    />
                ) : !status.lastSaveTime ? (
                    // Unsaved icon
                    <Adjust className={styles.indicator} />
                ) : (
                    <Check className={styles.indicator} />
                )}
                {
                    // The user made changes but they haven't been saved
                    status.haveAttemptedToSave &&
                    !status.lastSaveTime
                        ? !status.loading || !user?.uid
                            ? `Unsaved${
                                  !user?.uid
                                      ? " - sign in to save"
                                      : ""
                              }`
                            : ""
                        : `Last saved at ${dateToString(
                              status.lastSaveTime
                          )}`
                }
            </Typography>
        </div>
    );
}

// A function to convert a date to a string in the format "HH:MM:SS", adding a 0 if necessary
function dateToString(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
}
