import { Button } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/auth/LoginDialog";
import firebase from "../utils/firebase";

export default function FirebaseTest() {
    const [user, loading, error] = useAuthState(firebase.auth());
    console.table({ user, loading, error });

    return (
        <div>
            <h1>Firebase test</h1>
            <div>{JSON.stringify(user)}</div>
            <div>{JSON.stringify(loading)}</div>
            <div>{JSON.stringify(error)}</div>
            <Button onClick={() => firebase.auth().signInWithPopup(new firebase.auth.EmailAuthProvider())}>Sign in</Button>
            <Login/>
        </div>
    )
}