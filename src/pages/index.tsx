import React from 'react';
import { useFetchUser } from '../utils/user';

export default function Index() {
    const { user, loading } = useFetchUser();

    return (
        <div>
            <a href="/api/login">Login to the app</a>
            <a href="/api/logout">Logout to the app</a>
            Hello world!
            <h1>This should not have a loading screen.</h1>
            { loading }
            { JSON.stringify(user, null, 2) }
        </div>
    );
}