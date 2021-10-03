import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@material-ui/core";
import React from "react";
import { useLogin } from "../auth/LoginDialogProvider";

interface NoAccountDialogProps {
    isOpen: boolean;
    setIsOpen: { (_: boolean): any };
}

export default function NoAccountDialog(props: NoAccountDialogProps) {
    const login = useLogin();

    const signInButton = async () => {
        if (await login()) props.setIsOpen(false);
    };

    return (
<<<<<<< HEAD
<<<<<<< HEAD
        <Dialog open={props.isOpen} fullWidth maxWidth="sm">
            <DialogTitle>Welcome to Kobra Studio</DialogTitle>
=======
        <Dialog
            open={props.isOpen}
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle>
                Welcome to Kobra Studio
            </DialogTitle>
>>>>>>> 0f410a5 (chore: fix prettier stuffs)
=======
        <Dialog open={props.isOpen} fullWidth={true} maxWidth="sm">
            <DialogTitle>Welcome to Kobra Studio</DialogTitle>
>>>>>>> b09ee24 (chore: fix prettier stuffs)
            <DialogContent>
                <Typography variant="h5">You aren&apos;t signed in</Typography>
                <Typography>
                    Sign in with your Kobra Account to be able to save your
                    work.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={signInButton}>Sign in/register account</Button>
                <Button
                    onClick={() => {
                        props.setIsOpen(false);
                    }}
                >
                    Continue without account
                </Button>
            </DialogActions>
        </Dialog>
    );
}
