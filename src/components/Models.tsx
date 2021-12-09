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
    ListItemIcon
} from "@material-ui/core";
import { Launch as LaunchIcon, Visibility } from "@material-ui/icons";
import { useAddModelMutation } from "src/generated/queries";
import React, { useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import Blockly from "blockly";
import { ModelsDbEntry } from "src/utils/types";
import LoadingButton from "./LoadingButton";

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
    const [modelSelected, setModelSelected] =
        useState<ModelsDbEntry | null>(null);

    const handleClickOpen = () => {
        setOpen(true);
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
            {modelSelected && (
                <DeployDialog
                    open={open}
                    handleClose={() => setOpen(false)}
                    model={modelSelected}
                />
            )}
        </div>
    );
}

function DeployDialog({
    open,
    handleClose,
    model
}: {
    open: boolean;
    handleClose: () => void;
    model: ModelsDbEntry;
}) {
    const [addModel] = useAddModelMutation();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();

        let vals = Array.from(
            new FormData(e.target as HTMLFormElement).values()
        );

        const newModelRes = await addModel({
            variables: {
                modelJson: JSON.stringify(model.modelJson),
                modelParams: JSON.stringify({
                    modelType: model.type,
                    parameters: vals.map((val) => ({
                        name: val,
                        type: "number"
                    })),
                    title: globalThis.projectTitle
                }),
                projectId: globalThis.projectId
            }
        });

        setLoading(false);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : handleClose}
            aria-labelledby="form-dialog-title"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Deploy 🚀</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deploy a {model?.type} model to Kobra Apps
                    </DialogContentText>
                    {Array.from(
                        {
                            length: Number(
                                JSON.parse(model.modelParamsJson).length
                            )
                        },
                        (_, index) => {
                            const name = "Parameter " + (index + 1) + " Name";
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
                        }
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <LoadingButton
                        type="submit"
                        color="primary"
                        loading={loading}
                        disabled={loading}
                    >
                        Deploy
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
}
