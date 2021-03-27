import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    makeStyles
} from "@material-ui/core";
import { Edit, Save } from "@material-ui/icons";
import { useState } from "react";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import SimpleMDEEditor from "react-simplemde-editor";
import { useDarkTheme } from "../DarkThemeProvider";
import "easymde/dist/easymde.min.css";

interface DescriptionProps {
    canEdit: boolean;
    description: string;
    onSave(value: string): void;
}

// Taken from https://github.com/Merlin04/multipad/blob/main/src/modules/MarkdownModule.tsx#L11
const useStyles = makeStyles((theme) => ({
    editor: {
        marginTop: "3px",
        height: "100%",
        overflowY: "auto",
        "& .EasyMDEContainer": {
            height: "100%"
        },
        "& .CodeMirror": {
            height: "100%",
            borderRadius: 0
        },
        "& .editor-toolbar": {
            border: 0
        }
    },
    editorDark: {
        "& .CodeMirror": {
            color: theme.palette.common.white,
            borderColor: theme.palette.background.default,
            backgroundColor: "inherit"
        },
        "& .cm-s-easymde .CodeMirror-cursor": {
            borderColor: theme.palette.text.primary
        },
        "& .editor-toolbar > *": {
            color: theme.palette.common.white
        },
        "& .editor-toolbar > .active, .editor-toolbar > button:hover, .editor-preview pre, .cm-s-easymde .cm-comment": {
            backgroundColor: theme.palette.background.default
        },
        "& .editor-preview": {
            backgroundColor: theme.palette.background.default
        },
        "& .editor-preview-side": {
            borderColor: theme.palette.background.default
        }
    },
    cardHeader: {
        paddingBottom: 0
    },
    cardContent: {
        paddingTop: 0,
        paddingBottom: "0 !important"
    }
}));

const MarkdownRenderer = (props: { text: string }) => (
    <ReactMarkdown plugins={[gfm]}>
        {props.text}
    </ReactMarkdown>
);

export default function Description(props: DescriptionProps) {
    const [editing, setEditing] = useState(false);
    const [editorContents, setEditorContents] = useState(props.description);
    const { isDark } = useDarkTheme();
    const styles = useStyles();

    function actionButton() {
        if (editing) {
            props.onSave(editorContents);
        } else {
            setEditorContents(props.description);
        }
        setEditing(!editing);
    }

    return (
        <Card variant="outlined">
            <CardHeader
                className={styles.cardHeader}
                title="Description"
                action={
                    props.canEdit && (
                        <IconButton onClick={actionButton}>
                            {editing ? <Save /> : <Edit />}
                        </IconButton>
                    )
                }
            />
            <CardContent className={styles.cardContent}>
                {editing ? (
                    <SimpleMDEEditor
                        className={
                            styles.editor +
                            (isDark ? " " + styles.editorDark : "")
                        }
                        value={editorContents}
                        onChange={setEditorContents}
                        options={{
                            previewRender: (text: string) => ReactDOMServer.renderToString(
                                <MarkdownRenderer text={text}/>
                            ),
                            sideBySideFullscreen: false,
                            hideIcons: [
                                "fullscreen"
                            ],
                            spellChecker: false
                        }}
                    />
                ) : (
                    <MarkdownRenderer text={props.description}/>
                )}
            </CardContent>
        </Card>
    );
}
