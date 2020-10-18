import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@material-ui/core";
import "./UserStatus.css";

export default function UserStatus() {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    console.log(user);
    console.log(isAuthenticated);

    return (
        <div className="userstatus">
            { isAuthenticated ? (
                <div className="userstatus-loggedin">
                    <Typography>Hello, {user.nickname}!</Typography>
                    <Button color="inherit" onClick={ () => logout() }>Log out</Button>
                </div>
            ) : (<Button color="inherit" onClick={ () => loginWithRedirect() }>Log in</Button>) }
        </div>
    );
}