import React from 'react';
import PageLayout from '../components/PageLayout';

export default function Index() {
    return (
        <PageLayout>
            <a href="/api/login">Login to the app</a>
            <a href="/api/logout">Logout to the app</a>
            Hello world!
            <h1>This should not have a loading screen.</h1>
        </PageLayout>
    );
}