import React, { useEffect, useRef, useState } from "react";
import PageLayout from "./EditorLayout";
import ContentPageLayout from "./PageLayout";
import CodeEditor, { getXml, loadXml } from "./CodeEditor";
import Runner, { RunnerRef } from "./Runner";
import {
    IPlotState,
    getState as getPlotState,
    editState as editPlotState,
    resetState as resetPlotState
} from "./DataView";
import {
    Button,
    makeStyles,
    Paper,
    Snackbar,
    Typography
} from "@material-ui/core";
import { getCode } from "./CodeEditor";
import { ConsoleState } from "react-console-component";
import NoAccountDialog from "./dialogs/NoAccountDialog";
import NewDialog from "./dialogs/NewDialog";
import OpenDialog from "./dialogs/OpenDialog";
import {
    useRenameProjectMutation,
    useSaveProjectMutation,
    useGetEditorProjectDetailsLazyQuery,
    useAddProjectMutation
} from "../generated/queries";
import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import firebase from "../utils/firebase";
import { useLogin } from "./auth/LoginDialogProvider";
import { TopView } from "./TopView";
import Loader from "./Loader";
import { useRouter } from "next/dist/client/router";
import Stack from "./Stack";
import { Alert } from "@material-ui/lab";
import Head from "next/head";

interface SaveData {
    blocklyXml: string;
    plotState: IPlotState;
    consoleState: ConsoleState;
}

const UNSAVED_TEXT = "Unsaved project";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        display: "flex",
        height: "100%",
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
    title: string;
    state: string;
}

function setQueryString(title: string, qs: string) {
    window.history.pushState(
        {},
        title,
        window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            qs
    );
}

