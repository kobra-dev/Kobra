import { Typography, CircularProgress, makeStyles } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { useAutosaveStatus } from "../AutosaverProvider";

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

export default function AutosaveIndicator() {
    const styles = useStyles();
    const status = useAutosaveStatus();

    return (
        // Wrap it in a div so it still behaves as an inline block
        <div>
            <Typography variant="body2" className={styles.root}>
                {status.loading ? (
                    <CircularProgress
                        className={styles.indicator}
                        size="1.5rem"
                        color="inherit"
                    />
                ) : (
                    <Check className={styles.indicator} />
                )}
                Last saved at {dateToString(status.lastSaveTime)}
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
