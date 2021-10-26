import React, { useContext } from "react";
import Dropzone from "react-dropzone";
import { Typography, Snackbar, makeStyles } from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";
import Blockly from "blockly/core";
import { getToken } from "../utils/apolloClient";
import { useSnackbar } from "notistack";
import { useAddDataSetMutation } from "../generated/queries";
import { DatasetsContext } from "./TopView";
import { DataSet } from "src/utils/types";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    dropMessage: {
        padding: "2vh",
        textAlign: "center",
        cursor: "pointer",
        flex: 1
    },
    dsCardContainer: {
        overflowY: "auto"
    },
    dsCard: {
        display: "flex",
        "& > *:first-child": {
            flex: 1
        },
        alignItems: "center",
        padding: "0.5rem !important"
    }
}));

export type UploadedDatasets = {
    [key: string]: string;
};

if (!globalThis.datasetCache) {
    globalThis.datasetCache = [];
}

export default function FileUpload() {
    const { enqueueSnackbar } = useSnackbar();
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [datasets, setDatasets] = useContext(DatasetsContext);

    const styles = useStyles();

    const [gqlAddDataSet] = useAddDataSetMutation();

    const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") return;

        setErrorOpen(false);
    };

    const checkIfFileExists = (name: string) =>
        datasets.find((item) => item.name === name) !== undefined;

    async function fileDropped(acceptedFiles: File[]) {
        if (acceptedFiles.length === 0 || acceptedFiles.length > 1) {
            enqueueSnackbar("Upload only one csv file!", {
                variant: "warning",
                preventDuplicate: true
            });

            return;
        }

        let fileToUploaded = new FormData();

        if (checkIfFileExists(acceptedFiles[0].name)) {
            enqueueSnackbar("Dataset already exists", {
                variant: "error"
            });
            return;
        }

        enqueueSnackbar("Uploading dataset...", {
            variant: "info",
            preventDuplicate: true
        });

        fileToUploaded.append("upload", acceptedFiles[0]);

        const response = await fetch(process.env.NEXT_PUBLIC_DATASET_API, {
            method: "POST",
            headers: {
                Authorization: await getToken()
            },
            body: fileToUploaded
        });

        if (!response.ok) {
            console.log(await response.text());
            enqueueSnackbar("Failed to upload", {
                variant: "error",
                preventDuplicate: true
            });
            return;
        }

        console.log("working here");

        const dataSetsResp = await response.json();

        if (dataSetsResp.message === "Invalid auth token") {
            enqueueSnackbar("Session expired, login to upload the dataset", {
                variant: "error",
                preventDuplicate: true
            });
            return;
        }

        if (dataSetsResp.message === "File already exists!") {
            enqueueSnackbar(dataSetsResp.message, {
                variant: "error",
                preventDuplicate: true
            });
            return;
        }

        const newDataSet: DataSet = {
            name: `${acceptedFiles[0].name}`,
            key: `${dataSetsResp.Key}`
        };

        const newDataSetRes = await gqlAddDataSet({
            variables: {
                dataSetKey: JSON.stringify(newDataSet)
            }
        });

        if (newDataSetRes.data) {
            enqueueSnackbar("Dataset uploaded", {
                variant: "success"
            });
            // TODO
            setDataBlockEnabled(acceptedFiles[0].name, true);

            const newDatasets = [newDataSet, ...datasets];
            setDatasets(newDatasets);

            // Make sure the global is updated before showing the toolbox category
            globalThis.dataSetsList = newDatasets;

            // @ts-ignore
            const toolbox: Blockly.Toolbox = (Blockly.getMainWorkspace() as any)
                .toolbox_;
            toolbox.setSelectedItem(
                toolbox.contents_.filter(
                    (content) =>
                        // @ts-ignore
                        content.name_ === "DataFrames"
                )[0]
            );

            // Store dataset in session cache
            await new Promise<void>((resolve, reject) => {
                let fileReader = new FileReader();

                fileReader.onloadend = () => {
                    const content: string | ArrayBuffer | null =
                        fileReader.result;

                    if (typeof content == "string") {
                        globalThis.datasetCache[acceptedFiles[0].name] =
                            content;
                    }
                    resolve();
                };

                fileReader.onerror = (e) => {
                    reject(e);
                };

                fileReader.readAsText(acceptedFiles[0]);
            });
        } else if (newDataSetRes.errors)
            enqueueSnackbar("Dataset uploading failed", {
                variant: "error"
            });
    }

    return (
        <>
            <Dropzone
                accept=".csv"
                multiple={false}
                maxFiles={1}
                onDrop={fileDropped}
            >
                {({ getRootProps, getInputProps }) => (
                    <div className={styles.root}>
                        <div {...getRootProps()} className={styles.dropMessage}>
                            <input {...getInputProps()} />
                            <Typography variant="h6">
                                Drop your files here!
                            </Typography>
                            <Typography variant="body1">
                                Or click here to upload
                            </Typography>
                        </div>
                    </div>
                )}
            </Dropzone>
            <Snackbar
                open={errorOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <MuiAlert elevation={6} variant="filled" severity="error">
                    You can only upload CSVs
                </MuiAlert>
            </Snackbar>
        </>
    );
}

export function setDataBlockEnabled(csvName: string, enabled: boolean) {
    const initialUndoFlag = Blockly.Events.recordUndo;
    Blockly.Events.recordUndo = false;
    Blockly.getMainWorkspace()
        .getBlocksByType("df_load_file", false)
        .filter((block) => {
            let tBlk = block.getInputTargetBlock("NAME_VAL");
            return (
                tBlk.type === "text" &&
                tBlk.getInput("").fieldRow[1].value_ === csvName
            );
        })
        .forEach((block) => {
            block.setEnabled(enabled);
        });
    Blockly.Events.recordUndo = initialUndoFlag;
}
