import React, { useState } from 'react';
import './Editor.css';
import PageLayout from '../components/PageLayout';
import CodeEditor, { getXml, loadXml } from '../components/CodeEditor';
import Runner, { getConsoleState, setConsoleState } from '../components/Runner';
import DataView, { IPlotState, getState as getPlotState, editState as editPlotState } from '../components/DataView';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Paper } from '@material-ui/core';
import { getCode } from '../components/CodeEditor';
import { ConsoleState } from 'react-console-component';
import WelcomeDialog from '../components/dialogs/WelcomeDialog';
import NewDialog from '../components/dialogs/NewDialog';

interface SaveData {
  blocklyXml : string,
  plotState : IPlotState,
  consoleState : ConsoleState
}

export function getSaveData() {
  const sd : SaveData = {
    blocklyXml: getXml(),
    plotState: getPlotState(),
    consoleState: getConsoleState() as ConsoleState
 };
 return JSON.stringify(sd);
}

export default function Editor(): React.ReactElement {
  const [openModalOpen, openModalSetOpen] = useState(false);
  const [saveInput, setSaveInput] = useState("");
  const [openButtonDisabled, setOpenButtonDisabled] = useState(true);
  const [saveModalOpen, saveModalSetOpen] = useState(false);
  const [saveModalCode, setSaveModalCode] = useState("");
  const [welcomeIsOpen, setWelcomeIsOpen] = useState(true);
  const [newIsOpen, setNewIsOpen] = useState(false);

  const [openProject, setOpenProject] = useState(undefined as number | undefined);

  const handleOpenModalClose = () => {
    openModalSetOpen(false);
  }

  const handleSaveModalClose = () => {
    saveModalSetOpen(false);
  }

  function save() {
    const sd : SaveData = {
       blocklyXml: getXml(),
       plotState: getPlotState(),
       consoleState: getConsoleState() as ConsoleState
    };
    setSaveModalCode(JSON.stringify(sd));
    saveModalSetOpen(true);
  }

  function open() {
    setOpenButtonDisabled(true);
    openModalSetOpen(true);
  }

  function saveInputOnChange(event : any) {
    setSaveInput(event.target.value);
    setOpenButtonDisabled(event.target.value.length === 0);
  }

  function loadSave() {
    const sd : SaveData = JSON.parse(saveInput);
    loadXml(sd.blocklyXml);
    editPlotState(state => {
      Object.keys(sd.plotState).forEach(key => {
        // @ts-ignore
        state[key] = sd.plotState[key];
      });
    });
    setConsoleState(sd.consoleState);
  }

  function newProject(newProjectId: number | undefined) {
    setNewIsOpen(false);
    if(newProjectId !== undefined) {
      setOpenProject(newProjectId);
    }
  }

  return (
    <PageLayout title="Kobra Studio" onSave={save} onOpen={open} onHome={() => { setWelcomeIsOpen(true); }}>
      <div className="gridContainer">
        <div className="toolsColumn">
          <DataView />
          <Runner getCode={() => getCode()} />
        </div>
        <Paper className="editorColumn">
          <CodeEditor />
        </Paper>
      </div>
      <Dialog open={openModalOpen} onClose={handleOpenModalClose}>
        <DialogTitle>Open</DialogTitle>
        <DialogContent>
          <DialogContentText>Paste project savedata here.</DialogContentText>
          <TextField multiline rows={4} onChange={ saveInputOnChange } />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModalClose}>
            Cancel
          </Button>
          <Button onClick={() => {handleOpenModalClose(); loadSave();}} color="primary" disabled={ openButtonDisabled }>
            Open
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={saveModalOpen} onClose={handleSaveModalClose}>
        <DialogTitle>Save</DialogTitle>
        <DialogContent>
          <DialogContentText>Copy this project savedata and store it somewhere safe. You can load it again by selecting File-&gt;Open, and pasting the savedata into the text field.</DialogContentText>
          <div className="saveModalCodeContainer">
            <code>{saveModalCode}</code>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <WelcomeDialog isOpen={welcomeIsOpen} setIsOpen={setWelcomeIsOpen} showNew={() => { setNewIsOpen(true); }} />
      <NewDialog isOpen={newIsOpen} onClose={newProject} isSave={false}/>
    </PageLayout>
  );
}
