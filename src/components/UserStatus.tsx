import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import firebase, { useUsername } from "../utils/firebase";
import { useLogin } from "./auth/LoginDialogProvider";

const useStyles = makeStyles((theme) => ({
    loggedIn: {
        "& p": {
            verticalAlign: "middle",
            display: "inline-block"
        }
    },
    userStatus: {
        marginLeft: "auto"
    }
}));

export default function UserStatus() {
    const styles = useStyles();
    const [user] = useAuthState(firebase.auth());
    const login = useLogin();
    const [, username] = useUsername();

    return (
        <div className={styles.userStatus}>
            {user ? (
                <div className={styles.loggedIn}>
                    <Typography id="username">
                        Hello{username && `, ${username}`}!
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => {
                            firebase.auth().signOut();
                        }}
                    >
                        Log out
                    </Button>
                </div>
            ) : (
                <Button color="inherit" onClick={() => login()}>
                    Log in
                </Button>
            )}
        </div>
    );
}
