import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../utils/auth0';

export default async function me(req: NextApiRequest, res: NextApiResponse) {
    try {
        const tokenCache = auth0.tokenCache(req, res);
        const { accessToken } = await tokenCache.getAccessToken();
        res.json({ token: accessToken });
    }
    catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
    }
}