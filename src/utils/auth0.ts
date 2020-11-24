import { initAuth0 } from '@auth0/nextjs-auth0';

export default (() => {
    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
    const clientSecret = process.env.NEXT_PRIVATE_AUTH0_CLIENT_SECRET;

    if (domain === undefined || clientId === undefined || clientSecret === undefined) {
        console.table({domain: domain, clientId: clientId, clientSecret: clientSecret});
        throw new Error("One or more of the required environment variables for Auth0 is/are undefined");
    }

    return initAuth0({
        domain: domain,
        clientId: clientId,
        clientSecret: clientSecret,
        scope: 'openid profile',
        redirectUri: 'http://localhost:3000/api/callback',
        postLogoutRedirectUri: 'http://localhost:3000/',
        session: {
            // The secret used to encrypt the cookie.
            cookieSecret: '<RANDOMLY_GENERATED_SECRET>tratsrtn===yfuylt==t=wfa=thyufswatuswrhturfshfsrw',
            // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
            cookieLifetime: 60 * 60 * 8,
            // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
            cookieDomain: '',
            // (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
            cookieSameSite: 'lax',
            // (Optional) Store the id_token in the session. Defaults to false.
            storeIdToken: false,
            // (Optional) Store the access_token in the session. Defaults to false.
            storeAccessToken: true,
            // (Optional) Store the refresh_token in the session. Defaults to false.
            storeRefreshToken: true
        },
        oidcClient: {
            // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
            httpTimeout: 2500,
            // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
            clockTolerance: 10000
        }
    });
})();