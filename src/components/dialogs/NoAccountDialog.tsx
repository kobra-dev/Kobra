import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { login } from '../../utils/user';

interface NoAccountDialogProps {
    isOpen: boolean,
    setIsOpen: {(_: boolean): any }
}

export default function NoAccountDialog(props: NoAccountDialogProps) {
    return (
        <Dialog open={props.isOpen} fullWidth={true} maxWidth="sm">
            <DialogTitle>Welcome to Kobra Studio</DialogTitle>
            <DialogContent>
                <Typography variant="h5">You aren't signed in</Typography>
                <Typography>Sign in with your Kobra Account to be able to save your work.</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={ () => { login(); } }>Sign in/register account</Button>
                <Button onClick={ () => { props.setIsOpen(false); } }>Continue without account</Button>
            </DialogActions>
        </Dialog>
    );
}