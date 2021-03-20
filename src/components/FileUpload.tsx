import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          } else {
            toast.error('🛑 You can only add CSV files', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </section>
      )}
    </Dropzone>
  );
}
