import { Button, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import { useLogin } from "../components/auth/LoginDialogProvider";
import ProjectCard from "../components/dashboard/ProjectCard";
import Loader from "../components/Loader";
import PageLayout from "../components/PageLayout";
import Stack from "../components/Stack";
import { useGetUserProjectsLazyQuery } from "../generated/queries";
import firebase from "../utils/firebase";
import CardGrid from "src/components/CardGrid";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        "& > *:first-child": {
            flex: 1
        }
    },
    addButtonWrapper: {
        marginTop: "auto",
        marginBottom: "auto"
    }
}));

export default function Dashboard() {
    const [
        getUserProjects,
        { loading: queryLoading, data }
    ] = useGetUserProjectsLazyQuery();

    const router = useRouter();
    const styles = useStyles();

    useEffect(() => {
        async function doLogin() {
            const result = await login();
            if (!result) router.push("/");
        }
        if (!user && !loading) doLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!user, loading]);

    useEffect(() => {
        if (user) {
            getUserProjects({
                variables: {
                    user: user.uid
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    if (loading || queryLoading || (user && !data)) {
        return (
            <Loader>
                <Typography color="textSecondary">
                    Getting newest projects...
                </Typography>
            </Loader>
        );
    } else if (!user) {
        return <></>;
    }

    if (!data) throw new Error("Query data is undefined");

    return (
        <>
            <Head>
                <title>Explore | Kobra</title>
            </Head>
            <PageLayout>
                <Stack direction="column">
                    <div className={styles.header}>
                        <Typography variant="h2" color="textPrimary">
                            Newest Projects!{" "}
                        </Typography>
                    </div>
                    {data.projects.length > 0 ? (
                        <CardGrid h100={false}>
                            {data.projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </CardGrid>
                    ) : (
                        <Alert severity="info">
                            <AlertTitle>
                                Error fetching newest projects
                            </AlertTitle>
                        </Alert>
                    )}
                </Stack>
            </PageLayout>
        </>
    );
}
