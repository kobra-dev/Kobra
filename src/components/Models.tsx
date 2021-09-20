import {
    Button,
    Typography,
    List,
    ListItem,
    Dialog,
    DialogContentText,
    DialogContent,
    TextField,
    DialogTitle
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import { useAddModelMutation } from "src/generated/queries";
import React, { useState } from "react";

export default function Models() {
    const [open, setOpen] = useState(false);
    const [modelSelected, setModelSelected] = useState(null);

    const [addModel] = useAddModelMutation();

    const [inputs, setInputs] = useState([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let formData = new FormData(e.target as HTMLFormElement);

        let vals = [];

        for (let [_key, value] of Array.from(formData.entries())) {
            console.log(_key, value);
            vals.push(value);
        }

        setInputs(vals);

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
        <React.Fragment>
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
                    <form onSubmit={handleSubmit}>
                        {inputs.map((_, index) => {
                            return (
                                <React.Fragment key={index}>
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
                                </React.Fragment>
                            );
                        })}{" "}
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Deploy
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
