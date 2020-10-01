import React, { useState } from 'react';
import './Editor.css';
import PageLayout from '../components/PageLayout';
import CodeEditor, { getXml, loadXml } from '../components/CodeEditor';
import Runner from '../components/Runner';
import DataView from '../components/DataView';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Paper } from '@material-ui/core';
import { getCode } from '../components/CodeEditor';

interface SaveData {
  blocklyXml : string
}

export default function Editor(): React.ReactElement {
  const [modalOpen, modalSetOpen] = useState(false);
  const [saveInput, setSaveInput] = useState("");
  const [openButtonDisabled, setOpenButtonDisabled] = useState(true);

  const handleModalClose = () => {
    modalSetOpen(false);
  }

  function save() {
    const sd : SaveData = {
       blocklyXml: getXml()
    };
    // TODO
    console.log(JSON.stringify(sd));
  }

  function open() {
    setOpenButtonDisabled(true);
    modalSetOpen(true);
  }

  function saveInputOnChange(event : any) {
    setSaveInput(event.target.value);
    setOpenButtonDisabled(event.target.value.length === 0);
  }

  function loadSave() {
    const sd : SaveData = JSON.parse(saveInput);
    loadXml(sd.blocklyXml);
  }

  return (
    <PageLayout title="Kobra Studio" onSave={save} onOpen={open}>
      <div className="gridContainer">
        <div className="toolsColumn">
          <DataView />
          <Runner getCode={() => getCode()} />
        </div>
        <Paper className="editorColumn">
          <CodeEditor />
        </Paper>
      </div>
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Open</DialogTitle>
        <DialogContent>
          <DialogContentText>Paste project savedata here.</DialogContentText>
          <TextField multiline rows={4} onChange={ saveInputOnChange } />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>
            Cancel
          </Button>
          <Button onClick={() => {handleModalClose(); loadSave();}} color="primary" disabled={ openButtonDisabled }>
            Open
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  );
}
