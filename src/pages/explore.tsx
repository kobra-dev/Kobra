import { Button, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import ProjectCard from "../components/dashboard/ProjectCard";
import Loader from "../components/Loader";
import PageLayout from "../components/PageLayout";
import Stack from "../components/Stack";
import { useGetRecentProjectsQuery } from "../generated/queries";
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

export default function Explore() {
    const { data, loading, error } = useGetRecentProjectsQuery();

    const router = useRouter();
    const styles = useStyles();


    if (loading)) {
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
