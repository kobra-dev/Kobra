import firebase from "../../utils/firebase";
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import {
    AppBar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    makeStyles,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@material-ui/core";
import Stack from "../Stack";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "30rem"
    },
    appBar: {
        borderRadius: "4px 4px 0 0"
    },
    wrapper: {
        margin: theme.spacing(1),
        position: "relative"
    },
    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    },
    actions: {
        justifyContent: "right"
    },
    errorText: {
        color: theme.palette.error.main
    }
}));

const ERROR_MESSAGES = {
    "auth/invalid-email": "Please enter a valid email.",
    "auth/user-not-found": "Incorrect email or password entered."
};

export default function LoginDialog() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [tab, setTab] = useState(0);
    const [signIn, user, loading, error] = useSignInWithEmailAndPassword(firebase.auth());
    const [createUser, _, createLoading, createError] = useCreateUserWithEmailAndPassword(firebase.auth());
    
    const styles = useStyles();
    
    const doAction = () => {
        if(tab === 0) {
            try {
                signIn(email, password);
            }
            catch(e) {
                // Exception gets caught in error
                // TODO: this doesn't work
            }
        }
    };

    const currentError = tab === 0 ? error : createError;

    return (
        <Card className={styles.root}>
            <AppBar position="static" className={styles.appBar}>
                <Tabs value={tab} onChange={(_, n) => setTab(n)}>
                    <Tab label="Login"/>
                    <Tab label="Sign up"/>
                </Tabs>
            </AppBar>
            <CardHeader title={`${tab === 0 ? "Log in to" : "Sign up for"} Kobra`}/>
            <CardContent>
                <Stack>
                    <TextField
                        variant="outlined"
                        type="email"
                        label="Email"
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        type="password"
                        label="Password"
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    {tab === 1 && (
                        <TextField
                            variant="outlined"
                            type="password"
                            label="Confirm password"
                            required
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                    )}
                    {currentError && (
                        <Typography className={styles.errorText}>{ERROR_MESSAGES[currentError.code] ?? currentError.message}</Typography>
                    )}
                </Stack>
            </CardContent>
            <CardActions className={styles.actions}>
                <div className={styles.wrapper}>
                    <Button color="primary" variant="contained" disabled={loading || createLoading} onClick={doAction}>{tab === 0 ? "Login" : "Sign up"}</Button>
                    {(loading || createLoading) && <CircularProgress size={24} className={styles.buttonProgress}/>}
                </div>
            </CardActions>
        </Card>
    );
}
