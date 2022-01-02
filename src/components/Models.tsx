import {
    Button,
    Typography,
    List,
    ListItem,
    Dialog,
    DialogContentText,
    DialogContent,
    TextField,
    DialogTitle,
    Link,
    makeStyles,
    ListItemText,
    ListItemSecondaryAction,
    DialogActions,
    ListItemIcon,
    IconButton
} from "@material-ui/core";
import {
    Launch as LaunchIcon,
    Visibility,
    ContentCopy as CopyIcon,
    OpenInNewOff as OpenInNewIcon,
    ArrowRight as ToggleButtonIcon
} from "@material-ui/icons";
import { useAddModelMutation } from "src/generated/queries";
import React, { useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import Blockly from "blockly";
import { useSnackbar } from "notistack";
import { Snippet } from "react-code-samples";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "0.5rem"
    },
    placeholder: {
        color: "grey",
        textAlign: "center"
    },
    listItem: {
        "&:hover": {
            backgroundColor: alpha(
                theme.palette.text.primary,
                theme.palette.action.hoverOpacity
            )
        }
    }
}));

export default function Models() {
    const styles = useStyles();

    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [modelURL, setModelURL] = useState("");

    const [codeOpen, setCodeOpen] = useState(false);

    const [addModel] = useAddModelMutation();
    const [modelSelected, setModelSelected] = useState(null);

    const snackbar = useSnackbar();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let formData = new FormData(e.target as HTMLFormElement);

        let vals = [];

        for (let [_, value] of Array.from(formData.entries())) {
            vals.push(value);
        }

        const newModelRes = await addModel({
            variables: {
                modelJson: JSON.stringify(modelSelected.model.save()),
                modelParams: JSON.stringify({
                    modelType: modelSelected.type,
                    parameters: vals.map((val) => {
                        return {
                            name: val,
                            type: "number"
                        };
                    }),
                    title: globalThis.projectTitle
                }),
                projectId: globalThis.projectId
            }
        });

        try {
            setModelURL(
                "https://apps.kobra.dev/" + newModelRes.data.addModel.id
            );

            setOpenModel(true);
        } catch {
            snackbar.enqueueSnackbar("Failed to deploy model", {
                variant: "error"
            });
        }

        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={styles.root}>
            <Alert severity="info">
                <AlertTitle>Kobra Apps (beta)</AlertTitle>
                Apps is a way to deploy models you create in Kobra to the web as
                a shareable form. Learn more <Link href="TODO">here</Link>.
            </Alert>
            {(globalThis.modelsDb ?? []).length > 0 ? (
                <List>
                    {globalThis.modelsDb.map((model, index) => (
                        <ListItem
                            className={styles.listItem}
                            key={index}
                            onMouseOver={() => {
                                //@ts-expect-error
                                Blockly.getMainWorkspace().highlightBlock(
                                    model.blockId
                                );
                            }}
                            onMouseOut={() => {
                                //@ts-expect-error
                                Blockly.getMainWorkspace().highlightBlock(null);
                            }}
                        >
                            <ListItemIcon>
                                <Visibility />
                            </ListItemIcon>
                            <ListItemText
                                primary={"TODO"}
                                secondary={
                                    model.type[0].toUpperCase() +
                                    model.type.slice(1)
                                }
                            />
                            <ListItemSecondaryAction>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    startIcon={<LaunchIcon />}
                                    onClick={() => {
                                        setModelSelected(model);
                                        handleClickOpen();
                                    }}
                                >
                                    Deploy
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography className={styles.placeholder}>
                    No models found; get started by creating and fitting one
                </Typography>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">Deploy 🚀</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Deploy a {modelSelected?.type} model to Kobra Apps
                        </DialogContentText>
                        {Array(
                            modelSelected == null
                                ? 0
                                : modelSelected.model.length
                        )
                            .fill(0)
                            .map((_, index) => {
                                const name =
                                    "Parameter " + (index + 1) + " Name";
                                return (
                                    <TextField
                                        variant="outlined"
                                        key={index}
                                        margin="dense"
                                        name={name}
                                        label={name}
                                        type="text"
                                        fullWidth
                                    />
                                );
                            })}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Deploy
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Dialog
                open={openModel}
                onClose={() => {
                    setOpenModel(false);
                }}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Deployed 🚀</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your model has been deployed to Kobra Apps.
                    </DialogContentText>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        name="modelURL"
                        label="Model URL"
                        value={modelURL}
                        style={{ width: "80%" }}
                        onClick={() => {
                            navigator.clipboard.writeText(modelURL);

                            snackbar.enqueueSnackbar("Copied to clipboard", {
                                variant: "success"
                            });
                        }}
                    />
                    <CopyIcon
                        style={{
                            cursor: "pointer",
                            height: "2.0em",
                            marginLeft: "10px"
                        }}
                        onClick={() => {
                            navigator.clipboard.writeText(modelURL);

                            snackbar.enqueueSnackbar("Copied to clipboard", {
                                variant: "success"
                            });
                        }}
                    />
                    <OpenInNewIcon
                        style={{
                            cursor: "pointer",
                            height: "2.0em",
                            marginLeft: "5px"
                        }}
                        onClick={() => {
                            window.open(modelURL, "_blank");
                        }}
                    />
                    <Typography>API Docs:</Typography>
                    <IconButton
                        onClick={(e) => {
                            setCodeOpen(!codeOpen);
                        }}
                    >
                        <ToggleButtonIcon fontSize="inherit" />
                    </IconButton>
                    {codeOpen && (
                        <Snippet code={generateCode(modelURL.substring(24))} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

function generateCode(modelId: string) {
    return [
        {
            code: `
import axios from 'axios';

let pred = (
    fetch('https://apps.kobra.dev/api/predict${modelId}?' 
        + new URLSearchParams({
            modelType: props.modelType,
            values: vals,
            id: props.modelID 
        })
    ).json().data.pred;
)

let pred = (
    await axios.get(\`/api/predict/${modelId}\`, {
        params: {
            modelType: props.modelType,
            values: [values],
            id: ${modelId}
        }
    })
).data.pred;`,
            language: "javascript"
        }
    ];
}
