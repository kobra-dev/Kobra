import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Collapse,
    Grid,
    IconButton,
    makeStyles,
    Typography
} from "@material-ui/core";
import { Close, Link as LinkIcon } from "@material-ui/icons";
import { GetServerSideProps } from "next";
import Head from "next/head";
import PageLayout from "../../components/PageLayout";
import {
    GetUserProfileDocument,
    GetUserProfileQuery,
    GetUserProfileQueryVariables,
    UserProfileFragment
} from "../../generated/queries";
import { initializeApollo } from "../../utils/apolloClient";
import EditProfileModal from "../../components/user/EditProfileModal";
import firebase, { useUsername } from "../../utils/firebase";
import Stack from "../../components/Stack";
import ProjectCard from "src/components/project/ProjectCard";
import CardGrid from "src/components/CardGrid";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useState } from "react";

interface ProfileProps {
    profile: UserProfileFragment;
}

const useStyles = makeStyles((theme) => ({
    urlChip: {
        marginTop: "0.5rem"
    },
    buttonMargin: {
        marginTop: "1rem"
    },
    profileContainer: {
        textAlign: "center"
    }
}));

export default function User(props: ProfileProps) {
    const styles = useStyles();
    const [, username] = useUsername();
    const router = useRouter();
    const [alertOpen, setAlertOpen] = useState(true);
    const [editModalOpen, setEditModalOpen] = useState(false);

    if (!props.profile)
        throw new Error(
            "Profile is undefined/null (this shouldn't ever happen)"
        );

    return (
        <>
            <Head>
                <title>{props.profile.name}'s profile | Kobra</title>
            </Head>
            <PageLayout>
                <Stack>
                    {username === props.profile.name && (
                        <Collapse in={alertOpen}>
                            <Alert
                                severity="info"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setAlertOpen(false);
                                        }}
                                    >
                                        <Close fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                <AlertTitle>
                                    This is your public profile page
                                </AlertTitle>
                                Any private projects will not be displayed here.
                                To access all of your projects, go to your{" "}
                                <Link href="/">home page.</Link>
                            </Alert>
                        </Collapse>
                    )}
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            className={styles.profileContainer}
                        >
                            <Typography variant="h2" color="textPrimary">
                                {props.profile.name}
                            </Typography>
                            {props.profile.bio && (
                                <Typography variant="h6" color="textPrimary">
                                    {props.profile.bio}
                                </Typography>
                            )}
                            {props.profile.url && (
                                <Chip
                                    className={styles.urlChip}
                                    icon={<LinkIcon />}
                                    label={props.profile.url}
                                    onClick={() => {
                                        router.push(
                                            props.profile.url as string
                                        );
                                    }}
                                />
                            )}
                            {username === props.profile.name && (
                                <div>
                                    <Button
                                        className={props.profile.url ? styles.buttonMargin : ""}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setEditModalOpen(true)}
                                    >
                                        Edit profile
                                    </Button>
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12} md={8}>
                            {props.profile.projects.length > 0 ? (
                                <CardGrid>
                                    {props.profile.projects.map((proj) => (
                                        <ProjectCard
                                            key={proj.id}
                                            proj={proj}
                                        />
                                    ))}
                                </CardGrid>
                            ) : (
                                <Card>
                                    <CardHeader
                                        title={`It looks like ${props.profile.name} doesn't have
                                any projects yet.`}
                                    />
                                </Card>
                            )}
                        </Grid>
                    </Grid>
                </Stack>
            </PageLayout>
            <EditProfileModal
                open={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    // https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
                    router.replace(router.asPath);
                }}
                bio={props.profile.bio ?? ""}
                url={props.profile.url ?? ""}
            />
        </>
    );
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
    context
) => {
    const apolloClient = initializeApollo();

    if (context.params?.name && !Array.isArray(context.params.name)) {
        let profile: UserProfileFragment | null | undefined = undefined;

        try {
            const { data } = await apolloClient.query<
                GetUserProfileQuery,
                GetUserProfileQueryVariables
            >({
                query: GetUserProfileDocument,
                variables: {
                    name: context.params.name
                }
            });

            profile = data.user;
        } catch (err) {}

        if (profile)
            return {
                props: {
                    profile
                }
            };
    }

    return {
        notFound: true
    };
};
