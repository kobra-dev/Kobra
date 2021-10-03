import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    makeStyles,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import type { Theme } from "@material-ui/core/styles/createTheme";
import { GitHub as GitHubIcon, Google as GoogleIcon } from "@material-ui/icons";
import { useMemo, useState } from "react";
import {
    GetUsernameDocument,
    GetUsernameQuery,
    GetUsernameQueryVariables,
    useSetUsernameMutation
} from "../../generated/queries";
import firebase from "../../utils/firebase";
import LabeledDivider from "../LabeledDivider";
import LoadingButton from "../LoadingButton";
import Stack from "../Stack";
import FinishSignupInputs from "./FinishSignupInputs";
import UsernameTextField, {
    UsernameTextFieldStatus
} from "./UsernameTextField";
import { setUsernameCacheUpdate } from "./utils";
import { useFinishSignup } from "./FinishSignupDialogProvider";
import { useApolloClient } from "@apollo/client";

export const successTextStyles: CSSProperties = {
    color: "green"
};

export const errorTextStyles: {
    (t: Theme): CSSProperties;
} = (theme) => ({
    color: theme.palette.error.main
});

export const CARD_DIALOG_MAX_WIDTH = "320px";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: CARD_DIALOG_MAX_WIDTH,
        overflow: "auto"
    },
    appBar: {
        borderRadius: "4px 4px 0 0"
    },
    actions: {
        justifyContent: "flex-end"
    },
    errorText: errorTextStyles(theme),
    successText: successTextStyles,
    githubButton: {
        color: theme.palette.getContrastText("#333333"),
        backgroundColor: "#333333",
        "&:hover": {
            backgroundColor: "#272727"
        }
    },
    googleButton: {
        color: theme.palette.getContrastText("#4285f4"),
        backgroundColor: "#4285f4",
        "&:hover": {
            backgroundColor: "#3372f1"
        }
    }
}));

const ERROR_MESSAGES: { [key: string]: string } = {
    "auth/invalid-email": "Please enter a valid email.",
    "auth/user-not-found": "Incorrect email or password entered.",
    "auth/wrong-password": "Password is incorrect.",
    pw: "Password confirmation does not match."
};

// Copied from https://github.com/firebase/firebase-js-sdk/blob/master/packages/auth/src/utils.js#L471
// with some slight modifications to get it to work outside of the library
// For some reason the Firebase SDK throws an error if the email address
// is invalid that I can't catch so I have to check it manually

/**
 * RegExp to detect if the email address given is valid.
 * @const {!RegExp}
 * @private
 */
const EMAIL_ADDRESS_REGEXP_ = /^[^@]+@[^@]+$/;

/**
 * Determines if it is a valid email address.
 * @param {*} email The email address.
 * @return {boolean} Whether the email address is valid.
 */
const isValidEmailAddress = (email: string) =>
    EMAIL_ADDRESS_REGEXP_.test(email);

// End copied code

export enum LoginTab {
    LOGIN = 0,
    SIGN_UP = 1
}

interface LoginProps {
    otherButtons?: React.ReactNode;
    onLogin?: { (): void };
    initialTab?: LoginTab;
}

