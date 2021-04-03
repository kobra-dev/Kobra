import React, { useState } from 'react';
import { DataFrame } from "../blocks/DataFrame";
import Dropzone from 'react-dropzone';
import { Typography, Divider } from '@material-ui/core';

export default function FileUpload() {
  const [files, setFiles]: any[] = useState([]);
  const [fileNames, setFileNames]: any[] = useState([null]);

  // let fileNames: any[] = [];

  return (
    <Dropzone
      onDrop={(acceptedFiles: File[]) => {
        console.log(acceptedFiles);
        for (let i = 0; i < acceptedFiles.length; i++) {
          if (acceptedFiles[i].name.split('.').pop() === 'csv') {
            setFileNames([
              ...fileNames,
              <>
                <Typography variant="body1">{acceptedFiles[i].name}</Typography>
                <Divider />
              </>
            ]);

            let fileReader = new FileReader();
            fileReader.onloadend = (()=>{
              const content: String = fileReader.result;
              const df = new DataFrame();
              df.read_csv(content);
              console.log(df);
            });
            fileReader.readAsText(acceptedFiles[0]);
          } else {

          }
          setFiles([...files, acceptedFiles]);
        }
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div style={{ padding: '2vh', textAlign: 'center' }}>
              <Typography variant="h6">Drop your files here!</Typography>
            </div>
            <div>{fileNames}</div>
          </div>
        </section>
      )}
    </Dropzone>
  );
}