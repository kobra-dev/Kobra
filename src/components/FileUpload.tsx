import React, { useState } from "react";
import { DataFrame } from "../blocks/DataFrame";
import Dropzone from "react-dropzone";
import { Typography, Divider } from "@material-ui/core";
import { data } from "autoprefixer";

export default function FileUpload() {
    const [datasets, setDatasets] = useState(new Map());

    return (
        <Dropzone
            onDrop={(acceptedFiles: File[]) => {
                let file = acceptedFiles[0];

                if (file.name.split(".").pop() === "csv") {
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
                    </div>
                </section>
            )}
        </Dropzone>
    );
}
