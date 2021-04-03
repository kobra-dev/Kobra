import React, { useState } from "react";
import { DataFrame } from "../blocks/DataFrame";
import Dropzone from "react-dropzone";
import { Typography, Divider } from "@material-ui/core";
import { data } from "autoprefixer";

export default function FileUpload() {
    const [datasets, setDatasets] = useState(new Map());
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Dropzone
            onDrop={(acceptedFiles: File[]) => {
                let file = acceptedFiles[0];
                setIsLoading(true);

                if (file.name.split(".").pop() === "csv") {
                    /*                   setFileNames([
                        ...fileNames,
                          <>
                            <Typography variant="body1">
                                {acceptedFiles[0].name}
                            </Typography>
                            <Divider />
                        </>
                    ]);*/

                    let fileReader = new FileReader();

                    fileReader.onloadend = () => {
                        const content: string | ArrayBuffer | null =
                            fileReader.result;

                        const df = new DataFrame();

                        if (typeof content == "string") df.read_csv(content);
                        else return;

                        setDatasets(datasets.set(file.name, df));

                        console.log(datasets);
                    };

                    fileReader.readAsText(file);
                    setIsLoading(false);
                } else {
                    // TODO: toast that you can only upload a CSV
                }
            }}
        >
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div style={{ padding: "2vh", textAlign: "center" }}>
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
                        <Typography variant="body1"></Typography>
                    </div>
                </section>
            )}
        </Dropzone>
    );
}
