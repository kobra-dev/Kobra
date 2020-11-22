import React from 'react';
import { Button, Card, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import SearchableList from './SearchableList';
import { Project } from '../GQLTypes';
import { gql, useQuery } from '@apollo/client';
import { dateConvertSort, UseQueryData } from '../GQLUtils';
import { useAuth0 } from '@auth0/auth0-react';
import { Lock, Public } from '@material-ui/icons';

const GET_USER_PROJECTS = gql`
query GetUserProjects($user: String!) {
    getProjectsByUser(user: $user) {
        id, name, isPublic, description, lastModified
    }
}
`;

interface OpenDialogProps {
    isOpen: boolean,
    setIsOpen: {(_: boolean): any }
}

const useStyles = makeStyles((theme) => ({
    projectCard: {
        "& not(:last-child)": {
            marginBottom: "1em"
        },
        "& > .MuiCardContent-root": {
            paddingBottom: "16px !important"
        }
    },
    cardTitle: {
        fontSize: "1.1em",
        minWidth: "max-content"
    },
    cardDescription: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        WebkitLineClamp: 2,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        marginLeft: "1em",
        fontSize: "0.8em"
    },
    cardLastModified: {
        color: "grey",
        display: "inline-block"
    },
    cardIsPublic: {
        color: "grey",
        float: "right"
    },
    cardFirstLine: {
        display: "flex",
        justifyContent: "space-between"
    }
}));

export default function OpenDialog(props: OpenDialogProps) {
    const styles = useStyles();
    const { user } = useAuth0();
    const { loading, error, data }: UseQueryData<Project> = useQuery(GET_USER_PROJECTS, {
        variables: { user: user.name }
    });

    const projectCardMapper = (item: Project) => (
        <Card key={item.id} raised={true} className={styles.projectCard}>
            <CardContent>
                <div className={styles.cardFirstLine}>
                    <Typography className={styles.cardTitle}>
                        {item.name}
                    </Typography>
                    <Typography className={styles.cardDescription}>
                        {item.description}
                    </Typography>
                </div>
                <Typography className={styles.cardLastModified}>
                    {item.lastModified.toLocaleString()}
                </Typography>
                {item.isPublic ? <Public className={styles.cardIsPublic} /> : <Lock className={styles.cardIsPublic} />}
            </CardContent>
        </Card>
    );    

    return (
        <Dialog open={props.isOpen} fullWidth={true} maxWidth="md">
            <DialogTitle>Open project</DialogTitle>
            <DialogContent>
                {loading || data === undefined || data.getProjectsByUser === undefined ? (
                    <CircularProgress />
                ) : (
                    <SearchableList<Project> data={dateConvertSort<Project>(data.getProjectsByUser, "lastModified")} itemMapper={projectCardMapper} labelMapper={item => item.name} />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { alert("This should go to the kobra community website"); }}>Manage projects</Button>
                <Button onClick={() => { props.setIsOpen(false); }}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}