export default function Editor() {
    const styles = useStyles();
    const router = useRouter();

    const [gqlAddProject] = useAddProjectMutation();
    const [gqlSaveProject, saveProjectData] = useSaveProjectMutation();
    const [gqlRenameProject, renameProjectData] = useRenameProjectMutation();

    const [
        getProjectDetails,
        getProjectDetailsData
    ] = useGetEditorProjectDetailsLazyQuery();

    const [user] = useAuthState(firebase.auth());
    const login = useLogin();

    const [noAccountIsOpen, setNoAccountIsOpen] = useState(!user);
    const [newIsOpen, setNewIsOpen] = useState(false);
    const [openIsOpen, setOpenIsOpen] = useState(false);
    const [saveSuccessOpen, setSaveSuccessOpen] = useState(false);
    const [saveErrorOpen, setSaveErrorOpen] = useState(false);
    const [saveErrorMessage, setSaveErrorMessage] = useState<
        string | undefined
    >(undefined);

    const [openProjectName, setOpenProjectName] = useState(UNSAVED_TEXT);
    const runnerRef = useRef<RunnerRef>(null);

    const [openProjectId, setOpenProjectId] = useState<string | undefined>(
        () => {
            const id = new URLSearchParams(window.location.search).get("id");
            if (!id || id.length === 0) return undefined;
            getProjectDetails({
                variables: {
                    id
                }
            });
            return id;
        }
    );

    useEffect(() => {
        const proj = getProjectDetailsData.data?.project;
        if (!proj) return;
        setOpenProjectName(proj.name);
        if (proj.projectJson) loadSave(proj.projectJson);
    }, [getProjectDetailsData.data?.project]);

    if (openProjectId && getProjectDetailsData.loading) {
        return (
            <Loader>
                <Typography color="textSecondary">
                    Getting project data...
                </Typography>
            </Loader>
        );
    }
    if (openProjectId && getProjectDetailsData.error) {
        return (
            <ContentPageLayout>
                <Stack direction="column" spacing="0.5rem">
                    <Typography variant="h2">
                        Sorry, there was an error
                    </Typography>
                    <Typography variant="body1">
                        We couldn't find that project
                    </Typography>
                    <Typography variant="body2">
                        If it helps, here's the error message we got from the
                        server:{" "}
                        <code>{getProjectDetailsData.error.message}</code>
                    </Typography>
                    <div>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => router.push("/")}
                        >
                            Go to homepage
                        </Button>
                    </div>
                </Stack>
            </ContentPageLayout>
        );
    }

    /*useEffect(() => {
    if(!runnerRef) return;
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    if(projectId === null || projectId.length === 0) return;
    const parsedState: SavedEditorState = JSON.parse(atob(editorState));
    setOpenProjectTitle(parsedState.title);
    loadSave(parsedState.state);
    localStorage.removeItem("editorState");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runnerRef]);*/

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
        if (!user && !(await login())) {
            return;
        } else if (!openProjectId) {
            // New project
            //setNewIsOpen(true);
            const newData = await gqlAddProject({
                variables: {
                    name: openProjectName,
                    isPublic: false,
                    projectJson: getSaveData()
                }
            });
            if (newData.errors || !newData.data) {
                if (newData?.errors?.[0].message) {
                    setSaveErrorMessage(newData.errors[0].message);
                } else {
                    setSaveErrorMessage(undefined);
                }
                setSaveErrorOpen(true);
            } else {
                const id = newData.data.addProject.id;
                setOpenProjectId(id);
                setQueryString(openProjectId + " | Kobra Studio", "?id=" + id);
                setSaveSuccessOpen(true);
            }
        } else {
            // Regular save
            await gqlSaveProject({
                variables: {
                    id: openProjectId,
                    projectJson: getSaveData()
                }
            });
        }
    }

    function newProject(
        newProjectId: string | undefined,
        newProjectTitle: string | undefined
    ) {
        setNewIsOpen(false);
        if (newProjectId !== undefined) {
            setOpenProjectId(newProjectId);
        }
        if (newProjectTitle !== undefined) {
            setOpenProjectName(newProjectTitle);
        }
        /*// Save the current contents
    save();*/
    }

    async function open() {
        if (!user && !(await login())) {
            return;
        } else {
            setOpenIsOpen(true);
        }
    }

    function loadSave(saveDataStr: string) {
        const sd: SaveData = JSON.parse(saveDataStr);
        loadXml(sd.blocklyXml);
        editPlotState((state) => {
            Object.keys(sd.plotState).forEach((key) => {
                // @ts-ignore
                state[key] = sd.plotState[key];
            });
        });
        if (runnerRef.current?.setState === undefined)
            throw new Error("There is no setState that loadSave can use");
        runnerRef.current.setState(sd.consoleState);
    }

    function newEmptyProject() {
        setOpenProjectId(undefined);
        setOpenProjectName(UNSAVED_TEXT);
        setQueryString(UNSAVED_TEXT + " | Kobra Studio", "");
        if (runnerRef.current?.resetState === undefined)
            throw new Error("runnerResetConsoleState is undefined");
        runnerRef.current.resetState();
        resetPlotState();
        loadXml(
            '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'
        );
    }

    function home() {
        if (user) {
            // TODO
            // Save work
            router.push("/dashboard");
        } else {
            setNoAccountIsOpen(true);
        }
    }

    function onTitleChange(newVal: string) {
        setOpenProjectName(newVal);
        if (openProjectId !== undefined && newVal !== openProjectName) {
            gqlRenameProject({
                variables: {
                    id: openProjectId,
                    name: newVal
                }
            });
        }
    }

    return (
        <>
        <Head>
            <title>{openProjectName} | Kobra Studio</title>
        </Head>
        <PageLayout
            title={openProjectName}
            onSave={save}
            onNew={newEmptyProject}
            onOpen={open}
            onHome={home}
            onTitleChange={onTitleChange}
        >
            <div className={styles.gridContainer}>
                <div className={styles.toolsColumn}>
                    <TopView />
                    <Runner ref={runnerRef} getCode={() => getCode()} />
                </div>
                <Paper className={styles.editorColumn}>
                    <CodeEditor className={styles.codeEditor} />
                </Paper>
            </div>
            <NoAccountDialog
                isOpen={noAccountIsOpen}
                setIsOpen={setNoAccountIsOpen}
            />
            {/*<NewDialog
        isOpen={newIsOpen}
        onClose={newProject}
        isSave={true}
        prefilledTitle={
          openProjectTitle === UNSAVED_TEXT ? undefined : openProjectTitle
        }
        getSaveData={getSaveData}
      />*/}
            {user && (
                <OpenDialog isOpen={openIsOpen} setIsOpen={setOpenIsOpen} />
            )}
            <Snackbar
                open={saveSuccessOpen}
                autoHideDuration={6000}
                onClose={() => setSaveSuccessOpen(false)}
            >
                <Alert severity="success">Save successful!</Alert>
            </Snackbar>
            <Snackbar
                open={saveErrorOpen}
                autoHideDuration={6000}
                onClose={() => setSaveErrorOpen(false)}
            >
                <Alert severity="error">
                    Save failed{saveErrorMessage ? ": " + saveErrorMessage : ""}
                </Alert>
            </Snackbar>
        </PageLayout>
        </>
    );
}
