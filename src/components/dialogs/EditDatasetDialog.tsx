import Spreadsheet, {
    dataToCSV,
    normalizeRows,
    parseCSV
} from "@kobra-dev/better-react-spreadsheet";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    Typography
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { getCSVFromCache } from "src/blocks/DataFrame_block";
import { getToken } from "src/utils/apolloClient";
import LoadingButton from "../LoadingButton";

function useDataset(name: string | undefined) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<string | undefined>();
    const [error, setError] = useState(false);
    useEffect(() => {
        const doEffect = async () => {
            setLoading(true);
            const csvData = await getCSVFromCache(name);
            setLoading(false);
            if (csvData) {
                setError(false);
                setData(csvData);
            } else {
                setError(true);
            }
        };
        if (name) {
            doEffect();
        } else {
            setData(undefined);
        }
    }, [name]);

    return {
        loading,
        data,
        error
    };
}

const useStyles = makeStyles(() => ({
    spreadsheet: {
        width: "600px",
        height: "300px"
    }
}));

export default function EditDatasetDialog(props: {
    name: string | undefined;
    setNameUndefined(): any;
}) {
    const styles = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { loading, data, error } = useDataset(props.name);
    const [spreadsheetData, setSpreadsheetData] =
        useState<string[][] | undefined>();
    const [parseError, setParseError] = useState(false);
    const spreadsheetContainerRef =
        useRef<HTMLDivElement>();
    useEffect(() => {
        if (data) {
            const parsed = parseCSV(data);
            setParseError(parsed.errors.length > 0);
            setSpreadsheetData(
                normalizeRows(parsed.data, 20, 20)
            );
        }
    }, [data]);
    const [updateLoading, setUpdateLoading] =
        useState(false);

    async function updateDataset() {
        setUpdateLoading(true);
        const contents = dataToCSV(spreadsheetData, true);
        const file = new File(
            contents.split("\n"),
            props.name
        );
        const fd = new FormData();
        fd.append("upload", file);
        const key = globalThis.dataSetsList.find(
            (ds) => ds.name === props.name
        ).key;
        const res = await fetch(
            process.env.NEXT_PUBLIC_DATASET_API + "/" + key,
            {
                method: "PUT",
                headers: {
                    Authorization: await getToken()
                },
                body: fd
            }
        );
        const resObj = await res.json();
        if (
            resObj.message !== "file updated successfully"
        ) {
            enqueueSnackbar(resObj.message, {
                variant: "error",
                preventDuplicate: true
            });
        } else {
            enqueueSnackbar("Dataset updated", {
                variant: "success",
                preventDuplicate: true
            });
            // Update cache
            globalThis.datasetCache[props.name] = contents;
        }
        setUpdateLoading(false);
    }

    function close() {
        props.setNameUndefined();
    }

    const showLoading =
        loading || (!spreadsheetData && !error);

    return (
        <Dialog
            open={Boolean(props.name)}
            maxWidth={false}
            TransitionProps={{
                onExited: () => {
                    spreadsheetContainerRef.current?.children[0].children[0].children[0].children[0].scrollTo(
                        0,
                        0
                    );
                    setSpreadsheetData(undefined);
                }
            }}
        >
            <DialogTitle>Edit dataset</DialogTitle>
            <DialogContent>
                {showLoading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography variant="body1">
                        We&apos;re sorry, there was an error
                        loading your dataset. Try closing
                        and re-opening the dataset editor or
                        refreshing the page.
                    </Typography>
                ) : (
                    <>
                        {parseError && (
                            <Typography variant="body1">
                                There was an issue with
                                parsing the CSV file, so the
                                displayed data may not work
                                as expected.
                            </Typography>
                        )}
                        <div ref={spreadsheetContainerRef}>
                            <Spreadsheet
                                className={
                                    styles.spreadsheet
                                }
                                data={spreadsheetData}
                                onChange={
                                    setSpreadsheetData
                                }
                            />
                        </div>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                {!showLoading && !error && (
                    <LoadingButton
                        loading={updateLoading}
                        disabled={updateLoading}
                        color="primary"
                        disableMargin
                        startIcon={<Save />}
                        onClick={updateDataset}
                    >
                        Save
                    </LoadingButton>
                )}
                <Button color="primary" onClick={close}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
