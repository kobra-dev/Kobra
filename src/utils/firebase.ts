import firebase from "firebase/app";
import "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useGetUsernameLazyQuery } from "../generated/queries";

if(!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });
}

export default firebase;

export function useUsername(): [boolean, string | undefined] {
    const [user] = useAuthState(firebase.auth());
    const [getUsername, { loading, data }] = useGetUsernameLazyQuery();

    useEffect(() => {
        if(user?.uid) {
            getUsername({
                variables: {
                    id: user.uid
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return [user?.uid !== undefined && loading, (user?.uid && data?.getUsername) ? data.getUsername : undefined];
}