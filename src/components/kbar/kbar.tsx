import {
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Paper,
    TextField,
    Theme
} from "@material-ui/core";
import {
    KBarAnimator,
    KBarResults,
    ActionImpl,
    useKBar,
    KBarSearch,
    useMatches
} from "kbar";
import { KBarProvider } from "./KBarContextProvider_patched";
import React, { useEffect, useImperativeHandle } from "react";
import MuiModalPortal from "./MuiModalPortal";

export default function KBar({ children }) {
    return (
        <KBarProvider actions={actions}>
            <MuiModalPortal>
                <KBarAnimator>
                    <KBarInner />
                </KBarAnimator>
            </MuiModalPortal>
            {children}
        </KBarProvider>
    );
}

const useStyles = makeStyles<
    Theme,
    {
        zeroResults: boolean;
    }
>((theme) => ({
    root: ({ zeroResults }) => ({
        ...(zeroResults
            ? {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0
              }
            : {})
    }),
    input: {
        width: "475px",
        maxWidth: "calc(100vw - 4rem)"
    }
}));

function KBarInner() {
    const { results } = useMatches();
    const styles = useStyles({ zeroResults: results.length === 0 });

    return (
        <Paper elevation={10} className={styles.root}>
            <TextField
                className={styles.input}
                variant="filled"
                label="Search commands"
                InputProps={{
                    inputComponent: CustomInput,
                    inputProps: {
                        component: KBarSearch
                    }
                }}
            />
            <RenderResults />
        </Paper>
    );
}

// This thing allows us to use the KBarSearch component inside the MUI TextField
function CustomInput(props: any) {
    const { component: Component, inputRef, onChange, ...other } = props;

    const { searchQuery } = useKBar((state) => ({
        searchQuery: state.searchQuery
    }));

    useEffect(() => {
        // Mock the onChange event for MUI
        onChange({ target: { value: searchQuery } });
    }, [searchQuery, onChange]);

    useImperativeHandle(inputRef, () => ({
        focus: () => {}
    }));

    return <Component {...other} />;
}

const useStylesRenderResults = makeStyles((theme) => ({
    key: {
        "& span": {
            paddingLeft: "6px",
            paddingRight: "6px",
            textTransform: "uppercase",
            fontFamily: "Roboto Mono, monospace",
            fontWeight: "bold"
        },
        borderRadius: "8px"
    },
    secondaryAction: {
        pointerEvents: "none",
        "& *:not(:last-child)": {
            marginRight: theme.spacing(1)
        }
    }
}));

function RenderResults() {
    const { results } = useMatches();
    const styles = useStylesRenderResults();

    if (results.length === 0) {
        return null;
    }

    return (
        <List component="nav" dense>
            <KBarResults
                items={results}
                onRender={({
                    item,
                    active
                }: {
                    item: ActionImpl;
                    active: boolean;
                }) => (
                    <ListItem button selected={active}>
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        <ListItemText
                            primary={item.name}
                            secondary={item.keywords}
                            primaryTypographyProps={{
                                variant: "body1"
                            }}
                        />
                        <ListItemSecondaryAction
                            className={styles.secondaryAction}
                        >
                            {item.shortcut.map((shortcut, index) => (
                                <Chip
                                    className={styles.key}
                                    variant="outlined"
                                    label={shortcut}
                                    key={index}
                                />
                            ))}
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            />
        </List>
    );
}

const actions = [
    {
        id: "new-project",
        name: "Create New Project",
        shortcut: ["g", "n"],
        keywords: "Create new project in Kobra Studio",
        perform: () => (window.location.pathname = "editor")
    },
    {
        id: "dashboard",
        name: "Dashboard",
        shortcut: ["g", "h"],
        keywords: "Go to your dashboard",
        perform: () => (window.location.pathname = "")
    },
    {
        id: "explore",
        name: "Explore",
        shortcut: ["g", "e"],
        keywords: "Explore Kobra projects made by other users :)",
        perform: () => (window.location.pathname = "explore")
    },
    {
        id: "docs",
        name: "Documentation",
        shortcut: ["g", "d"],
        keywords: "Go to Kobra's documentation",
        perform: () => (window.location.href = "https://docs.kobra.dev/")
    },
    {
        id: "blog",
        name: "Blog",
        shortcut: ["g", "b"],
        keywords: "Go to Kobra's blog",
        perform: () => (window.location.href = "https://blog.kobra.dev/")
    },
    {
        id: "github",
        name: "GitHub",
        shortcut: ["g", "h"],
        keywords: "Go to Kobra's GitHub",
        perform: () =>
            (window.location.href = "https://github.com/kobra-dev/kobra")
    }
];
