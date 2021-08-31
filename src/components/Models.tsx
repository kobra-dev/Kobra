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
                                            onClick={handleClickOpen}
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
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email
                        address here. We will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
