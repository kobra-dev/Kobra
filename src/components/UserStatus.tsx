import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { login, logout, useUser } from "../utils/user";
import fetch from 'isomorphic-unfetch';

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
    const {user} = useUser();

    return (
        <div className={styles.userStatus}>
            { user !== null ? (
                <div className={styles.loggedIn}>
                    <Typography>Hello, {user.nickname}!</Typography>
                    <Button color="inherit" onClick={ () => { logout(); } }>Log out</Button>
                </div>
            ) : (<Button color="inherit" onClick={ () => { login(); } }>Log in</Button>) }
        </div>
    );
}