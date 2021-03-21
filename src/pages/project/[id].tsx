import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useMemo } from "react";
import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import Loader from "../../components/Loader";
import PageLayout from "../../components/PageLayout";
import {
    GetProjectDetailsDocument,
    GetProjectDetailsQuery,
    GetProjectDetailsQueryVariables,
    ProjectDetailsFragment,
    useGetProjectDetailsLazyQuery
} from "../../generated/queries";
import { initializeApollo } from "../../utils/apolloClient";
import Error404 from "../404";
import firebase from "../../utils/firebase";
import { AccountCircle, CalendarToday, Launch, Lock } from "@material-ui/icons";
import { formatDateString } from "../../utils/misc";
import Stack from "../../components/Stack";

interface ProjectProps {
    project: ProjectDetailsFragment | null;
}

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
    },
    descPaper: {
        padding: "1rem"
    }
}));

export default function Project(props: ProjectProps) {
    const styles = useStyles();
    const [
        getProjectData,
        { data, loading, error }
    ] = useGetProjectDetailsLazyQuery();
    const router = useRouter();
    const [user, userLoading] = useAuthState(firebase.auth());

    // We don't need any value from this but useMemo runs earlier in the render process,
    // allowing for the query to be restarted when userLoading changes before a 404 is shown
    useMemo(() => {
        if (!props.project) {
            console.log("rerun query");
            getProjectData({
                variables: {
                    id: router.query.id as string
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLoading]);

    if (
        // There's an error and we don't need to get the data again
        (error && !loading && !(data || props.project) && !userLoading) ||
        // The project is private and the user signed out
        (data?.project && !data.project.isPublic && !user)
    )
        return <Error404 />;
    if (!(data || props.project)) return <Loader />;

    const proj = props.project ?? data?.project;

    if (!proj)
        throw new Error(
            "Project is undefined/null (this shouldn't ever happen)"
        );

    return (
        <>
            <Head>
                <title>{proj.name} | Kobra</title>
            </Head>
            <PageLayout>
                <Stack direction="column">
                    <div className={styles.header}>
                        <Typography variant="h2" color="textPrimary">
                            {proj.name}
                        </Typography>
                        <div className={styles.addButtonWrapper}>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                startIcon={<Launch />}
                                onClick={() =>
                                    router.push("/editor?id=" + router.query.id)
                                }
                            >
                                Open in Studio
                            </Button>
                        </div>
                    </div>
                    <Stack direction="row" spacing="0.5rem">
                        <Chip
                            variant="outlined"
                            icon={<AccountCircle />}
                            label={proj.user.name}
                        />
                        <Chip
                            variant="outlined"
                            icon={<CalendarToday />}
                            label={`Last modified ${formatDateString(
                                proj.updatedAt
                            )}, created ${formatDateString(proj.createdAt)}`}
                        />
                        {!proj.isPublic && (
                            <Chip
                                variant="outlined"
                                icon={<Lock />}
                                label="Private"
                            />
                        )}
                    </Stack>
                    {proj.description && proj.description.length > 0 && (
                        <Paper variant="outlined" className={styles.descPaper}>
                            <Typography variant="h6">Description</Typography>
                            {proj.description}
                        </Paper>
                    )}
                    {proj.user.projects.length >= 2 && (
                        <>
                            <Typography variant="h4">
                                Other projects by {proj.user.name}
                            </Typography>
                            {proj.user.projects.map((otherProj) => (
                                <Card variant="outlined">
                                    <CardHeader title={otherProj.name} />
                                    {otherProj.description && (
                                        <CardContent>
                                            <Typography>
                                                {otherProj.description}
                                            </Typography>
                                        </CardContent>
                                    )}
                                </Card>
                            ))}
                        </>
                    )}
                </Stack>
            </PageLayout>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<ProjectProps> = async (
    context
) => {
    const apolloClient = initializeApollo();

    if (context.params?.id && !Array.isArray(context.params.id)) {
        let project: ProjectDetailsFragment | null | undefined = undefined;

        try {
            const { data } = await apolloClient.query<
                GetProjectDetailsQuery,
                GetProjectDetailsQueryVariables
            >({
                query: GetProjectDetailsDocument,
                variables: {
                    id: context.params.id
                }
            });

            project = data.project;
        } catch (err) {}

        return {
            props: {
                project: project ?? null
            }
        };
    }

    return {
        notFound: true
    };
};
