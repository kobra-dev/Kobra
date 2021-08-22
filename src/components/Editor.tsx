import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import {
    Button,
    makeStyles,
    Paper,
    Snackbar,
    Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { useSave } from "src/AutosaverProvider";
import DefaultWorkspaceXML from "../blocks/defaultWorkspace.xml";
import {
    useAddProjectMutation,
    useGetEditorProjectDetailsLazyQuery,
    useRenameProjectMutation,
    useSaveProjectMutation
} from "../generated/queries";
import firebase from "../utils/firebase";
import { useLogin } from "./auth/LoginDialogProvider";
import CodeEditor, { getCode, getXml, loadXml } from "./CodeEditor";
import {
    editState as editPlotState,
    getState as getPlotState,
    IPlotState,
    resetState as resetPlotState
} from "./DataView";
import NoAccountDialog from "./dialogs/NoAccountDialog";
import PageLayout from "./EditorLayout";
import Loader from "./Loader";
import { ConsoleLine } from "./NewConsole";
import ContentPageLayout from "./PageLayout";
import Runner, { RunnerRef } from "./Runner";
import Stack from "./Stack";
import { TopView } from "./TopView";

interface SaveData {
    blocklyXml: string;
    plotState: IPlotState;
    consoleState: ConsoleLine[];
}

const UNSAVED_TEXT = "Unsaved project";
const TITLE_SUFFIX = " | Kobra Studio";

const useStyles = makeStyles(() => ({
    gridContainer: {
        display: "flex",
        height: "calc(100% - 64px)",
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
            flex: 1,
            maxHeight: "50%"
        }
    },
    runnerWrapper: {
        padding: "0.5rem",
        boxSizing: "border-box",
        "& > *": {
            height: "100%",
            margin: "0 !important"
        }
    },
    codeEditor: {
        height: "100%"
    }
}));

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

// When we switched to the custom console component (NewConsole.tsx) the format of the console state changed
function convertConsoleStateToNewFormat(state: {
    log: {
        command: string;
        label: string;
        message: {
            type?: string;
            value: string[];
        }[];
    }[];
}) {
    const newState: ConsoleLine[] = [];

    for (const line of state.log) {
        if (line.label.length > 0) {
            newState.push({
                className: "input-log",
                text: line.label + line.command
            });
        }
        for (const message of line.message) {
            newState.push({
                className: message.type,
                text: message.value.join("")
            });
        }
    }

    return newState;
}

export default function Editor() {
    const styles = useStyles();
    const router = useRouter();

    const [gqlAddProject] = useAddProjectMutation();
    const [gqlSaveProject] = useSaveProjectMutation();
    const [gqlRenameProject] = useRenameProjectMutation();

    const [getProjectDetails, getProjectDetailsData] =
        useGetEditorProjectDetailsLazyQuery();

    const [user] = useAuthState(firebase.auth());
    const login = useLogin();

    const [noAccountIsOpen, setNoAccountIsOpen] = useState(!user);
    const [saveSuccessOpen, setSaveSuccessOpen] = useState(false);
    const [saveErrorOpen, setSaveErrorOpen] = useState(false);
    const [saveErrorMessage, setSaveErrorMessage] =
        useState<string | undefined>(undefined);

    const [openProjectName, setOpenProjectName] = useState(UNSAVED_TEXT);
    const runnerRef = useRef<RunnerRef>(null);

    const autosaveSave = useSave();

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
                        We couldn&apos;t find that project
                    </Typography>
                    <Typography variant="body2">
                        If it helps, here&apos;s the error message we got from
                        the server:{" "}
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

    function getSaveData() {
        const sd: SaveData = {
            blocklyXml: getXml(),
            plotState: getPlotState(),
            consoleState: runnerRef.current?.state ?? []
        };
        return JSON.stringify(sd);
    }

    async function save() {
        if (!user && !(await login())) {
            return;
        }

        // If the user just logged in the hook hasn't updated yet
        const currentUser = user ?? firebase.auth().currentUser;

        if (!currentUser)
            throw new Error("User is undefined when trying to save");

        // isFork also catches cases where both getProjectDetailsData.data and openProjectId are undefined, but that doesn't mean it is a fork
        const isFork =
            getProjectDetailsData.data?.project?.id === openProjectId &&
            getProjectDetailsData.data?.project?.userId !== currentUser.uid;
        if (!openProjectId || isFork) {
            // New project/fork
            const newData = await gqlAddProject({
                variables: {
                    name: openProjectName,
                    isPublic: false,
                    projectJson: getSaveData(),
                    ...(openProjectId && isFork
                        ? {
                              description:
                                  getProjectDetailsData.data?.project
                                      ?.description,
                              summary:
                                  getProjectDetailsData.data?.project?.summary,
                              parentId: openProjectId
                          }
                        : undefined)
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
                setQueryString(openProjectId + TITLE_SUFFIX, "?id=" + id);
                setSaveSuccessOpen(true);
            }
        } else {
            // Regular save
            const saveData = await gqlSaveProject({
                variables: {
                    id: openProjectId,
                    projectJson: getSaveData()
                }
            });
            if (saveData.errors || !saveData.data) {
                if (saveData?.errors?.[0].message) {
                    setSaveErrorMessage(saveData.errors[0].message);
                } else {
                    setSaveErrorMessage(undefined);
                }
                setSaveErrorOpen(true);
            } else {
                setSaveSuccessOpen(true);
            }
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
        if (!Array.isArray(sd.consoleState)) {
            sd.consoleState = convertConsoleStateToNewFormat(sd.consoleState);
        }
        runnerRef.current.setState(sd.consoleState);
    }

    function newEmptyProject() {
        setOpenProjectId(undefined);
        setOpenProjectName(UNSAVED_TEXT);
        setQueryString(UNSAVED_TEXT + TITLE_SUFFIX, "");
        if (runnerRef.current?.resetState === undefined)
            throw new Error("runnerResetConsoleState is undefined");
        runnerRef.current.resetState();
        resetPlotState();
        loadXml(DefaultWorkspaceXML);
    }

    function home() {
        if (user) {
            // TODO
            // Save work
            router.push("/");
        } else {
            setNoAccountIsOpen(true);
        }
    }

    function onTitleChange(newVal: string) {
        setOpenProjectName(newVal);
        if (
            openProjectId &&
            newVal !== openProjectName &&
            user &&
            getProjectDetailsData.data?.project?.userId === user?.uid
        ) {
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
                projectId={openProjectId}
                onSave={save}
                onNew={newEmptyProject}
                onHome={home}
                onTitleChange={onTitleChange}
            >
                <div className={styles.gridContainer}>
                    <div className={styles.toolsColumn}>
                        <TopView />
                        <div className={styles.runnerWrapper}>
                            <Runner ref={runnerRef} getCode={() => getCode()} />
                        </div>
                    </div>
                    <Paper className={styles.editorColumn}>
                        <CodeEditor className={styles.codeEditor} />
                    </Paper>
                </div>
                <NoAccountDialog
                    isOpen={noAccountIsOpen}
                    setIsOpen={setNoAccountIsOpen}
                />
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
                        Save failed
                        {saveErrorMessage ? ": " + saveErrorMessage : ""}
                    </Alert>
                </Snackbar>
            </PageLayout>
        </>
    );
}
