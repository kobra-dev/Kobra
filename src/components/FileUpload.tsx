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
    const [datasets, setDatasets] = useState<UploadedDatasets>({});
    const [errorOpen, setErrorOpen] = React.useState(false);
    const styles = useStyles();

    const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") return;

        setErrorOpen(false);
    };

    useEffect(() => {
        globalThis.uploadedDatasets = datasets;
    }, [datasets]);

    return (
        <>
            <Dropzone
                onDrop={async (acceptedFiles: File[]) => {
                    console.log("start");
                    let dsChanged = false;
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
                    console.table({ dsChanged, datasets });
                    if (dsChanged) {
                        console.log(datasets);
                        setDatasets({ ...datasets });
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
