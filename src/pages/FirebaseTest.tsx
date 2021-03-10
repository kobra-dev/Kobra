import { Button, Dialog } from "@material-ui/core";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/auth/Login";
import { useLogin } from "../components/auth/LoginDialogProvider";
import firebase from "../utils/firebase";

export default function FirebaseTest() {
    const [user, loading, error] = useAuthState(firebase.auth());
    const [loginOpen, setLoginOpen] = useState(false);
    const login = useLogin();
    console.table({ user, loading, error });

    const asyncLogin = async () => {
        const result = await login();
        alert(result);
    };

    return (
        <div>
            <h1>Firebase test</h1>
            <div>{JSON.stringify(user)}</div>
            <div>{JSON.stringify(loading)}</div>
            <div>{JSON.stringify(error)}</div>
            <Button onClick={() => firebase.auth().signInWithPopup(new firebase.auth.EmailAuthProvider())}>Sign in</Button>
            <Login/>
            <Button onClick={() => setLoginOpen(!loginOpen)}>Open the login modal</Button>
            <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
                <Login otherButtons={<Button onClick={() => setLoginOpen(false)}>Close</Button>}/>
            </Dialog>
            <Button onClick={asyncLogin}>Async login</Button>
        </div>
    )
}