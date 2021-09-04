import {
    Button,
    Typography,
    List,
    ListItem,
    Dialog,
    DialogActions,
    DialogContentText,
    DialogContent,
    TextField,
    DialogTitle
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import { useState, Fragment } from "react";

export default function Models() {
    const [open, setOpen] = useState(false);
    const [modelSelected, setModelSelected] = useState(null);

    const [inputs, setInputs] = useState([]);

    const handleSubmit = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <div>
                <Typography variant="h4">Models</Typography>
                <List>
                    {
                        // Go through each model in globalThis.modelsDb and display it with a icon on the right that says deploy in a list with material ui
                        Object.keys(globalThis.modelsDb || []).map(
                            (modelId, index) => {
                                const model = globalThis.modelsDb[modelId];

                                return (
                                    <ListItem key={modelId}>
                                        <Typography variant="h6">
                                            Model {" " + (index + 1)}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                setModelSelected(model);
                                                setInputs(new Array(4).fill(1));
                                                handleClickOpen();
                                            }}
                                        >
                                            Deploy
                                            <LaunchIcon
                                                style={{ float: "right" }}
                                            />
                                        </Button>
                                    </ListItem>
                                );
                            }
                        )
                    }
                </List>
            </div>

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
                    <form>
                        {
                            // return X textfields where x is the number of parameters the model has

                            inputs.map((parameter, index) => {
                                return (
                                    <TextField
                                        key={index}
                                        autoFocus
                                        margin="dense"
                                        id={
                                            "Parameter " + (index + 1) + " Name"
                                        }
                                        label={
                                            "Parameter " + (index + 1) + " Name"
                                        }
                                        type="text"
                                        fullWidth
                                    />
                                );
                            })
                        }
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Deploy
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