export default function Login(props: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpUserTesting, setSignUpUserTesting] = useState(false);
    const [signUpEmailUpdates, setSignUpEmailUpdates] = useState(false);
    const [tab, setTab] = useState(props.initialTab ?? LoginTab.LOGIN);
    const [validationError, setValidationError] =
        useState<string | undefined>(undefined);
    // Firebase error
    const [fbError, setFbError] =
        useState<firebase.FirebaseError | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [iuaStatus, setIuaStatus] = useState<UsernameTextFieldStatus>(
        UsernameTextFieldStatus.Success
    );

    const [mutateSetUsername] = useSetUsernameMutation({
        variables: {
            name: signUpUsername,
            sendUserTestingEmail: signUpUserTesting,
            emailUpdates: signUpEmailUpdates
        }
    });

    const finishSignup = useFinishSignup();

    const styles = useStyles();

    const doAction = async () => {
        // Validation
        if (!isValidEmailAddress(email)) {
            setValidationError("auth/invalid-email");
            return;
        } else if (tab === LoginTab.SIGN_UP) {
            if (password !== confirmPassword) {
                setValidationError("pw");
                return;
            }
        }
        setValidationError(undefined);
        // Do action
        setLoading(true);
        try {
            if (tab === LoginTab.LOGIN)
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);
            else {
                const newUser = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password);
                await mutateSetUsername({
                    update: setUsernameCacheUpdate(newUser.user.uid)
                });
            }
            if (props.onLogin) props.onLogin();
        } catch (ex) {
            console.log(ex);
            setFbError(ex);
        } finally {
            setLoading(false);
        }
    };

    const apolloClient = useApolloClient();

    const signInWithOAuth = async (providerType: "github" | "google") => {
        setLoading(true);
        const provider = new (
            providerType === "github"
                ? firebase.auth.GithubAuthProvider
                : firebase.auth.GoogleAuthProvider
        )();
        try {
            const credential = await firebase.auth().signInWithPopup(provider);
            // Check if we need to finish signup
            const res = await apolloClient.query<
                GetUsernameQuery,
                GetUsernameQueryVariables
            >({
                query: GetUsernameDocument,
                variables: {
                    id: credential.user.uid
                }
            });
            if (
                (res.data.user?.name || (await finishSignup())) &&
                props.onLogin
            )
                props.onLogin();
        } catch (ex) {
            console.log(ex);
            setFbError(ex);
        } finally {
            setLoading(false);
        }
    };

    const currentError = useMemo(() => {
        const currentError:
            | {
                  code: string;
                  message?: string;
              }
            | firebase.FirebaseError
            | undefined =
            validationError !== undefined ? { code: validationError } : fbError;
        return currentError !== undefined
            ? ERROR_MESSAGES[currentError.code] ?? currentError.message
            : undefined;
    }, [fbError, validationError]);

    const ssoPrefix = tab === LoginTab.LOGIN ? "Log in with" : "Sign up with";

    return (
        <Card className={styles.root}>
            <AppBar position="static" className={styles.appBar}>
                <Tabs value={tab} onChange={(_, n) => setTab(n)}>
                    <Tab label="Login" />
                    <Tab label="Sign up" />
                </Tabs>
            </AppBar>
            <CardHeader
                title={`${
                    tab === LoginTab.LOGIN ? "Log in to" : "Sign up for"
                } Kobra`}
            />
            <CardContent>
                <Stack>
                    {/* SSO */}
                    <Button
                        onClick={() => signInWithOAuth("github")}
                        className={styles.githubButton}
                        startIcon={<GitHubIcon />}
                        variant="contained"
                        size="large"
                    >
                        {ssoPrefix} GitHub
                    </Button>
                    <Button
                        onClick={() => signInWithOAuth("google")}
                        className={styles.googleButton}
                        startIcon={<GoogleIcon />}
                        variant="contained"
                        size="large"
                    >
                        {ssoPrefix} Google
                    </Button>
                    <LabeledDivider>OR</LabeledDivider>
                    <TextField
                        variant="outlined"
                        type="email"
                        label="Email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    {tab === LoginTab.SIGN_UP && (
                        <UsernameTextField
                            value={signUpUsername}
                            onChange={setSignUpUsername}
                            onStatusChange={setIuaStatus}
                        />
                    )}
                    <TextField
                        variant="outlined"
                        type="password"
                        label="Password"
                        required
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    {tab === LoginTab.SIGN_UP && (
                        <>
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
                            <FinishSignupInputs
                                signUpUserTesting={signUpUserTesting}
                                setSignUpUserTesting={setSignUpUserTesting}
                                signUpEmailUpdates={signUpEmailUpdates}
                                setSignUpEmailUpdates={setSignUpEmailUpdates}
                            />
                        </>
                    )}
                    {currentError && (
                        <Typography className={styles.errorText}>
                            {currentError}
                        </Typography>
                    )}
                </Stack>
            </CardContent>
            <CardActions className={styles.actions}>
                {props.otherButtons}
                <LoadingButton
                    loading={loading}
                    color="primary"
                    variant="contained"
                    id="action"
                    disabled={
                        loading ||
                        (tab === LoginTab.SIGN_UP &&
                            (iuaStatus !== UsernameTextFieldStatus.Success ||
                                signUpUsername.length === 0 ||
                                password.length === 0 ||
                                confirmPassword.length === 0))
                    }
                    onClick={doAction}
                >
                    {tab === LoginTab.LOGIN ? "Login" : "Sign up"}
                </LoadingButton>
            </CardActions>
        </Card>
    );
}
