import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Card, CardContent, CircularProgress, makeStyles, TextField, Typography } from '@material-ui/core';
import { Project } from '../GQLTypes';
import { Lock, Public } from '@material-ui/icons';
import { dateConvertSort, UseQueryData } from '../GQLUtils';
import { useAutocomplete } from '@material-ui/lab';
import { useAuthState } from '@kobra-dev/react-firebase-auth-hooks/auth';
import firebase from '../../utils/firebase';

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

const useStyles = makeStyles((theme) => ({
    userProjects: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    results: {
        overflowY: "auto",
        flex: 1,
        marginTop: "1rem"
    }
}));

export default function UserProjects() {
    const styles = useStyles();
    const [ user ] = useAuthState(firebase.auth());
    if(!user?.email) throw new Error("User email is undefined");
    const { loading, error, data }: UseQueryData<Project> = useQuery(GET_USER_PROJECTS, {
        variables: { user: user.email }
    });
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: 'open-project-autocomplete',
        options: data?.getProjectsByUser ?? [],
        getOptionLabel: (item: Project) => item.name
    });

    const [searchBoxValue, setSearchBoxValue] = useState("");
    // Modify the result of getInputProps to add setting searchBoxValue to the various event handlers
    /*const addStateToInputProps = (inputProps: any) => ({...inputProps, onChange: (event: any) => {
        inputProps.onChange(event);
        setSearchBoxValue(event.target.value);
    }, onBlur: (event: any) => {
        inputProps.onBlur(event);
        setSearchBoxValue("");
    }});*/
    const addStateToInputProps = (inputProps: any) => {
        if(inputProps.value !== searchBoxValue) {
            setSearchBoxValue(inputProps.value);
        }
        return inputProps;
    };

    return (
        <div className={styles.userProjects}>
            {loading || data === undefined || data.getProjectsByUser === undefined ? (
                <CircularProgress />
            ) : (
                <>
                    <div {...getRootProps()}>
                        <TextField variant="outlined" fullWidth label="Search" InputProps={{
                            inputProps: addStateToInputProps(getInputProps())
                        }}/>
                    </div>
                    <div className={styles.results}>
                        {(() => {
                            if(searchBoxValue.length > 0) {
                                if(groupedOptions.length > 0) {
                                    // Show results
                                    return (
                                        <div {...getListboxProps}>
                                            {groupedOptions.map(projectCardMapper)}
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <Typography>No items found.</Typography>
                                    );
                                }
                            }
                            else {
                                // There is nothing being searched for so show everything
                                return dateConvertSort<Project>(data.getProjectsByUser, "lastModified").map(projectCardMapper);
                            }
                        })()}
                    </div>
                    {/*groupedOptions.length > 0 ? (
                        <div {...getListboxProps}>
                            {groupedOptions.map(projectCardMapper)}
                        </div>
                    ) : (
                        <Typography>No items available.</Typography>
                    )*/}
                    {/*dateConvertSort<Project>(data.getProjectsByUser, "lastModified")
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
                        ))*/}
                </>
            )}
        </div>
    );
}