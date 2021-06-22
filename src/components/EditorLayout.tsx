import React, { useState } from "react";
import {
    Button,
    AppBar,
    IconButton,
    makeStyles,
    Toolbar
} from "@material-ui/core";
import {
    Brightness4,
    InsertDriveFile,
    Save,
    Share,
    Visibility
} from "@material-ui/icons";
import { useDarkTheme } from "./DarkThemeProvider";
import UserStatus from "./UserStatus";
import EditableTitle from "./EditableTitle";
import { useRouter } from "next/dist/client/router";
import { MAX_NAME_LEN } from "src/utils/constants";
import { Alert } from "@material-ui/lab";

type PageLayoutProps = {
    title: string;
    projectId: string | undefined;
    children: React.ReactNode;
    onSave: { (): void };
    onNew: { (): void };
    onHome: { (): void };
    onTitleChange: { (newVal: string): void };
};

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
    header: {
        flexGrow: 1,
        marginRight: "0.75rem",
        height: "1.25rem",
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
    }
}));

export default function PageLayout(props: PageLayoutProps): React.ReactElement {
    const styles = useStyles();
    const { toggleDark } = useDarkTheme();
    const router = useRouter();
    const [sbOpen, setSbOpen] = useState(false);

    return (
        <div className={styles.container}>
            <AppBar position="static" style={{ background: "#42ad66" }}>
                <Toolbar>
                    <div className={styles.appbarMenu}>
                        <img
                            onClick={props.onHome}
                            src="/assets/white logo.svg"
                            className={styles.header}
                            alt="logo"
                        />
                        <EditableTitle
                            value={props.title}
                            maxLength={MAX_NAME_LEN}
                            onChange={props.onTitleChange}
                            className={styles.editableTitle}
                        />
                        <Button
                            color="inherit"
                            startIcon={<Save />}
                            onClick={props.onSave}
                        >
                            Save
                        </Button>
                        <Button
                            color="inherit"
                            startIcon={<InsertDriveFile />}
                            onClick={props.onNew}
                        >
                            New
                        </Button>
                        {props.projectId && (
                            <Button
                                color="inherit"
                                startIcon={<Share />}
                                onClick={() => {
                                    if (!navigator.clipboard) {
                                        return;
                                    }
                                    navigator.clipboard.writeText(
                                        process.env.NEXT_PUBLIC_APP_HOSTED_URL +
                                            "/project/" +
                                            props.projectId
                                    );
                                    setSbOpen(true);
                                }}
                            >
                                Share
                            </Button>
                        )}
                    </div>
                    <UserStatus />
                    <IconButton color="inherit" onClick={toggleDark}>
                        <Brightness4 />
                    </IconButton>
                    {props.projectId && (
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<Visibility />}
                            onClick={() =>
                                router.push("/project/" + props.projectId)
                            }
                        >
                            View page
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            {props.children}
            <Snackbar
                open={sbOpen}
                autoHideDuration={6000}
                onClose={() => setSbOpen(false)}
            >
                <Alert onClose={() => setSbOpen(false)} severity="success">
                    URL copied to clipboard!
                </Alert>
            </Snackbar>
        </div>
    );
}
