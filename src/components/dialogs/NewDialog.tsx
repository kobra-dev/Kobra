import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from '@material-ui/core';
import { useMutation, gql } from '@apollo/client';
import { useUser } from '../../utils/user';
import { NewProjectFragmentDoc, useAddProjectMutation } from '../../generated/queries';

interface NewDialogProps {
    isSave: boolean
    isOpen: boolean
    onClose: { ( newProjectId: string | undefined, newProjectTitle: string | undefined ): void },
    prefilledTitle?: string | undefined,
    getSaveData: {(): string}
}

export default function NewDialog(props: NewDialogProps) {
    const [gqlAddProject, { data }] = useAddProjectMutation({
        update(cache, { data: { addProject }}) {
            cache.modify({
                fields: {
                    projects(existingProjects = []) {
                        const newProjectRef = cache.writeFragment({
                            data: addProject,
                            fragment: NewProjectFragmentDoc
                        });
                        return  [...existingProjects, newProjectRef];
                    }
                }
            });
        }
    });
    const { user } = useUser();
    const [inputName, setInputName] = useState(props.prefilledTitle ?? "");
    const [inputDescription, setInputDescription] = useState("");
    const [inputPublic, setInputPublic] = useState(false);

    useEffect(() => {
        if(props.isOpen) {
            setInputName(props.prefilledTitle ?? "");
        }
    }, [props.isOpen, props.prefilledTitle]);

    async function addProject() {
        const result = await gqlAddProject({
          variables: {
            user: user.name,
            name: inputName,
            isPublic: inputPublic,
            description: inputDescription,
            projectJson: props.isSave ? props.getSaveData() : '{}'
          }
        });
        props.onClose(result.data.addProject.id, inputName);
    }

    const closeUndefined = () => { props.onClose(undefined, undefined); };

    return (
      <Dialog open={props.isOpen} onClose={closeUndefined}>
        <DialogTitle>{ props.isSave ? "Save project" : "New project" }</DialogTitle>
        <DialogContent>
            <TextField autoFocus label="Name" fullWidth color="primary" value={inputName} onChange={ event => { setInputName(event.target.value); } } />
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