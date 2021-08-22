import {
    Typography,
    CircularProgress,
    Button,
    makeStyles
} from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useAutosaveStatus, useSave } from "../AutosaverProvider";

// Batch changes to reduce the number of network requests
/*const BATCH_DURATION = 1000;
let batchStart = 0;
let latestData = "";

export function queueChanges(data: string) {
    latestData = data;
    if(new Date().getTime() > batchStart + BATCH_DURATION) {
        // Make a new batch
        batchStart = new Date().getTime();
        setTimeout(() => {
            // Save
            // TODO: handle fork
            // Also will it capture the variable by value or reference?
        }, BATCH_DURATION);
    }
}*/

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
    const save = useSave();
    const status = useAutosaveStatus();

    useEffect(() => console.log(status), [status]);

    const [counter, setCounter] = useState(0);

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
                Last saved at {status.lastSaveTime.getHours()}:
                {status.lastSaveTime.getMinutes()}:
                {status.lastSaveTime.getSeconds()}
                <Button
                    onClick={() => {
                        console.log(counter);
                        save(counter.toString());
                        setCounter(counter + 1);
                    }}
                >
                    DEBUG: Save
                </Button>
            </Typography>
        </div>
    );
}
