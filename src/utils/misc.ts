export const formatDateString = (date: string) =>
    new Date(date).toLocaleString("us", {
        // TypeScript doesn't know about these properties but they exist
        // @ts-ignore
        dateStyle: "long",
        // @ts-ignore
        timeStyle: "short"
    });

// Use for queries whose results change if the user is logged in
/*export function useAuthFallbackQuery<TQuery, TVariables>(dataInProps: boolean, doc: DocumentNode | TypedDocumentNode<TQuery, TVariables>, baseOptions?: Apollo.LazyQueryHookOptions<TQuery, TVariables>): ({
    query: Apollo.QueryTuple<TQuery, TVariables>,
    loading: boolean,
    error: boolean
}) {
    const query = useLazyQuery<TQuery, TVariables>(doc, baseOptions);
    const [
        getQuery,
        { data, loading, error}
    ] = query;
    const [user, userLoading] = useAuthState(firebase.auth());

    // We don't need any value from this but useMemo runs earlier in the render process,
    // allowing for the query to be restarted when userLoading changes before a 404 is shown
    useMemo(() => {
        if (!dataInProps) {
            getQuery();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLoading]);

    const statusError = (
        // There's an error and we don't need to get the data again
        (error && !loading && !(data || dataInProps) && !userLoading) ||
        // The project is private and the user signed out
        (data?.project && !data.project.isPublic && !user)
    );

    return {
        query,
        loading:
    };
}*/
