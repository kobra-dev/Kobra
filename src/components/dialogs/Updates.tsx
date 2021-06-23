import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Card, CardContent, CircularProgress, Typography } from '@material-ui/core';
import { Update } from '../GQLTypes';
import { dateConvertSort, UseQueryData } from '../GQLUtils';
import './Updates.css';

const GET_UPDATES = gql`
query GetUpdates {
    updates {
        title, contents, date
    }
}
`;

export default function Updates() {
    const { loading, data }: UseQueryData<Update> = useQuery(GET_UPDATES);

    return (
        <div className="updatesContainer">
            {loading || data === undefined || data.updates === undefined ? (
                <CircularProgress />
            ) : dateConvertSort<Update>(data.updates, "date").map((item: Update) => (
                <Card key={item.title + item.date} raised={true} className="updateCard">
                    <CardContent>
                        <Typography variant="h6">
                            {item.title}
                        </Typography>
                        <Typography className="date">
                            {new Date(item.date).toLocaleDateString()}
                        </Typography>
                        <Typography>
                            {item.contents}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}