import React from 'react';
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@material-ui/core';
import './WelcomeDialog.css';
import { useAuth0 } from '@auth0/auth0-react';
import UserProjects from './UserProjects';
import Updates from './Updates';

interface WelcomeDialogProps {
    isOpen: boolean,
    setIsOpen: {(_: boolean): any },
    showNew: {() : void}
}

export default function WelcomeDialog(props: WelcomeDialogProps) {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <Dialog open={props.isOpen} fullWidth={true} maxWidth="md" className="welcomeDialogContainer">
            <DialogTitle>Welcome to Kobra Studio</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Card variant="outlined">
                            {isAuthenticated ? (
                                <div>
                                    <CardContent>
                                        <Typography variant="h5">Hello, {user.nickname}!</Typography>
                                        <Typography variant="h6" className="sectionHeader">Your projects</Typography>
                                        <UserProjects />
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={ () => { props.showNew(); } }>New project</Button>
                                        <Button>Manage projects</Button>
                                        <Button className="logoutButton" onClick={ () => logout() }>Log out</Button>
                                    </CardActions>
                                </div>
                            ) : (
                                <div>
                                    <CardContent>
                                        <Typography variant="h5">You aren't signed in</Typography>
                                        <Typography>Sign in with your Kobra Account to be able to save your work.</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={ () => loginWithRedirect() }>Sign in/register account</Button>
                                        <Button onClick={ () => { props.setIsOpen(false); } }>Continue without account</Button>
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
                                <Button href="https://community.kobra.dev">Go to Kobra Community</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </DialogContent>
            {isAuthenticated && (
                <DialogActions>
                    <Button onClick={() => { props.setIsOpen(false); }}>Close</Button>
                </DialogActions>
            )}
        </Dialog>
    );
}