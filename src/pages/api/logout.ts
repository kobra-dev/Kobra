import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../utils/auth0';

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
    try {
        await auth0.handleLogout(req, res, {
            returnTo: 'http://localhost:3000/'
        });
    }
    catch (error) {
        console.error(error);
        res.status(error.status || 400).end(error.message);
    }
}