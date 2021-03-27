<<<<<<< HEAD
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { login, logout, useUser } from '../utils/user';
import fetch from 'isomorphic-unfetch';
=======
import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase, { useUsername } from '../utils/firebase';
import { useLogin } from "./auth/LoginDialogProvider";
>>>>>>> 9c88e3f58f29f31860299496d233948a8674dc0b

const useStyles = makeStyles((theme) => ({
  loggedIn: {
    '& p': {
      verticalAlign: 'middle',
      display: 'inline-block'
    }
<<<<<<< HEAD
  },
  userStatus: {
    marginLeft: 'auto'
  }
}));

export default function UserStatus() {
  const styles = useStyles();
  const { user } = useUser();

  return (
    <div className={styles.userStatus}>
      {user !== null ? (
        <div className={styles.loggedIn}>
          <Typography>Hello, {user.nickname}!</Typography>
          <Button
            color="inherit"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </Button>
=======
}));

export default function UserStatus() {
    const styles = useStyles();
    const [user] = useAuthState(firebase.auth());
    const login = useLogin();
    const [, username] = useUsername();

    return (
        <div className={styles.userStatus}>
            { user ? (
                <div className={styles.loggedIn}>
                    <Typography>Hello{username && `, ${username}`}!</Typography>
                    <Button color="inherit" onClick={ () => { firebase.auth().signOut(); } }>Log out</Button>
                </div>
            ) : (<Button color="inherit" onClick={login}>Log in</Button>) }
>>>>>>> 9c88e3f58f29f31860299496d233948a8674dc0b
        </div>
      ) : (
        <Button
          color="inherit"
          onClick={() => {
            login();
          }}
        >
          Log in
        </Button>
      )}
    </div>
  );
}
