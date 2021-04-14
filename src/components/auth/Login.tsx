import firebase from "../../utils/firebase";
import { useEffect, useMemo, useState } from "react";
import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    makeStyles,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@material-ui/core";
import Stack from "../Stack";
import {
    GetUsernameDocument,
    useIsUsernameAvailableLazyQuery,
    useSetUsernameMutation
} from "../../generated/queries";
import { MAX_USERNAME_LEN } from "src/utils/constants";
import LoadingButton from "../LoadingButton";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "30rem"
    },
    appBar: {
        borderRadius: "4px 4px 0 0"
    },
    actions: {
        justifyContent: "flex-end"
    },
    errorText: {
        color: theme.palette.error.main
    },
    successText: {
        color: "green"
    }
}));

const ERROR_MESSAGES: { [key: string]: string } = {
    "auth/invalid-email": "Please enter a valid email.",
    "auth/user-not-found": "Incorrect email or password entered.",
    "auth/wrong-password": "Password is incorrect.",
    pw: "Password confirmation does not match.",
    u: `Username must be ${MAX_USERNAME_LEN} characters or less.`
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

interface LoginProps {
    otherButtons?: React.ReactNode;
    onLogin?: { (): void };
}

export default function Login(props: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUpUsername, setSignUpUsername] = useState("");
    const [tab, setTab] = useState(0);
    const [validationError, setValidationError] = useState<string | undefined>(
        undefined
    );
    const [fbError, setFbError] = useState<firebase.FirebaseError | undefined>(
        undefined
    );
    const [loading, setLoading] = useState<boolean>(false);

    const [
        getIsUsernameAvailable,
        { loading: iuaLoading, data: iuaData }
    ] = useIsUsernameAvailableLazyQuery({
        variables: {
            name: signUpUsername
        }
    });
    const [
        mutateSetUsername,
        { loading: suLoading, data: suData }
    ] = useSetUsernameMutation({
        variables: {
            name: signUpUsername
        }
    });

    useEffect(() => {
        if (signUpUsername.length > 0) {
            getIsUsernameAvailable();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signUpUsername]);

    const styles = useStyles();

    const doAction = async () => {
        // Validation
        if (!isValidEmailAddress(email)) {
            setValidationError("auth/invalid-email");
            return;
        } else if (tab === 1) {
            if (password !== confirmPassword) {
                setValidationError("pw");
                return;
            }
            if (signUpUsername.length > MAX_USERNAME_LEN) {
                setValidationError("u");
                return;
            }
        }
        setValidationError(undefined);
        // Do action
        setLoading(true);
        try {
            if (tab === 0)
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);
            else {
                const newUser = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password);
                await mutateSetUsername({
                    update(cache, { data }) {
                        cache.writeQuery({
                            query: GetUsernameDocument,
                            variables: {
                                id: newUser.user?.uid
                            },
                            data: {
                                getUsername: data?.setUsername.name
                            }
                        });
                    }
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

    return (
        <Card className={styles.root}>
            <AppBar position="static" className={styles.appBar}>
                <Tabs value={tab} onChange={(_, n) => setTab(n)}>
                    <Tab label="Login" />
                    <Tab label="Sign up" />
                </Tabs>
            </AppBar>
            <CardHeader
                title={`${tab === 0 ? "Log in to" : "Sign up for"} Kobra`}
            />
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
                    {tab === 1 && (
                        <>
                            <TextField
                                variant="outlined"
                                label="Username"
                                required
                                value={signUpUsername}
                                onChange={(e) => {
                                    setSignUpUsername(e.target.value);
                                }}
                            />
                            {iuaLoading ? (
                                <CircularProgress size="24px" />
                            ) : iuaData && signUpUsername.length > 0 ? (
                                iuaData.isUsernameAvailable ? (
                                    <Typography className={styles.successText}>
                                        This username is available.
                                    </Typography>
                                ) : (
                                    <Typography className={styles.errorText}>
                                        Sorry, this username isn't available.
                                    </Typography>
                                )
                            ) : undefined}
                        </>
                    )}
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
                    disabled={
                        loading ||
                        (tab === 1 &&
                            (iuaLoading ||
                                !iuaData?.isUsernameAvailable ||
                                signUpUsername.length === 0 ||
                                password.length === 0 ||
                                confirmPassword.length === 0))
                    }
                    onClick={doAction}
                >
                    {tab === 0 ? "Login" : "Sign up"}
                </LoadingButton>
            </CardActions>
        </Card>
    );
}
