import React from 'react';
import { Button, Card, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
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

const projectCardMapper = (item: Project) => (
    <Card key={item.id} raised={true} className="projectCard">
        <CardContent>
            <div className="firstLine">
                <Typography className="title">
                    {item.name}
                </Typography>
                <Typography className="description">
                    {item.description}
                </Typography>
            </div>
            <Typography className="lastModified">
                {item.lastModified.toLocaleString()}
            </Typography>
            {item.isPublic ? <Public className="isPublic" /> : <Lock className="isPublic" />}
        </CardContent>
    </Card>
);

interface OpenDialogProps {
    isOpen: boolean,
    setIsOpen: {(_: boolean): any }
}

export default function OpenDialog(props: OpenDialogProps) {
    const { user } = useAuth0();
    const { loading, error, data }: UseQueryData<Project> = useQuery(GET_USER_PROJECTS, {
        variables: { user: user.name }
    });

    return (
        <Dialog open={props.isOpen} fullWidth={true} maxWidth="md" className="openDialogContainer">
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