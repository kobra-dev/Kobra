import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../utils/auth0';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        const redirectUrl = (req.query["redirectUrl"] as string) ?? '/'
        console.log(redirectUrl);
        await auth0.handleLogin(req, res, {
            redirectTo: redirectUrl,
            getState: (req) => {
                return {
                    testState: "tstrst"
                };
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(error.status || 400).end(error.message);
    }
}