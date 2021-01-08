import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Typography } from '@material-ui/core';

export default function FileUpload() {
  const [files, setFiles]: any = useState([]);

  let fileNames: any[] = [];

  function handleUpload(uploadedFiles: any) {}

  return (
    <Dropzone
      onDrop={(acceptedFiles: any) => {
        console.log(acceptedFiles);
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
