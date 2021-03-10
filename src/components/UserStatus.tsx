import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import fetch from 'isomorphic-unfetch';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase, { getUserDisplayName } from '../utils/firebase';

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
}))

export default function UserStatus() {
    const styles = useStyles();
    const [user] = useAuthState(firebase.auth());

    return (
        <div className={styles.userStatus}>
            { user ? (
                <div className={styles.loggedIn}>
                    <Typography>Hello, {getUserDisplayName(user)}!</Typography>
                    <Button color="inherit" onClick={ () => { firebase.auth().signOut(); } }>Log out</Button>
                </div>
            ) : (<Button color="inherit" onClick={ () => { alert("TODO"); } }>Log in</Button>) }
        </div>
    );
}