import React, { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    TextField
} from "@material-ui/core";
import { useAddProjectMutation } from "../../generated/queries";
import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import firebase from "../../utils/firebase";

interface NewDialogProps {
    isSave: boolean;
    isOpen: boolean;
    onClose: {
        (
            newProjectId: string | undefined,
            newProjectTitle: string | undefined
        ): void;
    };
    prefilledTitle?: string | undefined;
    getSaveData: { (): string };
}

export default function NewDialog(props: NewDialogProps) {
    const [gqlAddProject, { data }] = useAddProjectMutation({
        update(cache, { data: mutationData }) {
            cache.modify({
                fields: {
                    projects(existingProjects = []) {
                        if (!mutationData?.addProject) return existingProjects;

                        /*const newProjectRef = cache.writeFragment({
                            data: mutationData.addProject,
                            fragment: NewProjectFragmentDoc
                        });*/
                        //return  [...existingProjects, newProjectRef];
                    }
                }
            });
        }
    });
    const [user] = useAuthState(firebase.auth());
    const [inputName, setInputName] = useState(props.prefilledTitle ?? "");
    const [inputDescription, setInputDescription] = useState("");
    const [inputPublic, setInputPublic] = useState(false);

    useEffect(() => {
        if (props.isOpen) {
            setInputName(props.prefilledTitle ?? "");
        }
    }, [props.isOpen, props.prefilledTitle]);

    async function addProject() {
        if (!user || !user.email)
            throw new Error("User or user email is undefined");
        const result = await gqlAddProject({
            variables: {
                user: user?.email,
                name: inputName,
                isPublic: inputPublic,
                description: inputDescription,
                projectJson: props.isSave ? props.getSaveData() : "{}"
            }
        });
        // TODO
        alert("TODO onclose");
        //props.onClose(result.data.addProject.id, inputName);
    }

    const closeUndefined = () => {
        props.onClose(undefined, undefined);
    };

    return (
        <Dialog open={props.isOpen} onClose={closeUndefined}>
            <DialogTitle>
                {props.isSave ? "Save project" : "New project"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    label="Name"
                    fullWidth
                    color="primary"
                    value={inputName}
                    onChange={(event) => {
                        setInputName(event.target.value);
                    }}
                />
                <TextField
                    multiline
                    label="Description"
                    fullWidth
                    rows={4}
                    onChange={(event) => {
                        setInputDescription(event.target.value);
                    }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            onChange={(event) => {
                                setInputPublic(event.target.checked);
                            }}
                        />
                    }
                    label="Make project public"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeUndefined}>Cancel</Button>
                <Button onClick={addProject}>
                    {props.isSave ? "Save" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
