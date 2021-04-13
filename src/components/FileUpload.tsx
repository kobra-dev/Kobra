import React, { useState } from "react";
import { DataFrame } from "../blocks/DataFrame";
import Dropzone from "react-dropzone";
import { Typography, Divider, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export default function FileUpload() {
    const [datasets, setDatasets] = useState(new Map());
    const [open, setOpen] = React.useState(false);

    const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") return;

        setOpen(false);
    };

    return (
        <>
            <Dropzone
                onDrop={(acceptedFiles: File[]) => {
                    let file = acceptedFiles[0];

                    if (file.name.split(".").pop() === "csv") {
                        let fileReader = new FileReader();

                        fileReader.onloadend = () => {
                            const content: string | ArrayBuffer | null =
                                fileReader.result;

                            const df = new DataFrame();

                            if (typeof content == "string")
                                df.read_csv(content);
                            else return;

                            setDatasets(datasets.set(file.name, df));

                            console.log(datasets);
                        };

                        fileReader.readAsText(file);
                    } else {
                        // TODO: toast that you can only upload a CSV
                        setOpen(true);
                    }
                }}
            >
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div
                                style={{ padding: "2vh", textAlign: "center" }}
                            >
                                <Typography variant="h6">
                                    Drop your files here!
                                </Typography>
                            </div>
                            {
                                // Display file names
                                Array.from(datasets.keys()).map((ds, index) => (
                                    <React.Fragment key={index}>
                                        <Typography variant="body1">
                                            {ds}
                                        </Typography>
                                        <Divider />
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </section>
                )}
            </Dropzone>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleClose}
                    severity="error"
                >
                    You can only upload CSVs
                </MuiAlert>
            </Snackbar>
        </>
    );
}
