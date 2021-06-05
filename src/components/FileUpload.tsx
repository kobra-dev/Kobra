import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Typography, Snackbar, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Blockly from "blockly/core";
import { getToken } from "../utils/apolloClient";
import { useSnackbar } from "notistack";
import { useAddDataSetMutation } from "../generated/queries";

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

export default function FileUpload({ dataSetList }) {
    const { enqueueSnackbar } = useSnackbar();
    const [datasets, setDatasets] = useState<UploadedDatasets[]>({});
    const [errorOpen, setErrorOpen] = React.useState(false);
    const styles = useStyles();

    const [gqlAddDataSet] = useAddDataSetMutation();

    const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") return;

        setErrorOpen(false);
    };

    useEffect(() => {
        globalThis.uploadedDatasets = datasets;
    }, [datasets]);

    function checkIfFileExists(name: string): boolean {
        return dataSetList
            .map((data: string) => data.trim().split("&#$@")[1])
            .includes(name);
    }

    return (
        <>
            <Dropzone
                onDrop={async (acceptedFiles: File[]) => {
                    let dsChanged = false;
                    let fileToUploaded = new FormData();
                    setTimeout(
                        () =>
                            enqueueSnackbar("Uploading dataset", {
                                variant: "info"
                            }),
                        100
                    );

                    if (checkIfFileExists(acceptedFiles[0].name)) {
                        setTimeout(
                            () =>
                                enqueueSnackbar("Dataset already exists", {
                                    variant: "error"
                                }),
                            500
                        );

                        return;
                    }

                    fileToUploaded.append("upload", acceptedFiles[0]);

                    const response = await fetch(
                        process.env.NEXT_PUBLIC_DATASET_API,
                        {
                            method: "POST",
                            headers: {
                                Authorization: await getToken()
                            },
                            body: fileToUploaded
                        }
                    );

                    const dataSetsResp = await response.json();

                    if (dataSetsResp.message === "Invalid auth token") {
                        enqueueSnackbar(
                            "Session expired, login to upload the dataset",
                            {
                                variant: "error",
                                preventDuplicate: true
                            }
                        );
                    }

                    const newDataSet = await gqlAddDataSet({
                        variables: {
                            dataSetKey:
                                `${dataSetsResp.Key}&#$@${acceptedFiles[0].name}`.trim()
                        }
                    });

                    if (newDataSet.data)
                        setTimeout(() => {
                            enqueueSnackbar("Dataset uploaded", {
                                variant: "success"
                            });
                        }, 500);

                    if (newDataSet.errors)
                        setTimeout(() => {
                            enqueueSnackbar("Dataset uploading failed", {
                                variant: "error"
                            });
                        }, 500);

                    await Promise.all(
                        acceptedFiles.map(
                            (file) =>
                                new Promise<void>((resolve, reject) => {
                                    if (file.name.split(".").pop() === "csv") {
                                        let fileReader = new FileReader();

                                        fileReader.onloadend = () => {
                                            const content:
                                                | string
                                                | ArrayBuffer
                                                | null = fileReader.result;

                                            if (typeof content == "string") {
                                                datasets[file.name] = content;
                                                dsChanged = true;
                                                setDataBlockEnabled(
                                                    file.name,
                                                    true
                                                );
                                            }
                                            resolve();
                                        };

                                        fileReader.onerror = (e) => {
                                            reject(e);
                                        };

                                        fileReader.readAsText(file);
                                    } else {
                                        setErrorOpen(true);
                                    }
                                })
                        )
                    );
                    if (dsChanged) {
                        setDatasets({ ...datasets });
                        // @ts-ignore
                        const toolbox: Blockly.Toolbox = (
                            Blockly.getMainWorkspace() as any
                        ).toolbox_;
                        toolbox.setSelectedItem(
                            toolbox.contents_.filter(
                                (content) =>
                                    // @ts-ignore
                                    content.name_ === "DataFrames"
                            )[0]
                        );
                    }
                }}
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

function setDataBlockEnabled(csvName: string, enabled: boolean) {
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
