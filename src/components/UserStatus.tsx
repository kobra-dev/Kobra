import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, makeStyles, Typography } from "@material-ui/core";

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
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    console.log(user);
    console.log(isAuthenticated);

    return (
        <div className={styles.userStatus}>
            { isAuthenticated ? (
                <div className={styles.loggedIn}>
                    <Typography>Hello, {user.nickname}!</Typography>
                    <Button color="inherit" onClick={ () => logout() }>Log out</Button>
                </div>
            ) : (<Button color="inherit" onClick={ () => loginWithRedirect() }>Log in</Button>) }
        </div>
    );
}