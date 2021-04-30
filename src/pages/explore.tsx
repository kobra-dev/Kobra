import { makeStyles, Typography } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { GetStaticProps } from "next"
import Head from "next/head"
import CardGrid from "src/components/CardGrid"
import { initializeApollo } from "src/utils/apolloClient"
import PageLayout from "../components/PageLayout"
import ProjectCard from "../components/project/ProjectCard"
import Stack from "../components/Stack"
import {
    GetRecentProjectsDocument,
    GetRecentProjectsQuery,
    GetRecentProjectsQueryVariables,

    UserProjectCardFragment
} from "../generated/queries"

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
    projects: UserProjectCardFragment[]
}

export default function Explore(props: ExploreProps) {
    const styles = useStyles();

    return (
        <>
            <Head>
                <title>Explore | Kobra</title>
            </Head>
            <PageLayout>
                <Stack direction="column">
                    <div className={styles.header}>
                        <Typography variant="h2" color="textPrimary">
                            Newest Projects!
                        </Typography>
                    </div>
                    {props.projects.length > 0 ? (
                        <CardGrid h100>
                            {props.projects.map((project) => (
                                <ProjectCard key={project.id} proj={project} />
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

export const getStaticProps: GetStaticProps<ExploreProps> = async () => {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query<
        GetRecentProjectsQuery,
        GetRecentProjectsQueryVariables
    >({
        query: GetRecentProjectsDocument
    });

    return {
        props: {
            projects: data.projects
        },
        revalidate: 1
    };
};
