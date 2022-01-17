import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import {
    AppBar,
    Button,
    IconButton,
    makeStyles,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {
    AccountTree,
    Brightness4,
    InsertDriveFile,
    Share,
    Visibility
} from "@material-ui/icons";
import Blockly from "blockly/core";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import AutosaverProvider, {
    AutosaverProviderRef
} from "src/components/AutosaverProvider";
import checkForErrors from "src/runner/checkForErrors";
import { MAX_NAME_LEN } from "src/utils/constants";
import DefaultWorkspaceXML from "../blocks/defaultWorkspace.xml";
import {
    useAddProjectMutation,
    useGetEditorProjectDetailsLazyQuery,
    useRenameProjectMutation,
    useSaveProjectMutation
} from "../generated/queries";
import firebase from "../utils/firebase";
import { useLogin } from "./auth/LoginDialogProvider";
import AutosaveIndicator from "./AutosaveIndicator";
import CodeEditor, { getCode, getXml, loadXml } from "./CodeEditor";
import { useDarkTheme } from "./DarkThemeProvider";
import {
    editState as editPlotState,
    getState as getPlotState,
    IPlotState,
    resetState as resetPlotState
} from "./DataView";
import NoAccountDialog from "./dialogs/NoAccountDialog";
import EditableTitle from "./EditableTitle";
import ErrorIndicator from "./ErrorIndicator";
import Loader from "./Loader";
import LoadingButton from "./LoadingButton";
import { ConsoleLine } from "./NewConsole";
import ContentPageLayout from "./PageLayout";
import Runner, { RunnerRef } from "./Runner";
import Stack from "./Stack";
import { TopView } from "./TopView";
import UserStatus from "./UserStatus";

interface SaveData {
    blocklyXml: string;
    plotState: IPlotState;
    consoleState: ConsoleLine[];
}

const UNSAVED_TEXT = "Unsaved project";
const TITLE_SUFFIX = " | Kobra Studio";

const useStyles = makeStyles(() => ({
    appbarMenu: {
        "& > *": {
            verticalAlign: "middle",
            display: "inline-block"
        },
        "& > *:nth-child(2)": {
            marginRight: "0.75rem"
        },
        "& .MuiButton-label": {
            display: "flex"
        }
    },
    autosaveIndicator: {
        marginLeft: "0.75rem"
    },
    header: {
        flexGrow: 1,
        marginRight: "0.75rem",
        height: "1.25rem!important",
        cursor: "pointer"
    },
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    editableTitle: {
        "& .MuiInputBase-input": {
            color: "white"
        }
    },
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
    const { enqueueSnackbar } = useSnackbar();
    const { toggleDark } = useDarkTheme();

    const [gqlAddProject] = useAddProjectMutation();
    const [gqlSaveProject] = useSaveProjectMutation();
    const [gqlRenameProject] = useRenameProjectMutation();

    const [getProjectDetails, getProjectDetailsData] =
        useGetEditorProjectDetailsLazyQuery();

    const [user] = useAuthState(firebase.auth());
    const login = useLogin();

    const [noAccountIsOpen, setNoAccountIsOpen] = useState(!user);

    const [openProjectName, setOpenProjectName] = useState(UNSAVED_TEXT);
    const runnerRef = useRef<RunnerRef>(null);

    const autosaverRef = useRef<AutosaverProviderRef>(null);
    const [forkLoading, setForkLoading] = useState(false);

    const [openProjectId, setOpenProjectId] = useState<string | undefined>(
        () => {
            const id = new URLSearchParams(window.location.search).get("id");
            globalThis.projectId = id;
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
        (async () => {
            const proj = getProjectDetailsData.data?.project;
            if (!proj) return;
            await autosaverRef.current.finishSave();
            autosaverRef.current.reset();
            setOpenProjectName(proj.name);
            globalThis.projectTitle = proj.name;
            if (proj.projectJson) {
                loadSave(proj.projectJson /*, proj.modelsDb*/);
                checkForErrors();
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getProjectDetailsData.data?.project.id]);

    useEffect(() => {
        window.addEventListener("kobranewproject", newEmptyProject);
        return () =>
            window.removeEventListener("kobranewproject", newEmptyProject);
    }, []);

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
                    <Typography variant="h2" color="textPrimary">
                        Sorry, there was an error
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                        We couldn&apos;t find that project
                    </Typography>
                    <Typography variant="body2" color="textPrimary">
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

    const canFork =
        // Make sure both exist
        openProjectId &&
        getProjectDetailsData.data?.project &&
        // The project hasn't already been forked
        openProjectId === getProjectDetailsData.data.project.id &&
        // The open project isn't the current user's
        user?.uid !== getProjectDetailsData.data.project.userId;

    // Create a new project or fork the current one
    async function create() {
        if (!user && !(await login())) {
            return;
        }

        if (canFork) setForkLoading(true);

        // If the user just logged in the hook hasn't updated yet
        const currentUser = user ?? firebase.auth().currentUser;

        if (!currentUser)
            throw new Error("User is undefined when trying to save");

        const newData = await gqlAddProject({
            variables: {
                name: openProjectName,
                isPublic: false,
                projectJson: getSaveData(),
                //modelsDb: JSON.stringify(globalThis.modelsDb),
                ...(canFork
                    ? {
                          description:
                              getProjectDetailsData.data?.project?.description,
                          summary: getProjectDetailsData.data?.project?.summary,
                          parentId: openProjectId
                      }
                    : undefined)
            }
        });
        if (newData.errors || !newData.data) {
            enqueueSnackbar(
                "Save failed" + newData?.errors?.[0].message
                    ? `: ${newData.errors[0].message}`
                    : "",
                {
                    variant: "error"
                }
            );
        } else {
            const id = newData.data.addProject.id;
            setOpenProjectId(id);
            setQueryString(openProjectId + TITLE_SUFFIX, "?id=" + id);
            if (canFork)
                enqueueSnackbar("Fork successful!", { variant: "success" });
        }

        if (canFork) {
            setForkLoading(false);
            autosaverRef.current.fakeSave();
        }
        return !(newData.errors || !newData.data);
    }

    // The function called by the autosaver provider
    // It will only ever be called if the project exists in the DB so no need to worry about forking or creating a project
    async function autosave(): Promise<boolean> {
        if (!user || canFork) return false;

        if (!openProjectId) {
            return await create();
        } else {
            const saveData = await gqlSaveProject({
                variables: {
                    id: openProjectId,
                    projectJson: getSaveData()
                    //modelsDb: JSON.stringify(globalThis.modelsDb)
                }
            });
            if (saveData.errors || !saveData.data) {
                enqueueSnackbar(
                    "Save failed" + saveData?.errors?.[0].message
                        ? `: ${saveData.errors[0].message}`
                        : "",
                    {
                        variant: "error"
                    }
                );
                return false;
            } else {
                return true;
            }
        }
    }

    function loadSave(
        saveDataStr: string /*, modelsDbStr: string | undefined*/
    ) {
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
        //globalThis.modelsDb = modelsDbStr ? JSON.parse(modelsDbStr) : [];
    }

    async function newEmptyProject() {
        await autosaverRef.current.finishSave();
        autosaverRef.current.reset();
        setOpenProjectId(undefined);
        setOpenProjectName(UNSAVED_TEXT);
        globalThis.projectTitle = UNSAVED_TEXT;
        setQueryString(UNSAVED_TEXT + TITLE_SUFFIX, "");
        if (runnerRef.current?.resetState === undefined)
            throw new Error("runnerResetConsoleState is undefined");
        runnerRef.current.resetState();
        resetPlotState();
        loadXml(DefaultWorkspaceXML);
        globalThis.modelsDb = [];
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
        globalThis.projectTitle = newVal;
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
            <AutosaverProvider
                ref={autosaverRef}
                saveFn={autosave}
                canSave={!canFork}
            >
                <div className={styles.container}>
                    <AppBar position="static">
                        <Toolbar>
                            <div className={styles.appbarMenu}>
                                <Image
                                    onClick={home}
                                    src="/assets/white logo.svg"
                                    className={styles.header}
                                    width={100}
                                    height={20}
                                    alt="logo"
                                />
                                <EditableTitle
                                    value={openProjectName}
                                    maxLength={MAX_NAME_LEN}
                                    onChange={onTitleChange}
                                    className={styles.editableTitle}
                                />
                                <Button
                                    color="inherit"
                                    startIcon={<InsertDriveFile />}
                                    onClick={newEmptyProject}
                                >
                                    New
                                </Button>
                                {openProjectId && (
                                    <Button
                                        color="inherit"
                                        startIcon={<Share />}
                                        onClick={() => {
                                            if (!navigator.clipboard) {
                                                return;
                                            }
                                            navigator.clipboard.writeText(
                                                process.env
                                                    .NEXT_PUBLIC_APP_HOSTED_URL +
                                                    "/project/" +
                                                    openProjectId
                                            );
                                            enqueueSnackbar(
                                                "URL copied to clipboard!",
                                                { variant: "success" }
                                            );
                                        }}
                                    >
                                        Share
                                    </Button>
                                )}
                                {canFork && (
                                    <LoadingButton
                                        color="inherit"
                                        startIcon={<AccountTree />}
                                        onClick={create}
                                        loading={forkLoading}
                                        disabled={forkLoading}
                                        loaderColor="inherit"
                                    >
                                        Fork
                                    </LoadingButton>
                                )}
                                <AutosaveIndicator
                                    className={styles.autosaveIndicator}
                                />
                            </div>
                            <UserStatus />
                            <IconButton color="inherit" onClick={toggleDark}>
                                <Brightness4 />
                            </IconButton>
                            {openProjectId && (
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    startIcon={<Visibility />}
                                    onClick={() =>
                                        router.push("/project/" + openProjectId)
                                    }
                                >
                                    View page
                                </Button>
                            )}
                        </Toolbar>
                    </AppBar>
                    <div className={styles.gridContainer}>
                        <div className={styles.toolsColumn}>
                            <TopView />
                            <div className={styles.runnerWrapper}>
                                <Runner
                                    ref={runnerRef}
                                    getCode={() => getCode()}
                                />
                            </div>
                        </div>
                        <Paper className={styles.editorColumn}>
                            <ErrorIndicator />
                            <CodeEditor
                                className={styles.codeEditor}
                                onChange={(event) => {
                                    // For some reason some block move events aren't counted as a change
                                    if (
                                        event.type ===
                                            Blockly.Events.BLOCK_CHANGE ||
                                        (event.type ===
                                            Blockly.Events.BLOCK_MOVE &&
                                            !(
                                                // When a workspace is loaded Blockly creates this move event for some reason. This is the best way to tell it apart from an actual move event
                                                (
                                                    event.oldCoordinate?.x ===
                                                        0 &&
                                                    event.oldCoordinate?.y === 0
                                                )
                                            ))
                                    ) {
                                        autosaverRef.current.save();
                                        checkForErrors();
                                    }
                                }}
                            />
                        </Paper>
                    </div>
                    <NoAccountDialog
                        isOpen={noAccountIsOpen}
                        setIsOpen={setNoAccountIsOpen}
                    />
                </div>
            </AutosaverProvider>
        </>
    );
}
