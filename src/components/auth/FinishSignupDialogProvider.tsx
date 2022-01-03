import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Dialog,
    Link,
    makeStyles,
    Typography
} from "@material-ui/core";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useSetUsernameMutation } from "src/generated/queries";
import LoadingButton from "../LoadingButton";
import FinishSignupInputs from "./FinishSignupInputs";
import UsernameTextField, {
    UsernameTextFieldStatus
} from "./UsernameTextField";
import { setUsernameCacheUpdate } from "./utils";
import firebase, { useUsername } from "../../utils/firebase";
import { useEffect } from "react";
import Stack from "../Stack";
import { CARD_DIALOG_MAX_WIDTH } from "./Login";

type FinishSignupFunction = { (): Promise<boolean> };

const FinishSignupContext = createContext<FinishSignupFunction>(
    {} as FinishSignupFunction
);

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: CARD_DIALOG_MAX_WIDTH,
        overflow: "auto"
    },
    link: {
        cursor: "pointer"
    }
}));

export default function FinishSignupDialogProvider(props: {
    children: React.ReactNode;
}) {
    const [fsOpen, setFsOpen] = useState<boolean>(false);
    const [openResolve, setOpenResolve] = useState<{ (_: boolean): void }>();

    const finishSignupFn = useCallback(() => {
        setSignUpUsername("");
        setSignUpUserTesting(false);
        setSignUpEmailUpdates(false);
        setIuaStatus(UsernameTextFieldStatus.Success);
        setFsOpen(true);
        return new Promise<boolean>((resolve) => {
            setOpenResolve(() => resolve);
        });
    }, [setFsOpen, setOpenResolve]);

    const closeDialog = (success: boolean) => {
        setFsOpen(false);
        if (openResolve) {
            openResolve(success);
        }
    };

    const [usernameLoading, username] = useUsername();

    useEffect(() => {
        // The user is signed in with SSO and the username is not set
        const user = firebase.auth().currentUser;
        if (user && user.providerData[0] && !usernameLoading && !username) {
            setFsOpen(true);
        }
        // No need to depend on user because useUsername does that for us
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usernameLoading, username]);

    const styles = useStyles();

    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpUserTesting, setSignUpUserTesting] = useState(false);
    const [signUpEmailUpdates, setSignUpEmailUpdates] = useState(false);
    const [loading, setLoading] = useState(false);
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

    const doAction = async () => {
        setLoading(true);
        await mutateSetUsername({
            update: setUsernameCacheUpdate(firebase.auth().currentUser.uid)
        });
        setLoading(false);
        closeDialog(true);
    };

    return (
        <FinishSignupContext.Provider value={finishSignupFn}>
            {props.children}
            <Dialog open={fsOpen !== false}>
                <Card className={styles.root}>
                    <CardHeader title="Finish signup" />
                    <CardContent>
                        <Stack>
                            <UsernameTextField
                                value={signUpUsername}
                                onChange={setSignUpUsername}
                                onStatusChange={setIuaStatus}
                            />
                            <FinishSignupInputs
                                signUpUserTesting={signUpUserTesting}
                                setSignUpUserTesting={setSignUpUserTesting}
                                signUpEmailUpdates={signUpEmailUpdates}
                                setSignUpEmailUpdates={setSignUpEmailUpdates}
                            />
                            <Typography variant="body2">
                                Don&apos;t want to use this account anymore?
                                <br />
                                <Link
                                    className={styles.link}
                                    onClick={() => {
                                        firebase.auth().signOut();
                                        closeDialog(false);
                                    }}
                                >
                                    Log out
                                </Link>
                            </Typography>
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <LoadingButton
                            color="primary"
                            variant="contained"
                            loading={loading}
                            disabled={
                                loading ||
                                iuaStatus !== UsernameTextFieldStatus.Success
                            }
                            onClick={doAction}
                        >
                            Finish
                        </LoadingButton>
                    </CardActions>
                </Card>
            </Dialog>
        </FinishSignupContext.Provider>
    );
}

export const useFinishSignup = () => useContext(FinishSignupContext);
