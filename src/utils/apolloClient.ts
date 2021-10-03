import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    NormalizedCacheObject
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useMemo, useState } from "react";
import {
    GetUserProjectsDocument,
    GetUserProjectsQuery,
    GetUserProjectsQueryVariables,
    Project,
    UserProjectFragment
} from "src/generated/queries";
import firebase from "./firebase";

let apolloClient:
    | ApolloClient<NormalizedCacheObject>
    | undefined;

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GQL_URI
});

const authLink = setContext(async (_, { headers }) => {
    const token = await firebase
        .auth()
        .currentUser?.getIdToken();
    if (token === undefined) return {};

    return {
        headers: {
            ...headers,
            authorization: token
        }
    };
});

export async function getToken() {
    const token = await firebase
        .auth()
        .currentUser?.getIdToken();

    if (token === undefined) return "";

    return token;
}

const projectIsUserProject = (proj: Partial<Project>) =>
    [
        "id",
        "name",
        "isPublic",
        "summary",
        "updatedAt",
        "userId"
    ].every((prop) =>
        Object.hasOwnProperty.call(proj, prop)
    );

if (!globalThis.userProjectsServerFetched) {
    globalThis.userProjectsServerFetched = [];
}

export function useGetUserProjectsLazyQueryFixedCache(): [
    { (uid: string): Promise<GetUserProjectsQuery> },
    { data: GetUserProjectsQuery; loading: boolean }
] {
    const [loading, setLoading] = useState(false);
    const [data, setData] =
        useState<GetUserProjectsQuery>();

    async function getUserProjects(uid: string) {
        setLoading(true);
        if (
            !globalThis.userProjectsServerFetched.includes(
                uid
            )
        ) {
            // Get data from server into cache
            await apolloClient.query<
                GetUserProjectsQuery,
                GetUserProjectsQueryVariables
            >({
                query: GetUserProjectsDocument,
                variables: {
                    user: uid
                }
            });
            globalThis.userProjectsServerFetched.push(uid);
        }

        // Get from cache - it's easiest to just extract the cache and look through it manually
        const cache = apolloClient.cache.extract();

        const userProjects: UserProjectFragment[] =
            Object.values(cache)
                .filter(
                    (val: Partial<Project>) =>
                        val.__typename === "Project" &&
                        val.userId === uid &&
                        projectIsUserProject(val)
                )
                .sort((a, b) =>
                    (
                        new Date(
                            (
                                b as UserProjectFragment
                            ).updatedAt
                        ).valueOf() -
                        new Date(
                            (
                                a as UserProjectFragment
                            ).updatedAt
                        ).valueOf()
                    ).valueOf()
                ) as UserProjectFragment[];

        // If there's any items that aren't complete, they need to be refetched
        // Right now this isn't necessary but I've left the basis of this code in as a comment in case the
        // results of the addProject query no longer have all of the properties in the UserProjectFragment
        // Technically this could be necessary if the user is active on two devices at once but that's an
        // edge case that we probably don't need to worry about. For now, to avoid causing exceptions, we'll
        // just filter out the incomplete objects.
        /*let needToReExtractCache = false;
        for(const proj of userProjects) {
            if(!projectIsUserProject(proj)) {

            }
        }*/

        const newData = {
            projects: userProjects
        };

        setData(newData);
        setLoading(false);
        return newData;
    }

    return [getUserProjects, { loading, data }];
}

const createApolloClient = () =>
    new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        project(_, { args, toReference }) {
                            return toReference({
                                __typename: "Project",
                                id: args?.id
                            });
                        }
                    }
                }
            }
        })
    });

export function initializeApollo(initialState: any = null) {
    const _apolloClient =
        apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client,
    // the initial state gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Restore the cache using the data passed from
        // getStaticProps/getServerSideProps combined with the existing cached data
        _apolloClient.cache.restore({
            ...existingCache,
            ...initialState
        });
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

export function useApollo(initialState: any) {
    const store = useMemo(
        () => initializeApollo(initialState),
        [initialState]
    );
    return store;
}
