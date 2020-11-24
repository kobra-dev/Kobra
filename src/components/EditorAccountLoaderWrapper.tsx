// Another wrapper for the editor page to wait until accounts have been loaded
import { Typography } from '@material-ui/core';
import React from 'react';
import { useUser } from '../utils/user';
import Editor from './Editor';
import Loader from './Loader';

export default function EditorAccountLoaderWrapper() {
    const { loading } = useUser();
    
    return loading ? (
        <Loader>
            <Typography color="textSecondary">Getting account data...</Typography>
        </Loader>
    ) : <Editor />
}