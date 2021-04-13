import {
    Card,
    CardContent,
    CardHeader,
    makeStyles,
    Typography
} from "@material-ui/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import PageLayout from "../../components/PageLayout";
import {
    GetUserProfileDocument,
    GetUserProfileQuery,
    GetUserProfileQueryVariables,
    UserProfileFragment
} from "../../generated/queries";
import { initializeApollo } from "../../utils/apolloClient";
import firebase, { useUsername } from "../../utils/firebase";
import Stack from "../../components/Stack";
import ProjectCard from "src/components/project/ProjectCard";
import CardGrid from "src/components/CardGrid";
import Link from "next/link";

interface ProfileProps {
    profile: UserProfileFragment;
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

export default function User(props: ProfileProps) {
    const styles = useStyles();
    const [_, username] = useUsername();

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
                <Stack direction="column">
                    {username === props.profile.name && (
                        <Card>
                            <CardHeader title="This is your public profile page" />
                            <CardContent>
                                Any private projects will not be displayed here.
                                To access all of your projects or edit your
                                profile, go to your{" "}
                                <Link href="/dashboard">dashboard.</Link>
                            </CardContent>
                        </Card>
                    )}
                    <Typography variant="h2" color="textPrimary">
                        {props.profile.name}
                    </Typography>
                    {props.profile.projects.length > 0 ? (
                        <CardGrid>
                            {props.profile.projects.map((proj) => (
                                <ProjectCard key={proj.id} proj={proj} />
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
                </Stack>
            </PageLayout>
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
