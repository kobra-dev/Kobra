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
        <Dialog open={props.isOpen} fullWidth maxWidth="sm">
            <DialogTitle>Welcome to Kobra Studio</DialogTitle>
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
