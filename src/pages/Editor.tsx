import React, { useState } from 'react';
import './Editor.css';
import PageLayout from '../components/PageLayout';
import CodeEditor, { getXml, loadXml } from '../components/CodeEditor';
import Runner, { getConsoleState, resetConsoleState, setConsoleState } from '../components/Runner';
import DataView, { IPlotState, getState as getPlotState, editState as editPlotState, resetState as resetPlotState } from '../components/DataView';
import { Paper } from '@material-ui/core';
import { getCode } from '../components/CodeEditor';
import { ConsoleState } from 'react-console-component';
import NoAccountDialog from '../components/dialogs/NoAccountDialog';
import NewDialog from '../components/dialogs/NewDialog';
import { useAuth0 } from '@auth0/auth0-react';
import { gql, useMutation } from '@apollo/client';

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

const SAVE_PROJECT = gql`
mutation SaveProject($id: String!, $projectJson: String!) {
  editProject(id: $id, projectJson: $projectJson) {
    id,
    projectJson
  }
}
`;

const RENAME_PROJECT = gql`
mutation RenameProject($id: String!, $name: String!) {
  editProject(id: $id, name: $name) {
    id,
    name
  }
}
`;

const UNSAVED_TEXT = "Unsaved project"

export default function Editor(): React.ReactElement {
  const [gqlSaveProject, saveProjectData] = useMutation(SAVE_PROJECT);
  const [gqlRenameProject, renameProjectData] = useMutation(RENAME_PROJECT);

  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const [noAccountIsOpen, setNoAccountIsOpen] = useState(!isAuthenticated);
  const [newIsOpen, setNewIsOpen] = useState(false);

  const [openProjectID, setOpenProjectID] = useState(undefined as string | undefined);
  const [openProjectTitle, setOpenProjectTitle] = useState(UNSAVED_TEXT);

  async function save() {
    if(!isAuthenticated) {
      // TODO: add current project JSON and title to state
      loginWithRedirect({
        appState: "this is a test app state, if you see this the redirect worked properly"
      });
    }
    else if(openProjectID === undefined) {
      // New project
      setNewIsOpen(true);
    }
    else {
      // Regular save
      await gqlSaveProject({
        variables: {
          id: openProjectID,
          projectJson: getSaveData()
        }
      });
    }
  }

  function newProject(newProjectId: string | undefined, newProjectTitle: string | undefined) {
    setNewIsOpen(false);
    if(newProjectId !== undefined) {
      setOpenProjectID(newProjectId);
    }
    if(newProjectTitle !== undefined) {
      setOpenProjectTitle(newProjectTitle);
    }
    /*// Save the current contents
    save();*/
  }

  function loadSave(saveDataStr: string) {
    const sd : SaveData = JSON.parse(saveDataStr);
    loadXml(sd.blocklyXml);
    editPlotState(state => {
      Object.keys(sd.plotState).forEach(key => {
        // @ts-ignore
        state[key] = sd.plotState[key];
      });
    });
    setConsoleState(sd.consoleState);
  }

  function newEmptyProject() {
    setOpenProjectID(undefined);
    setOpenProjectTitle(UNSAVED_TEXT);
    resetConsoleState();
    resetPlotState();
    loadXml("<xml xmlns=\"https://developers.google.com/blockly/xml\"></xml>");
  }

  function home() {
    if(isAuthenticated) {
      // TODO
      // Save work
      alert("this should go to the community page");
    }
    else {
      setNoAccountIsOpen(true);
    }
  }

  function onTitleChange(newVal: string) {
    console.log(newVal);
    setOpenProjectTitle(newVal);
    if(openProjectID !== undefined) {
      gqlRenameProject({
        variables: {
          id: openProjectID,
          name: newVal
        }
      });
    }
  }

  return (
    <PageLayout title={openProjectTitle} onSave={save} onNew={newEmptyProject} onOpen={() =>{}} onHome={home} onTitleChange={onTitleChange}>
      <div className="gridContainer">
        <div className="toolsColumn">
          <DataView />
          <Runner getCode={() => getCode()} />
        </div>
        <Paper className="editorColumn">
          <CodeEditor />
        </Paper>
      </div>
      <NoAccountDialog isOpen={noAccountIsOpen} setIsOpen={setNoAccountIsOpen} />
      <NewDialog isOpen={newIsOpen} onClose={newProject} isSave={true} prefilledTitle={openProjectTitle === UNSAVED_TEXT ? undefined : openProjectTitle}/>
    </PageLayout>
  );
}
