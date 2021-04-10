import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    makeStyles,
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
    useEditProjectDetailsMutation,
    useGetProjectDetailsLazyQuery,
    GetProjectDetailsUserProjectsQuery,
    GetProjectDetailsUserProjectsQueryVariables,
    GetProjectDetailsUserProjectsDocument
} from "../../generated/queries";
import { initializeApollo } from "../../utils/apolloClient";
import Error404 from "../404";
import firebase from "../../utils/firebase";
import {
    AccountCircle,
    CalendarToday,
    Launch,
    Lock,
    Public
} from "@material-ui/icons";
import { formatDateString } from "../../utils/misc";
import Stack from "../../components/Stack";
import Description from "src/components/project/Description";
import EditableTitle from "src/components/EditableTitle";
import { MAX_NAME_LEN, MAX_SUMMARY_LEN } from "src/utils/constants";

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
    visibilityButton: {
        marginRight: "1rem"
    },
    w100: {
        width: "100%"
    }
}));

const SUMMARY_PLACEHOLDER_TEXT = "No summary provided";

export default function Project(props: ProjectProps) {
    const styles = useStyles();
    const router = useRouter();
    const [
        getProjectData,
        { data, loading, error }
    ] = useGetProjectDetailsLazyQuery({
        variables: {
            id: router.query.id as string
        }
    });
    const [
        editProjectDetails,
        { loading: editLoading }
    ] = useEditProjectDetailsMutation();
    const [user, userLoading] = useAuthState(firebase.auth());

    // We don't need any value from this but useMemo runs earlier in the render process,
    // allowing for the query to be restarted when userLoading changes before a 404 is shown
    useMemo(() => {
        if (!props.project) {
            getProjectData();
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
    if (!(data || props.project) || editLoading) return <Loader />;

    const proj = data?.project ?? props.project;

    if (!proj)
        throw new Error(
            "Project is undefined/null (this shouldn't ever happen)"
        );

    const otherUserProjects = proj.user.projects.filter(otherProj => otherProj.id !== proj.id).slice(0, 3);

    return (
        <>
            <Head>
                <title>{proj.name} | Kobra</title>
            </Head>
            <PageLayout>
                <Stack direction="column">
                    <div className={styles.header}>
                        <Typography variant="h2" color="textPrimary">
                            {proj.userId === user?.uid ? (
                                <EditableTitle
                                    className={styles.w100}
                                    size="lg"
                                    maxLength={MAX_NAME_LEN}
                                    value={proj.name}
                                    onChange={async (name) => {
                                        if (name === proj.name) return;
                                        await editProjectDetails({
                                            variables: {
                                                id: router.query.id as string,
                                                name
                                            }
                                        });
                                        getProjectData();
                                    }}
                                />
                            ) : (
                                proj.name
                            )}
                        </Typography>
                        <div className={styles.addButtonWrapper}>
                            {proj.userId === user?.uid && (
                                <Button
                                    className={styles.visibilityButton}
                                    size="large"
                                    variant="contained"
                                    color="secondary"
                                    onClick={async () => {
                                        await editProjectDetails({
                                            variables: {
                                                id: router.query.id as string,
                                                isPublic: !proj.isPublic
                                            },
                                            async update(cache) {
                                                const client = initializeApollo();
                                                const idsOfProjectsToUpdate = Object.entries(
                                                    cache.extract()
                                                )
                                                    .filter(
                                                        (cacheItem) =>
                                                            cacheItem[0].startsWith(
                                                                "Project:"
                                                            ) &&
                                                            // prettier-ignore
                                                            cacheItem[1]
                                                            //@ts-ignore
                                                                ?.userId === user.uid &&
                                                            // prettier-ignore
                                                            //@ts-ignore
                                                            cacheItem[1].user
                                                    )
                                                    .map(
                                                        (cacheItem) =>
                                                            cacheItem[0]
                                                    );
                                                // prettier-ignore
                                                if (idsOfProjectsToUpdate.length === 0)
                                                    return;
                                                // If the project is changed to be public the project can be added to the user projects,
                                                // but if it is being privated there may be a new project in its place. This could be in
                                                // the cache or it could not be, it is easiest to just rerun the query instead of trying
                                                // to figure that out.
                                                const newUserData = !proj.isPublic
                                                    ? [
                                                          {
                                                              id: proj.id,
                                                              name: proj.name,
                                                              description:
                                                                  proj.description,
                                                              updatedAt: new Date().toString(),
                                                              isPublic: true
                                                          },
                                                          ...proj.user.projects.slice(
                                                              0,
                                                              3
                                                          )
                                                      ]
                                                    : (
                                                          await client.query<
                                                              GetProjectDetailsUserProjectsQuery,
                                                              GetProjectDetailsUserProjectsQueryVariables
                                                          >({
                                                              query: GetProjectDetailsUserProjectsDocument,
                                                              variables: {
                                                                  userId:
                                                                      user.uid
                                                              }
                                                          })
                                                      ).data.projects;
                                                idsOfProjectsToUpdate.forEach(
                                                    (id) => {
                                                        cache.modify({
                                                            id,
                                                            fields: {
                                                                user: (
                                                                    cachedUser
                                                                ) => ({
                                                                    ...cachedUser,
                                                                    'projects({"isPublic":true,"sortByNewest":true,"take":4})': newUserData
                                                                })
                                                            }
                                                        });
                                                    }
                                                );
                                            }
                                        });
                                        getProjectData();
                                    }}
                                >
                                    {proj.isPublic ? "Unpublish" : "Publish"}
                                </Button>
                            )}
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
                    {(proj.summary || proj.userId === user?.uid) && (
                        <Typography variant="h5" color="textPrimary">
                            {proj.userId === user?.uid ? (
                                <EditableTitle
                                    className={styles.w100}
                                    size="md"
                                    placeholder={SUMMARY_PLACEHOLDER_TEXT}
                                    maxLength={MAX_SUMMARY_LEN}
                                    value={proj.summary ?? ""}
                                    onChange={async (summary) => {
                                        if (summary === proj.summary) return;
                                        await editProjectDetails({
                                            variables: {
                                                id: router.query.id as string,
                                                summary
                                            }
                                        });
                                        getProjectData();
                                    }}
                                />
                            ) : (
                                proj.summary ?? SUMMARY_PLACEHOLDER_TEXT
                            )}
                        </Typography>
                    )}
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
                        {proj.userId === user?.uid && (
                            <Chip
                                variant="outlined"
                                icon={proj.isPublic ? <Public /> : <Lock />}
                                label={proj.isPublic ? "Public" : "Private"}
                            />
                        )}
                    </Stack>
                    {proj.description && proj.description.length > 0 && (
                        <Description
                            description={proj.description}
                            canEdit={proj.userId === user?.uid}
                            onSave={async (description: string) => {
                                await editProjectDetails({
                                    variables: {
                                        id: router.query.id as string,
                                        description
                                    }
                                });
                                // It is a lazy query so we have to rerun it manually
                                getProjectData();
                            }}
                        />
                    )}
                    {otherUserProjects.length > 0 && (
                        <>
                            <Typography variant="h4" color="textPrimary">
                                Other projects by {proj.user.name}
                            </Typography>
                            {otherUserProjects.map((otherProj) => (
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
