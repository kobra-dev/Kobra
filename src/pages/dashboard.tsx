import { CircularProgress, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLogin } from "../components/auth/LoginDialogProvider";
import Loader from "../components/Loader";
import PageLayout from "../components/PageLayout";
import { useGetUserProjectsLazyQuery } from "../generated/queries";
import firebase from "../utils/firebase";

export default function Dashboard() {
    const [user, loading] = useAuthState(firebase.auth());
    const [getUserProjects, { loading: queryLoading, data }] = useGetUserProjectsLazyQuery();
    const login = useLogin();
    const router = useRouter();

    useEffect(() => {
        async function doLogin() {
            const result = await login();
            if(!result) router.push("/");
        }
        if(!user && !loading) doLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!user, loading]);

    useEffect(() => {
        if(user) {
            getUserProjects({
                variables: {
                    user: user.uid
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    if(loading || queryLoading) {
        return (
            <Loader>
                <Typography color="textSecondary">Getting account data...</Typography>
            </Loader>
        );
    }
    else if(!user) {
        return <></>;
    }

    return (
        <PageLayout>
            <Typography variant="h2">Recently opened</Typography>
            {JSON.stringify(data)}
            <Typography variant="h2">All of your work</Typography>
        </PageLayout>
    );
}