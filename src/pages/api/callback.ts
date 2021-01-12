import { NextApiRequest, NextApiResponse } from 'next';
import { decodeState } from '@auth0/nextjs-auth0/dist/utils/state';
import auth0 from '../../utils/auth0';

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Add state as URL parameter
        const state = req.query.state;
        if(Array.isArray(state)) {
            throw new Error("State query parameter is array");
        }
        const decodedState = decodeState(state);

        await auth0.handleCallback(req, res, {
            redirectTo: decodedState.editorState !== undefined
                ? decodedState.redirectTo + "?editorState=" + encodeURIComponent(decodedState.editorState)
                : decodedState.redirectTo
        });
    }
    catch (error) {
        console.error(error);
        res.status(error.status || 400).end(error.message);
    }
}