import { makeStyles, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import CardGrid from "src/components/CardGrid";
import InfiniteScroll from "src/components/InfiniteScroll";
import { initializeApollo } from "src/utils/apolloClient";
import PageLayout from "../components/PageLayout";
import ProjectCard from "../components/project/ProjectCard";
import Stack from "../components/Stack";
import {
    GetRecentProjectsDocument,
    GetRecentProjectsQuery,
    GetRecentProjectsQueryVariables,
    useGetRecentProjectsLazyQuery,
    UserProjectCardFragment
} from "../generated/queries";

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

interface ExploreProps {
    projects: UserProjectCardFragment[];
}

const itemsPerPage = 12;
const projectCardIdPrefix = "explore-project-card-";

export default function Explore(props: ExploreProps) {
    const styles = useStyles();
    const [getRecentProjects, { fetchMore }] =
        // We have to run this to get fetchMore
        useGetRecentProjectsLazyQuery({
            variables: {
                skip: 0,
                take: 0
            }
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getRecentProjects(), []);

    const getContents = (items) =>
        items.map((project, index) => (
            <ProjectCard
                key={project.id}
                proj={project}
                id={projectCardIdPrefix + index}
            />
        ));

    return (
        <>
            <Head>
                <title>Explore | Kobra</title>
            </Head>
            <PageLayout>
                <Stack direction="column">
                    <div className={styles.header}>
                        <Typography
                            variant="h2"
                            color="textPrimary"
                        >
                            Newest Projects!
                        </Typography>
                    </div>
                    {props.projects.length > 0 ? (
                        <CardGrid h100>
                            {fetchMore ? (
                                <InfiniteScroll
                                    fetchData={async (
                                        page
                                    ) =>
                                        (
                                            await fetchMore(
                                                {
                                                    variables:
                                                        {
                                                            skip:
                                                                (page -
                                                                    1) *
                                                                itemsPerPage,
                                                            take: itemsPerPage
                                                        }
                                                }
                                            )
                                        ).data.projects
                                    }
                                    getContents={
                                        getContents
                                    }
                                    initialItems={
                                        props.projects
                                    }
                                    itemsPerPage={
                                        itemsPerPage
                                    }
                                />
                            ) : (
                                getContents(props.projects)
                            )}
                        </CardGrid>
                    ) : (
                        <Alert severity="info">
                            <AlertTitle>
                                Error fetching newest
                                projects
                            </AlertTitle>
                        </Alert>
                    )}
                </Stack>
            </PageLayout>
        </>
    );
}

export const getStaticProps: GetStaticProps<ExploreProps> =
    async () => {
        const apolloClient = initializeApollo();
        const { data } = await apolloClient.query<
            GetRecentProjectsQuery,
            GetRecentProjectsQueryVariables
        >({
            query: GetRecentProjectsDocument,
            variables: {
                skip: 0,
                take: itemsPerPage
            }
        });

        return {
            props: {
                projects: data.projects
            },
            revalidate: 1
        };
    };
