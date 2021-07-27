import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography
} from "@material-ui/core";
import React from "react";
import firebase, { useUsername } from "../../utils/firebase";
import { useLogin } from "../auth/LoginDialogProvider";
import Updates from "./Updates";
import UserProjects from "./UserProjects";
import "./WelcomeDialog.css";

interface WelcomeDialogProps {
    isOpen: boolean;
    setIsOpen: { (_: boolean): any };
}

export default function WelcomeDialog(props: WelcomeDialogProps) {
    const [user] = useAuthState(firebase.auth());
    const login = useLogin();
    const [, username] = useUsername();

    return (
        <Dialog
            open={props.isOpen}
            fullWidth={true}
            maxWidth="md"
            className="welcomeDialogContainer"
        >
            <DialogTitle>Welcome to Kobra Studio</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Card variant="outlined">
                            {user ? (
                                <div>
                                    <CardContent>
                                        <Typography variant="h5">
                                            Hello{username && `, ${username}`}!
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            className="sectionHeader"
                                        >
                                            Your projects
                                        </Typography>
                                        <UserProjects />
                                    </CardContent>
                                    <CardActions>
                                        {/*<Button onClick={ () => { props.showNew(); } }>New project</Button>*/}
                                        <Button>Manage projects</Button>
                                        <Button
                                            className="logoutButton"
                                            onClick={() =>
                                                firebase.auth().signOut()
                                            }
                                        >
                                            Log out
                                        </Button>
                                    </CardActions>
                                </div>
                            ) : (
                                <div>
                                    <CardContent>
                                        <Typography variant="h5">
                                            You aren&apos;t signed in
                                        </Typography>
                                        <Typography>
                                            Sign in with your Kobra Account to
                                            be able to save your work.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => login()}>
                                            Sign in/register account
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                props.setIsOpen(false);
                                            }}
                                        >
                                            Continue without account
                                        </Button>
                                    </CardActions>
                                </div>
                            )}
                        </Card>
                    </Grid>
                    <Grid item xs={4} className="communityGridItem">
                        <Card variant="outlined">
                            <CardContent className="communityHeader">
                                <Typography variant="h5">Community</Typography>
                            </CardContent>
                            <CardContent className="updatesCard">
                                <Updates />
                            </CardContent>
                            <CardActions>
                                <Button href="https://community.kobra.dev">
                                    Go to Kobra Community
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </DialogContent>
            {user && (
                <DialogActions>
                    <Button
                        onClick={() => {
                            props.setIsOpen(false);
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}
