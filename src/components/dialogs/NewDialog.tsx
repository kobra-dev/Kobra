import React, { useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from '@material-ui/core';
import { useMutation, gql } from '@apollo/client';

interface NewDialogProps {
    isSave: boolean
    isOpen: boolean
    onClose: { ( newProjectId: number | undefined ): void }
}

const ADD_PROJECT = gql`
mutation AddProject($user: String!, $name: String!, $isPublic: Boolean!, $description: String, $projectJson: String) {
    addProject(user: $user, name: $name, isPublic: $isPublic, description: $description, projectJson: $projectJson) {
        id
    }
}
`;

export default function NewDialog(props: NewDialogProps) {
    const [gqlAddProject, { data }] = useMutation(ADD_PROJECT, {
        update(cache, { data: { addProject }}) {
            cache.modify({
                fields: {
                    projects(existingProjects = []) {
                        const newProjectRef = cache.writeFragment({
                            data: addProject,
                            fragment: gql`
                                fragment NewProject on Project {
                                    id
                                    user
                                    name
                                    description
                                    projectJson,
                                    isPublic
                                }
                            `
                        });
                        return  [...existingProjects, newProjectRef];
                    }
                }
            });
        }
    });
    const [inputName, setInputName] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputPublic, setInputPublic] = useState(false);

    async function addProject() {
        const result = await gqlAddProject({ variables: { user: "test user", name: inputName, isPublic: inputPublic, description: inputDescription, projectJson: "TODO" } });
        props.onClose(result.data.id);
    }

    const closeUndefined = () => { props.onClose(undefined); };

    return (
      <Dialog open={props.isOpen} onClose={closeUndefined}>
        <DialogTitle>{ props.isSave ? "Save project" : "New project" }</DialogTitle>
        <DialogContent>
            <TextField autoFocus label="Name" fullWidth color="primary" onChange={ event => { setInputName(event.target.value); } } />
            <TextField multiline label="Description" fullWidth rows={4} onChange={ event => { setInputDescription(event.target.value); } } />
            <FormControlLabel control={ <Checkbox color="primary" onChange={ event => { setInputPublic(event.target.checked); } } /> } label="Make project public" />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUndefined}>Cancel</Button>
          <Button onClick={addProject}>{ props.isSave ? "Save" : "Create" }</Button>
        </DialogActions>
      </Dialog>
    );
}