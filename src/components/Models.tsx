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
    ListItemSecondaryAction
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import { useAddModelMutation } from "src/generated/queries";
import React, { useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "0.5rem"
    },
    placeholder: {
        color: "grey",
        textAlign: "center"
    }
}));

export default function Models() {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [modelSelected, setModelSelected] = useState(null);

    const [addModel] = useAddModelMutation();

    const [inputs, setInputs] = useState([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let formData = new FormData(e.target as HTMLFormElement);

        console.log(e.target);

        let vals = [];

        for (let [key, value] of Array.from(formData.entries())) {
            console.log(key, value);
            vals.push(value);
        }

        setInputs(vals);
        console.log(vals);

        const newModelRes = await addModel({
            variables: {
                modelJson: "test",
                modelParams: "test",
                projectId: "stUrrBzaXccVdT9B4M9DQ"
            }
        });

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
                        <ListItem key={index}>
                            <ListItemText
                                primary={"TODO"}
                                secondary="Model type TODO"
                            />
                            <ListItemSecondaryAction>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    startIcon={<LaunchIcon />}
                                    onClick={() => {
                                        // TODO: what does this line do
                                        setModelSelected(model);
                                        setInputs(new Array(4).fill(1));
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
                <DialogTitle id="form-dialog-title">Deploy 🚀</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deploy a {"KNN"} model to Kobra Apps
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        {inputs.map((_, index) => {
                            return (
                                <TextField
                                    key={index}
                                    autoFocus
                                    margin="dense"
                                    name={"Parameter " + (index + 1) + " Name"}
                                    label={"Parameter " + (index + 1) + " Name"}
                                    type="text"
                                    fullWidth
                                />
                            );
                        })}
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Deploy
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
