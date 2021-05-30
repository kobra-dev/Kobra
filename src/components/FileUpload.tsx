import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import {
    Typography,
    Divider,
    Snackbar,
    Card,
    CardHeader,
    makeStyles,
    IconButton,
    CardContent
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Delete } from "@material-ui/icons";
import Blockly from "blockly/core";
import firebase from "../utils/firebase";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
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

export default function FileUpload() {
    const { enqueueSnackbar } = useSnackbar();

    const [datasets, setDatasets] = useState<UploadedDatasets>({});
    const [errorOpen, setErrorOpen] = React.useState(false);
    const styles = useStyles();

    const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") return;

        setErrorOpen(false);
    };

    async function getToken() {
        const token = await firebase.auth().currentUser?.getIdToken();

        if (token === undefined) return {};

        return token;
    }

    useEffect(() => {
        globalThis.uploadedDatasets = datasets;
    }, [datasets]);

    async function uploadDatatset(key: string) {
        fetch(process.env.NEXT_PUBLIC_GQL_API_UPDATED, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: (await getToken()) as unknown as string
            },
            body: JSON.stringify({
                query: `mutation addDataset($datasetKey: String!){
                         addDataSet(dataSetKey:$datasetKey){
                            id
                            name
                            datasets
                        }
                }
                `,
                variables: {
                    datasetKey: `${process.env.NEXT_PUBLIC_DATASET_API}/${key}`
                }
            })
        })
            .then((resp) => resp.json())
            .then((result) => {
                enqueueSnackbar("Dataset uploaded", {
                    variant: "success"
                });
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <Dropzone
                onDrop={async (acceptedFiles: File[]) => {
                    let dsChanged = false;
                    let fileToUploaded = new FormData();
                    fileToUploaded.append("upload", acceptedFiles[0]);

                    fetch(process.env.NEXT_PUBLIC_DATASET_API, {
                        method: "POST",
                        headers: {
                            //TODO (verite) I'm sure there is a better way to write this but I'll fix this letter
                            Authorization:
                                (await getToken()) as unknown as string
                        },
                        body: fileToUploaded
                    })
                        .then((response) => response.json())
                        .then((resp) => {
                            if (resp.message === "Invalid auth token") {
                                enqueueSnackbar(
                                    "Session expired, login to upload the dataset",
                                    {
                                        variant: "error",
                                        preventDuplicate: true
                                    }
                                );
                            }
                            uploadDatatset(resp.Key);
                        })
                        .catch((error) => {
                            // Handle sending the file key to the graphql api
                            enqueueSnackbar("dataset upload failed", {
                                variant: "error"
                            });
                            console.log({ error });
                        });

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
                        const toolbox: Blockly.Toolbox =
                            Blockly.getMainWorkspace().toolbox_;
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

                        {Object.keys(datasets).length > 0 && (
                            <>
                                <Divider />
                                <div className={styles.dsCardContainer}>
                                    {
                                        // Display file names
                                        Object.keys(datasets).map(
                                            (ds, index) => (
                                                <Card
                                                    key={index}
                                                    variant="outlined"
                                                >
                                                    <CardContent
                                                        className={
                                                            styles.dsCard
                                                        }
                                                    >
                                                        <Typography variant="body1">
                                                            {ds}
                                                        </Typography>
                                                        <IconButton
                                                            aria-label="delete"
                                                            size="small"
                                                            onClick={() => {
                                                                delete datasets[
                                                                    ds
                                                                ];
                                                                setDatasets({
                                                                    ...datasets
                                                                });
                                                                setDataBlockEnabled(
                                                                    ds,
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            <Delete />
                                                        </IconButton>
                                                    </CardContent>
                                                    {/*<CardHeader
                                                disableTypography
                                                title={<Typography variant="body1">{ds}</Typography>}
                                                action={
                                                    <IconButton
                                                        aria-label="delete"
                                                        size="small"
                                                        onClick={() => {
                                                            delete datasets[ds];
                                                            setDatasets({
                                                                ...datasets
                                                            });
                                                        }}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                }
                                            />*/}
                                                </Card>
                                            )
                                        )
                                    }
                                </div>
                            </>
                        )}
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
