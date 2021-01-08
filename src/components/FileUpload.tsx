import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Typography } from '@material-ui/core';

export default function FileUpload() {
  const [files, setFiles]: any[] = useState([]);
  const [fileNames, setFileNames]: any[] = useState([null]);

  // let fileNames: any[] = [];

  return (
    <Dropzone
      onDrop={(acceptedFiles: File[]) => {
        console.log(acceptedFiles);
        for (let i = 0; i < acceptedFiles.length; i++) {
          setFileNames([...fileNames, <p>{acceptedFiles[i].name}</p>]);
        }
        setFiles(() => {
          files.push(acceptedFiles);
        });
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
