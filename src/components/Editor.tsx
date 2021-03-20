import React, { useEffect, useRef, useState } from 'react';
import PageLayout from './EditorLayout';
import CodeEditor, { getXml, loadXml } from './CodeEditor';
import Runner, { RunnerRef } from './Runner';
import { IPlotState, getState as getPlotState, editState as editPlotState, resetState as resetPlotState } from './DataView';
import { makeStyles, Paper } from '@material-ui/core';
import { getCode } from './CodeEditor';
import { ConsoleState } from 'react-console-component';
import NoAccountDialog from './dialogs/NoAccountDialog';
import NewDialog from './dialogs/NewDialog';
import OpenDialog from './dialogs/OpenDialog';
import { useRenameProjectMutation, useSaveProjectMutation } from '../generated/queries';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../utils/firebase';
import { useLogin } from './auth/LoginDialogProvider';
import { TopView } from './TopView';

interface SaveData {
  blocklyXml : string,
  plotState : IPlotState,
  consoleState : ConsoleState
}

const UNSAVED_TEXT = "Unsaved project";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "flex",
    height: "calc(100vh - 125px)",
    padding: "20px",
    "& .MuiPaper-root": {
      margin: "0.5rem"
    }
  },
  editorColumn: {
    flex: 1
  },
  toolsColumn: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "40rem",
    width: "40vw",
    "& > *": {
      flex: 1
    }
  },
  codeEditor: {
    height: "100%"
  }
}));

interface SavedEditorState {
  title: string,
  state: string
}

export default function Editor(): React.ReactElement {
  const styles = useStyles();

  const [gqlSaveProject, saveProjectData] = useSaveProjectMutation();
  const [gqlRenameProject, renameProjectData] = useRenameProjectMutation();

  const [user] = useAuthState(firebase.auth());
  const login = useLogin();

  const [noAccountIsOpen, setNoAccountIsOpen] = useState(!user);
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [openIsOpen, setOpenIsOpen] = useState(false);

  const [openProjectID, setOpenProjectID] = useState<string | undefined>(undefined);
  const [openProjectTitle, setOpenProjectTitle] = useState(UNSAVED_TEXT);

  const runnerRef = useRef<RunnerRef>(null);

  useEffect(() => {
    if(!runnerRef) return;
    const editorState = localStorage.getItem("editorState");
    if(editorState === null) return;
    const parsedState: SavedEditorState = JSON.parse(atob(editorState));
    setOpenProjectTitle(parsedState.title);
    loadSave(parsedState.state);
    localStorage.removeItem("editorState");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runnerRef]);

  /* Use this to get the Auth0 editorState
  useEffect(() => {
    //console.log(router.query);
    const urlParams = new URLSearchParams(window.location.search);
    const editorState = urlParams.get('editorState');
    if(editorState === null || editorState.length === 0) return;
    setEditorStateParam("");
    console.log(atob(editorState));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  function getSaveData() {
    const sd: SaveData = {
      blocklyXml: getXml(),
      plotState: getPlotState(),
      consoleState: runnerRef.current?.state as ConsoleState
   };
   return JSON.stringify(sd);
  }

  async function save() {
    if(!user && !(await login())) {
      return;
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

  async function open() {
    if(!user && !(await login())) {
      return;
    }
    else {
      setOpenIsOpen(true);
    }
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
    if(runnerRef.current?.setState === undefined) throw new Error("There is no setState that loadSave can use");
    runnerRef.current.setState(sd.consoleState);
  }

  function newEmptyProject() {
    setOpenProjectID(undefined);
    setOpenProjectTitle(UNSAVED_TEXT);
    if(runnerRef.current?.resetState === undefined) throw new Error("runnerResetConsoleState is undefined");
    runnerRef.current.resetState();
    resetPlotState();
    loadXml("<xml xmlns=\"https://developers.google.com/blockly/xml\"></xml>");
  }

  function home() {
    if(user) {
      // TODO
      // Save work
      alert("this should go to the community page");
    }
    else {
      setNoAccountIsOpen(true);
    }
  }

  function onTitleChange(newVal: string) {
    setOpenProjectTitle(newVal);
    if(openProjectID !== undefined && newVal !== openProjectTitle) {
      gqlRenameProject({
        variables: {
          id: openProjectID,
          name: newVal
        }
      });
    }
  }

  return (
    <PageLayout title={openProjectTitle} onSave={save} onNew={newEmptyProject} onOpen={open} onHome={home} onTitleChange={onTitleChange}>
      <div className={styles.gridContainer}>
        <div className={styles.toolsColumn}>
          <TopView />
          <Runner ref={runnerRef} getCode={() => getCode()}/>
        </div>
        <Paper className={styles.editorColumn}>
          <CodeEditor className={styles.codeEditor} />
        </Paper>
      </div>
      <NoAccountDialog isOpen={noAccountIsOpen} setIsOpen={setNoAccountIsOpen} />
      {/*<NewDialog
        isOpen={newIsOpen}
        onClose={newProject}
        isSave={true}
        prefilledTitle={
          openProjectTitle === UNSAVED_TEXT ? undefined : openProjectTitle
        }
        getSaveData={getSaveData}
      />*/}
      {user && <OpenDialog isOpen={openIsOpen} setIsOpen={setOpenIsOpen}/>}
    </PageLayout>
  );
}