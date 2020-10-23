import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, CardContent, CircularProgress, Typography } from '@material-ui/core';
import { Project } from '../GQLTypes';
import { Lock, Public } from '@material-ui/icons';
import './UserProjects.css';
import { dateConvertSort, UseQueryData } from '../GQLUtils';

const GET_USER_PROJECTS = gql`
query GetUserProjects($user: String!) {
    getProjectsByUser(user: $user) {
        id, name, isPublic, description, lastModified
    }
}
`;

export default function UserProjects() {
    const { user } = useAuth0();
    const { loading, error, data }: UseQueryData<Project> = useQuery(GET_USER_PROJECTS, {
        variables: { user: user.name }
    });

    return (
        <div>
            {loading || data === undefined || data.getProjectsByUser === undefined ? (
                <CircularProgress />
            ) : dateConvertSort<Project>(data.getProjectsByUser, "lastModified")
                .map((item: Project) => (
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
                ))
            }
        </div>
    );
}