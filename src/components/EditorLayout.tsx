import React from "react";
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Button,
    makeStyles
} from "@material-ui/core";
import {
    Apps,
    Brightness4,
    FolderOpen,
    InsertDriveFile,
    Save,
    Visibility
} from "@material-ui/icons";
import { useDarkTheme } from "./DarkThemeProvider";
import UserStatus from "./UserStatus";
import EditableTitle from "./EditableTitle";
import { useRouter } from "next/dist/client/router";
import { MAX_NAME_LEN } from "src/utils/constants";

type PageLayoutProps = {
    title: string;
    projectId: string | undefined;
    children: React.ReactNode;
    onSave: { (): void };
    onNew: { (): void };
    onHome: { (): void };
    onTitleChange: { (newVal: string): void };
};

const useStyles = makeStyles((theme) => ({
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
        flexGrow: 1
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

    return (
        <div className={styles.container}>
            <AppBar position="static" style={{ background: "#42ad66" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => {
                            props.onHome();
                        }}
                    >
                        <Apps />
                    </IconButton>
                    <div className={styles.appbarMenu}>
                        <Typography variant="h6" className={styles.header}>
                            Kobra Studio -&nbsp;
                        </Typography>
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
        </div>
    );
}
