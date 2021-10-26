import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: any;
};

export type MlModel = {
    __typename?: "MLModel";
    id: Scalars["String"];
    modelJson: Scalars["String"];
    modelParams?: Maybe<Scalars["String"]>;
    projectId: Scalars["String"];
    project: Project;
};

export type Mutation = {
    __typename?: "Mutation";
    addProject: Project;
    editProject: Project;
    removeProject: Project;
    addModel: MlModel;
    editModel: MlModel;
    removeModel: MlModel;
    setUsername: User;
    editProfile: User;
    addDataSet: User;
    removeDataSet: User;
};

export type MutationAddProjectArgs = {
    name: Scalars["String"];
    isPublic: Scalars["Boolean"];
    summary?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    projectJson?: Maybe<Scalars["String"]>;
    modelsDb?: Maybe<Scalars["String"]>;
    parentId?: Maybe<Scalars["String"]>;
};

export type MutationEditProjectArgs = {
    name?: Maybe<Scalars["String"]>;
    summary?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    isPublic?: Maybe<Scalars["Boolean"]>;
    projectJson?: Maybe<Scalars["String"]>;
    modelsDb?: Maybe<Scalars["String"]>;
    parentId?: Maybe<Scalars["String"]>;
    id: Scalars["String"];
};

export type MutationRemoveProjectArgs = {
    id: Scalars["String"];
};

export type MutationAddModelArgs = {
    modelJson: Scalars["String"];
    modelParams: Scalars["String"];
    projectId: Scalars["String"];
};

export type MutationEditModelArgs = {
    modelJson?: Maybe<Scalars["String"]>;
    modelParams?: Maybe<Scalars["String"]>;
    id: Scalars["String"];
};

export type MutationRemoveModelArgs = {
    id: Scalars["String"];
};

export type MutationSetUsernameArgs = {
    emailUpdates?: Maybe<Scalars["Boolean"]>;
    sendUserTestingEmail?: Maybe<Scalars["Boolean"]>;
    name: Scalars["String"];
};

export type MutationEditProfileArgs = {
    bio?: Maybe<Scalars["String"]>;
    url?: Maybe<Scalars["String"]>;
};

export type MutationAddDataSetArgs = {
    dataSetKey: Scalars["String"];
};

export type MutationRemoveDataSetArgs = {
    dataSetKey: Scalars["String"];
};

export type Project = {
    __typename?: "Project";
    id: Scalars["String"];
    createdAt: Scalars["DateTime"];
    updatedAt: Scalars["DateTime"];
    userId: Scalars["String"];
    name: Scalars["String"];
    isPublic: Scalars["Boolean"];
    summary?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    projectJson?: Maybe<Scalars["String"]>;
    parentId?: Maybe<Scalars["String"]>;
    user: User;
    parent?: Maybe<Project>;
    children?: Maybe<Array<Project>>;
};

export type ProjectChildrenArgs = {
    searchTerm?: Maybe<Scalars["String"]>;
    skip?: Maybe<Scalars["Float"]>;
    take?: Maybe<Scalars["Float"]>;
    sortByNewest?: Maybe<Scalars["Boolean"]>;
    isPublic?: Maybe<Scalars["Boolean"]>;
    user?: Maybe<Scalars["String"]>;
};

export type Query = {
    __typename?: "Query";
    project?: Maybe<Project>;
    projects: Array<Project>;
    model?: Maybe<MlModel>;
    user?: Maybe<User>;
    isUsernameAvailable: Scalars["Boolean"];
    getUsername?: Maybe<Scalars["String"]>;
    isDataSetFound: User;
};

export type QueryProjectArgs = {
    id: Scalars["String"];
};

export type QueryProjectsArgs = {
    searchTerm?: Maybe<Scalars["String"]>;
    skip?: Maybe<Scalars["Float"]>;
    take?: Maybe<Scalars["Float"]>;
    sortByNewest?: Maybe<Scalars["Boolean"]>;
    isPublic?: Maybe<Scalars["Boolean"]>;
    user?: Maybe<Scalars["String"]>;
};

export type QueryModelArgs = {
    id: Scalars["String"];
};

export type QueryUserArgs = {
    id?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
};

export type QueryIsUsernameAvailableArgs = {
    name: Scalars["String"];
};

export type QueryGetUsernameArgs = {
    id: Scalars["String"];
};

export type QueryIsDataSetFoundArgs = {
    dataSetKey: Scalars["String"];
};

export type User = {
    __typename?: "User";
    id: Scalars["String"];
    name: Scalars["String"];
    bio?: Maybe<Scalars["String"]>;
    url?: Maybe<Scalars["String"]>;
    emailUpdates?: Maybe<Scalars["Boolean"]>;
    datasets: Array<Scalars["String"]>;
    projects: Array<Project>;
};

export type UserProjectsArgs = {
    searchTerm?: Maybe<Scalars["String"]>;
    skip?: Maybe<Scalars["Float"]>;
    take?: Maybe<Scalars["Float"]>;
    sortByNewest?: Maybe<Scalars["Boolean"]>;
    isPublic?: Maybe<Scalars["Boolean"]>;
};

export type AddDataSetMutationVariables = Exact<{
    dataSetKey: Scalars["String"];
}>;

export type AddDataSetMutation = {
    __typename?: "Mutation";
} & {
    addDataSet: { __typename?: "User" } & Pick<
        User,
        "id" | "name" | "datasets"
    >;
};

export type AddModelMutationVariables = Exact<{
    modelJson: Scalars["String"];
    modelParams: Scalars["String"];
    projectId: Scalars["String"];
}>;

export type AddModelMutation = {
    __typename?: "Mutation";
} & {
    addModel: { __typename?: "MLModel" } & Pick<MlModel, "id">;
};

export type AddProjectMutationVariables = Exact<{
    name: Scalars["String"];
    isPublic: Scalars["Boolean"];
    summary?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    projectJson?: Maybe<Scalars["String"]>;
    parentId?: Maybe<Scalars["String"]>;
}>;

export type AddProjectMutation = {
    __typename?: "Mutation";
} & {
    addProject: { __typename?: "Project" } & Pick<
        Project,
        | "id"
        | "name"
        | "isPublic"
        | "summary"
        | "description"
        | "projectJson"
        | "parentId"
        | "updatedAt"
        | "userId"
    >;
};

export type DeleteDataSetMutationVariables = Exact<{
    key: Scalars["String"];
}>;

export type DeleteDataSetMutation = {
    __typename?: "Mutation";
} & {
    removeDataSet: { __typename?: "User" } & Pick<User, "id" | "datasets">;
};

export type DeleteProjectMutationVariables = Exact<{
    id: Scalars["String"];
}>;

export type DeleteProjectMutation = {
    __typename?: "Mutation";
} & {
    removeProject: { __typename?: "Project" } & Pick<Project, "id">;
};

export type EditProfileMutationVariables = Exact<{
    bio?: Maybe<Scalars["String"]>;
    url?: Maybe<Scalars["String"]>;
}>;

export type EditProfileMutation = {
    __typename?: "Mutation";
} & {
    editProfile: { __typename?: "User" } & Pick<User, "id" | "bio" | "url">;
};

export type EditProjectDetailsMutationVariables = Exact<{
    id: Scalars["String"];
    name?: Maybe<Scalars["String"]>;
    isPublic?: Maybe<Scalars["Boolean"]>;
    summary?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
}>;

export type EditProjectDetailsMutation = {
    __typename?: "Mutation";
} & {
    editProject: { __typename?: "Project" } & Pick<
        Project,
        "id" | "name" | "isPublic" | "summary" | "description" | "updatedAt"
    >;
};

export type GetEditorProjectDetailsQueryVariables = Exact<{
    id: Scalars["String"];
}>;

export type GetEditorProjectDetailsQuery = {
    __typename?: "Query";
} & {
    project?: Maybe<
        { __typename?: "Project" } & Pick<
            Project,
            | "id"
            | "userId"
            | "name"
            | "isPublic"
            | "summary"
            | "description"
            | "projectJson"
        > & {
                user: { __typename?: "User" } & Pick<User, "id" | "name">;
            }
    >;
};

export type GetProjectDetailsQueryVariables = Exact<{
    id: Scalars["String"];
}>;

export type GetProjectDetailsQuery = {
    __typename?: "Query";
} & {
    project?: Maybe<{ __typename?: "Project" } & ProjectDetailsFragment>;
};

export type ProjectDetailsFragment = {
    __typename?: "Project";
} & Pick<
    Project,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "userId"
    | "name"
    | "isPublic"
    | "description"
    | "summary"
> & {
        user: { __typename?: "User" } & Pick<User, "id" | "name"> & {
                projects: Array<
                    { __typename?: "Project" } & Pick<
                        Project,
                        "id" | "name" | "summary" | "updatedAt"
                    >
                >;
            };
        parent?: Maybe<
            { __typename?: "Project" } & Pick<
                Project,
                "id" | "name" | "userId"
            > & {
                    user: { __typename?: "User" } & Pick<User, "name">;
                }
        >;
        children?: Maybe<
            Array<
                { __typename?: "Project" } & {
                    user: { __typename?: "User" } & Pick<User, "name">;
                } & ProjectCardFragment
            >
        >;
    };

export type ProjectCardFragment = {
    __typename?: "Project";
} & Pick<Project, "id" | "name" | "summary" | "updatedAt">;

export type GetProjectDetailsUserProjectsQueryVariables = Exact<{
    userId: Scalars["String"];
}>;

export type GetProjectDetailsUserProjectsQuery = {
    __typename?: "Query";
} & {
    projects: Array<
        { __typename?: "Project" } & Pick<
            Project,
            "id" | "name" | "description" | "updatedAt" | "isPublic"
        >
    >;
};

export type GetRecentProjectsQueryVariables = Exact<{
    skip: Scalars["Float"];
    take: Scalars["Float"];
}>;

export type GetRecentProjectsQuery = {
    __typename?: "Query";
} & {
    projects: Array<{ __typename?: "Project" } & UserProjectCardFragment>;
};

export type UserProjectCardFragment = {
    __typename?: "Project";
} & Pick<Project, "id" | "updatedAt" | "name" | "summary" | "isPublic"> & {
        user: { __typename?: "User" } & Pick<User, "name">;
    };

export type GetUserDataSetQueryVariables = Exact<{
    id: Scalars["String"];
}>;

export type GetUserDataSetQuery = {
    __typename?: "Query";
} & {
    user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "datasets">>;
};

export type GetUserProfileQueryVariables = Exact<{
    name: Scalars["String"];
}>;

export type GetUserProfileQuery = {
    __typename?: "Query";
} & {
    user?: Maybe<{ __typename?: "User" } & UserProfileFragment>;
};

export type UserProfileFragment = {
    __typename?: "User";
} & Pick<User, "name" | "bio" | "url"> & {
        projects: Array<
            { __typename?: "Project" } & Pick<
                Project,
                "id" | "name" | "summary" | "updatedAt"
            >
        >;
    };

export type GetUserProjectsQueryVariables = Exact<{
    user: Scalars["String"];
}>;

export type GetUserProjectsQuery = {
    __typename?: "Query";
} & {
    projects: Array<{ __typename?: "Project" } & UserProjectFragment>;
};

export type UserProjectFragment = {
    __typename?: "Project";
} & Pick<
    Project,
    "id" | "name" | "isPublic" | "summary" | "updatedAt" | "userId"
>;

export type GetUsernameQueryVariables = Exact<{
    id: Scalars["String"];
}>;

export type GetUsernameQuery = { __typename?: "Query" } & {
    user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "name">>;
};

export type IsUsernameAvailableQueryVariables = Exact<{
    name: Scalars["String"];
}>;

export type IsUsernameAvailableQuery = {
    __typename?: "Query";
} & Pick<Query, "isUsernameAvailable">;

export type RenameProjectMutationVariables = Exact<{
    id: Scalars["String"];
    name: Scalars["String"];
}>;

export type RenameProjectMutation = {
    __typename?: "Mutation";
} & {
    editProject: { __typename?: "Project" } & Pick<
        Project,
        "id" | "name" | "updatedAt"
    >;
};

export type SaveProjectMutationVariables = Exact<{
    id: Scalars["String"];
    projectJson: Scalars["String"];
}>;

export type SaveProjectMutation = {
    __typename?: "Mutation";
} & {
    editProject: { __typename?: "Project" } & Pick<
        Project,
        "id" | "projectJson" | "updatedAt"
    >;
};

export type SetUsernameMutationVariables = Exact<{
    name: Scalars["String"];
    sendUserTestingEmail: Scalars["Boolean"];
    emailUpdates: Scalars["Boolean"];
}>;

export type SetUsernameMutation = {
    __typename?: "Mutation";
} & {
    setUsername: { __typename?: "User" } & Pick<User, "name">;
};

export const ProjectCardFragmentDoc = gql`
    fragment ProjectCard on Project {
        id
        name
        summary
        updatedAt
    }
`;
export const ProjectDetailsFragmentDoc = gql`
    fragment ProjectDetails on Project {
        id
        createdAt
        updatedAt
        userId
        user {
            id
            name
            projects(sortByNewest: true, take: 4, isPublic: true) {
                id
                name
                summary
                updatedAt
            }
        }
        name
        isPublic
        description
        summary
        parent {
            id
            name
            userId
            user {
                name
            }
        }
        children(sortByNewest: true, isPublic: true) {
            ...ProjectCard
            user {
                name
            }
        }
    }
    ${ProjectCardFragmentDoc}
`;
export const UserProjectCardFragmentDoc = gql`
    fragment UserProjectCard on Project {
        id
        updatedAt
        name
        summary
        isPublic
        user {
            name
        }
    }
`;
export const UserProfileFragmentDoc = gql`
    fragment UserProfile on User {
        name
        bio
        url
        projects(isPublic: true, sortByNewest: true) {
            id
            name
            summary
            updatedAt
        }
    }
`;
export const UserProjectFragmentDoc = gql`
    fragment UserProject on Project {
        id
        name
        isPublic
        summary
        updatedAt
        userId
    }
`;
export const AddDataSetDocument = gql`
    mutation AddDataSet($dataSetKey: String!) {
        addDataSet(dataSetKey: $dataSetKey) {
            id
            name
            datasets
        }
    }
`;
export type AddDataSetMutationFn = Apollo.MutationFunction<
    AddDataSetMutation,
    AddDataSetMutationVariables
>;

/**
 * __useAddDataSetMutation__
 *
 * To run a mutation, you first call `useAddDataSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDataSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDataSetMutation, { data, loading, error }] = useAddDataSetMutation({
 *   variables: {
 *      dataSetKey: // value for 'dataSetKey'
 *   },
 * });
 */
export function useAddDataSetMutation(
    baseOptions?: Apollo.MutationHookOptions<
        AddDataSetMutation,
        AddDataSetMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<AddDataSetMutation, AddDataSetMutationVariables>(
        AddDataSetDocument,
        options
    );
}
export type AddDataSetMutationHookResult = ReturnType<
    typeof useAddDataSetMutation
>;
export type AddDataSetMutationResult =
    Apollo.MutationResult<AddDataSetMutation>;
export type AddDataSetMutationOptions = Apollo.BaseMutationOptions<
    AddDataSetMutation,
    AddDataSetMutationVariables
>;
export const AddModelDocument = gql`
    mutation AddModel(
        $modelJson: String!
        $modelParams: String!
        $projectId: String!
    ) {
        addModel(
            modelJson: $modelJson
            modelParams: $modelParams
            projectId: $projectId
        ) {
            id
        }
    }
`;
export type AddModelMutationFn = Apollo.MutationFunction<
    AddModelMutation,
    AddModelMutationVariables
>;

/**
 * __useAddModelMutation__
 *
 * To run a mutation, you first call `useAddModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addModelMutation, { data, loading, error }] = useAddModelMutation({
 *   variables: {
 *      modelJson: // value for 'modelJson'
 *      modelParams: // value for 'modelParams'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useAddModelMutation(
    baseOptions?: Apollo.MutationHookOptions<
        AddModelMutation,
        AddModelMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<AddModelMutation, AddModelMutationVariables>(
        AddModelDocument,
        options
    );
}
export type AddModelMutationHookResult = ReturnType<typeof useAddModelMutation>;
export type AddModelMutationResult = Apollo.MutationResult<AddModelMutation>;
export type AddModelMutationOptions = Apollo.BaseMutationOptions<
    AddModelMutation,
    AddModelMutationVariables
>;
export const AddProjectDocument = gql`
    mutation AddProject(
        $name: String!
        $isPublic: Boolean!
        $summary: String
        $description: String
        $projectJson: String
        $parentId: String
    ) {
        addProject(
            name: $name
            isPublic: $isPublic
            summary: $summary
            description: $description
            projectJson: $projectJson
            parentId: $parentId
        ) {
            id
            name
            isPublic
            summary
            description
            projectJson
            parentId
            updatedAt
            userId
        }
    }
`;
export type AddProjectMutationFn = Apollo.MutationFunction<
    AddProjectMutation,
    AddProjectMutationVariables
>;

/**
 * __useAddProjectMutation__
 *
 * To run a mutation, you first call `useAddProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectMutation, { data, loading, error }] = useAddProjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *      isPublic: // value for 'isPublic'
 *      summary: // value for 'summary'
 *      description: // value for 'description'
 *      projectJson: // value for 'projectJson'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useAddProjectMutation(
    baseOptions?: Apollo.MutationHookOptions<
        AddProjectMutation,
        AddProjectMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<AddProjectMutation, AddProjectMutationVariables>(
        AddProjectDocument,
        options
    );
}
export type AddProjectMutationHookResult = ReturnType<
    typeof useAddProjectMutation
>;
export type AddProjectMutationResult =
    Apollo.MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = Apollo.BaseMutationOptions<
    AddProjectMutation,
    AddProjectMutationVariables
>;
export const DeleteDataSetDocument = gql`
    mutation DeleteDataSet($key: String!) {
        removeDataSet(dataSetKey: $key) {
            id
            datasets
        }
    }
`;
export type DeleteDataSetMutationFn = Apollo.MutationFunction<
    DeleteDataSetMutation,
    DeleteDataSetMutationVariables
>;

/**
 * __useDeleteDataSetMutation__
 *
 * To run a mutation, you first call `useDeleteDataSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDataSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDataSetMutation, { data, loading, error }] = useDeleteDataSetMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useDeleteDataSetMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeleteDataSetMutation,
        DeleteDataSetMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        DeleteDataSetMutation,
        DeleteDataSetMutationVariables
    >(DeleteDataSetDocument, options);
}
export type DeleteDataSetMutationHookResult = ReturnType<
    typeof useDeleteDataSetMutation
>;
export type DeleteDataSetMutationResult =
    Apollo.MutationResult<DeleteDataSetMutation>;
export type DeleteDataSetMutationOptions = Apollo.BaseMutationOptions<
    DeleteDataSetMutation,
    DeleteDataSetMutationVariables
>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($id: String!) {
        removeProject(id: $id) {
            id
        }
    }
`;
export type DeleteProjectMutationFn = Apollo.MutationFunction<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeleteProjectMutation,
        DeleteProjectMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        DeleteProjectMutation,
        DeleteProjectMutationVariables
    >(DeleteProjectDocument, options);
}
export type DeleteProjectMutationHookResult = ReturnType<
    typeof useDeleteProjectMutation
>;
export type DeleteProjectMutationResult =
    Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
>;
export const EditProfileDocument = gql`
    mutation editProfile($bio: String, $url: String) {
        editProfile(bio: $bio, url: $url) {
            id
            bio
            url
        }
    }
`;
export type EditProfileMutationFn = Apollo.MutationFunction<
    EditProfileMutation,
    EditProfileMutationVariables
>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useEditProfileMutation(
    baseOptions?: Apollo.MutationHookOptions<
        EditProfileMutation,
        EditProfileMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        EditProfileMutation,
        EditProfileMutationVariables
    >(EditProfileDocument, options);
}
export type EditProfileMutationHookResult = ReturnType<
    typeof useEditProfileMutation
>;
export type EditProfileMutationResult =
    Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<
    EditProfileMutation,
    EditProfileMutationVariables
>;
export const EditProjectDetailsDocument = gql`
    mutation EditProjectDetails(
        $id: String!
        $name: String
        $isPublic: Boolean
        $summary: String
        $description: String
    ) {
        editProject(
            id: $id
            name: $name
            isPublic: $isPublic
            summary: $summary
            description: $description
        ) {
            id
            name
            isPublic
            summary
            description
            updatedAt
        }
    }
`;
export type EditProjectDetailsMutationFn = Apollo.MutationFunction<
    EditProjectDetailsMutation,
    EditProjectDetailsMutationVariables
>;

/**
 * __useEditProjectDetailsMutation__
 *
 * To run a mutation, you first call `useEditProjectDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProjectDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProjectDetailsMutation, { data, loading, error }] = useEditProjectDetailsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      isPublic: // value for 'isPublic'
 *      summary: // value for 'summary'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useEditProjectDetailsMutation(
    baseOptions?: Apollo.MutationHookOptions<
        EditProjectDetailsMutation,
        EditProjectDetailsMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        EditProjectDetailsMutation,
        EditProjectDetailsMutationVariables
    >(EditProjectDetailsDocument, options);
}
export type EditProjectDetailsMutationHookResult = ReturnType<
    typeof useEditProjectDetailsMutation
>;
export type EditProjectDetailsMutationResult =
    Apollo.MutationResult<EditProjectDetailsMutation>;
export type EditProjectDetailsMutationOptions = Apollo.BaseMutationOptions<
    EditProjectDetailsMutation,
    EditProjectDetailsMutationVariables
>;
export const GetEditorProjectDetailsDocument = gql`
    query GetEditorProjectDetails($id: String!) {
        project(id: $id) {
            id
            userId
            user {
                id
                name
            }
            name
            isPublic
            summary
            description
            projectJson
        }
    }
`;

/**
 * __useGetEditorProjectDetailsQuery__
 *
 * To run a query within a React component, call `useGetEditorProjectDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEditorProjectDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEditorProjectDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEditorProjectDetailsQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetEditorProjectDetailsQuery,
        GetEditorProjectDetailsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<
        GetEditorProjectDetailsQuery,
        GetEditorProjectDetailsQueryVariables
    >(GetEditorProjectDetailsDocument, options);
}
export function useGetEditorProjectDetailsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetEditorProjectDetailsQuery,
        GetEditorProjectDetailsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        GetEditorProjectDetailsQuery,
        GetEditorProjectDetailsQueryVariables
    >(GetEditorProjectDetailsDocument, options);
}
export type GetEditorProjectDetailsQueryHookResult = ReturnType<
    typeof useGetEditorProjectDetailsQuery
>;
export type GetEditorProjectDetailsLazyQueryHookResult = ReturnType<
    typeof useGetEditorProjectDetailsLazyQuery
>;
export type GetEditorProjectDetailsQueryResult = Apollo.QueryResult<
    GetEditorProjectDetailsQuery,
    GetEditorProjectDetailsQueryVariables
>;
export const GetProjectDetailsDocument = gql`
    query GetProjectDetails($id: String!) {
        project(id: $id) {
            ...ProjectDetails
        }
    }
    ${ProjectDetailsFragmentDoc}
`;

/**
 * __useGetProjectDetailsQuery__
 *
 * To run a query within a React component, call `useGetProjectDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectDetailsQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetProjectDetailsQuery,
        GetProjectDetailsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<
        GetProjectDetailsQuery,
        GetProjectDetailsQueryVariables
    >(GetProjectDetailsDocument, options);
}
export function useGetProjectDetailsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetProjectDetailsQuery,
        GetProjectDetailsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        GetProjectDetailsQuery,
        GetProjectDetailsQueryVariables
    >(GetProjectDetailsDocument, options);
}
export type GetProjectDetailsQueryHookResult = ReturnType<
    typeof useGetProjectDetailsQuery
>;
export type GetProjectDetailsLazyQueryHookResult = ReturnType<
    typeof useGetProjectDetailsLazyQuery
>;
export type GetProjectDetailsQueryResult = Apollo.QueryResult<
    GetProjectDetailsQuery,
    GetProjectDetailsQueryVariables
>;
export const GetProjectDetailsUserProjectsDocument = gql`
    query GetProjectDetailsUserProjects($userId: String!) {
        projects(user: $userId, sortByNewest: true, take: 4, isPublic: true) {
            id
            name
            description
            updatedAt
            isPublic
        }
    }
`;

/**
 * __useGetProjectDetailsUserProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectDetailsUserProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDetailsUserProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDetailsUserProjectsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetProjectDetailsUserProjectsQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetProjectDetailsUserProjectsQuery,
        GetProjectDetailsUserProjectsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<
        GetProjectDetailsUserProjectsQuery,
        GetProjectDetailsUserProjectsQueryVariables
    >(GetProjectDetailsUserProjectsDocument, options);
}
export function useGetProjectDetailsUserProjectsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetProjectDetailsUserProjectsQuery,
        GetProjectDetailsUserProjectsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        GetProjectDetailsUserProjectsQuery,
        GetProjectDetailsUserProjectsQueryVariables
    >(GetProjectDetailsUserProjectsDocument, options);
}
export type GetProjectDetailsUserProjectsQueryHookResult = ReturnType<
    typeof useGetProjectDetailsUserProjectsQuery
>;
export type GetProjectDetailsUserProjectsLazyQueryHookResult = ReturnType<
    typeof useGetProjectDetailsUserProjectsLazyQuery
>;
export type GetProjectDetailsUserProjectsQueryResult = Apollo.QueryResult<
    GetProjectDetailsUserProjectsQuery,
    GetProjectDetailsUserProjectsQueryVariables
>;
export const GetRecentProjectsDocument = gql`
    query GetRecentProjects($skip: Float!, $take: Float!) {
        projects(sortByNewest: true, isPublic: true, skip: $skip, take: $take) {
            ...UserProjectCard
        }
    }
    ${UserProjectCardFragmentDoc}
`;

/**
 * __useGetRecentProjectsQuery__
 *
 * To run a query within a React component, call `useGetRecentProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentProjectsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetRecentProjectsQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetRecentProjectsQuery,
        GetRecentProjectsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<
        GetRecentProjectsQuery,
        GetRecentProjectsQueryVariables
    >(GetRecentProjectsDocument, options);
}
export function useGetRecentProjectsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetRecentProjectsQuery,
        GetRecentProjectsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        GetRecentProjectsQuery,
        GetRecentProjectsQueryVariables
    >(GetRecentProjectsDocument, options);
}
export type GetRecentProjectsQueryHookResult = ReturnType<
    typeof useGetRecentProjectsQuery
>;
export type GetRecentProjectsLazyQueryHookResult = ReturnType<
    typeof useGetRecentProjectsLazyQuery
>;
export type GetRecentProjectsQueryResult = Apollo.QueryResult<
    GetRecentProjectsQuery,
    GetRecentProjectsQueryVariables
>;
export const GetUserDataSetDocument = gql`
    query GetUserDataSet($id: String!) {
        user(id: $id) {
            id
            datasets
        }
    }
`;

/**
 * __useGetUserDataSetQuery__
 *
 * To run a query within a React component, call `useGetUserDataSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataSetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserDataSetQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetUserDataSetQuery,
        GetUserDataSetQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetUserDataSetQuery, GetUserDataSetQueryVariables>(
        GetUserDataSetDocument,
        options
    );
}
export function useGetUserDataSetLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetUserDataSetQuery,
        GetUserDataSetQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        GetUserDataSetQuery,
        GetUserDataSetQueryVariables
    >(GetUserDataSetDocument, options);
}
export type GetUserDataSetQueryHookResult = ReturnType<
    typeof useGetUserDataSetQuery
>;
export type GetUserDataSetLazyQueryHookResult = ReturnType<
    typeof useGetUserDataSetLazyQuery
>;
export type GetUserDataSetQueryResult = Apollo.QueryResult<
    GetUserDataSetQuery,
    GetUserDataSetQueryVariables
>;
export const GetUserProfileDocument = gql`
    query GetUserProfile($name: String!) {
        user(name: $name) {
            ...UserProfile
        }
    }
    ${UserProfileFragmentDoc}
`;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetUserProfileQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetUserProfileQuery,
        GetUserProfileQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(
        GetUserProfileDocument,
        options
    );
}
export function useGetUserProfileLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetUserProfileQuery,
        GetUserProfileQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        GetUserProfileQuery,
        GetUserProfileQueryVariables
    >(GetUserProfileDocument, options);
}
export type GetUserProfileQueryHookResult = ReturnType<
    typeof useGetUserProfileQuery
>;
export type GetUserProfileLazyQueryHookResult = ReturnType<
    typeof useGetUserProfileLazyQuery
>;
export type GetUserProfileQueryResult = Apollo.QueryResult<
    GetUserProfileQuery,
    GetUserProfileQueryVariables
>;
export const GetUserProjectsDocument = gql`
    query GetUserProjects($user: String!) {
        projects(user: $user, sortByNewest: true) {
            ...UserProject
        }
    }
    ${UserProjectFragmentDoc}
`;

/**
 * __useGetUserProjectsQuery__
 *
 * To run a query within a React component, call `useGetUserProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProjectsQuery({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useGetUserProjectsQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetUserProjectsQuery,
        GetUserProjectsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(
        GetUserProjectsDocument,
        options
    );
}
export function useGetUserProjectsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetUserProjectsQuery,
        GetUserProjectsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        GetUserProjectsQuery,
        GetUserProjectsQueryVariables
    >(GetUserProjectsDocument, options);
}
export type GetUserProjectsQueryHookResult = ReturnType<
    typeof useGetUserProjectsQuery
>;
export type GetUserProjectsLazyQueryHookResult = ReturnType<
    typeof useGetUserProjectsLazyQuery
>;
export type GetUserProjectsQueryResult = Apollo.QueryResult<
    GetUserProjectsQuery,
    GetUserProjectsQueryVariables
>;
export const GetUsernameDocument = gql`
    query GetUsername($id: String!) {
        user(id: $id) {
            id
            name
        }
    }
`;

/**
 * __useGetUsernameQuery__
 *
 * To run a query within a React component, call `useGetUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsernameQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUsernameQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetUsernameQuery,
        GetUsernameQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetUsernameQuery, GetUsernameQueryVariables>(
        GetUsernameDocument,
        options
    );
}
export function useGetUsernameLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetUsernameQuery,
        GetUsernameQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetUsernameQuery, GetUsernameQueryVariables>(
        GetUsernameDocument,
        options
    );
}
export type GetUsernameQueryHookResult = ReturnType<typeof useGetUsernameQuery>;
export type GetUsernameLazyQueryHookResult = ReturnType<
    typeof useGetUsernameLazyQuery
>;
export type GetUsernameQueryResult = Apollo.QueryResult<
    GetUsernameQuery,
    GetUsernameQueryVariables
>;
export const IsUsernameAvailableDocument = gql`
    query IsUsernameAvailable($name: String!) {
        isUsernameAvailable(name: $name)
    }
`;

/**
 * __useIsUsernameAvailableQuery__
 *
 * To run a query within a React component, call `useIsUsernameAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUsernameAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUsernameAvailableQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useIsUsernameAvailableQuery(
    baseOptions: Apollo.QueryHookOptions<
        IsUsernameAvailableQuery,
        IsUsernameAvailableQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<
        IsUsernameAvailableQuery,
        IsUsernameAvailableQueryVariables
    >(IsUsernameAvailableDocument, options);
}
export function useIsUsernameAvailableLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        IsUsernameAvailableQuery,
        IsUsernameAvailableQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        IsUsernameAvailableQuery,
        IsUsernameAvailableQueryVariables
    >(IsUsernameAvailableDocument, options);
}
export type IsUsernameAvailableQueryHookResult = ReturnType<
    typeof useIsUsernameAvailableQuery
>;
export type IsUsernameAvailableLazyQueryHookResult = ReturnType<
    typeof useIsUsernameAvailableLazyQuery
>;
export type IsUsernameAvailableQueryResult = Apollo.QueryResult<
    IsUsernameAvailableQuery,
    IsUsernameAvailableQueryVariables
>;
export const RenameProjectDocument = gql`
    mutation RenameProject($id: String!, $name: String!) {
        editProject(id: $id, name: $name) {
            id
            name
            updatedAt
        }
    }
`;
export type RenameProjectMutationFn = Apollo.MutationFunction<
    RenameProjectMutation,
    RenameProjectMutationVariables
>;

/**
 * __useRenameProjectMutation__
 *
 * To run a mutation, you first call `useRenameProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameProjectMutation, { data, loading, error }] = useRenameProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameProjectMutation(
    baseOptions?: Apollo.MutationHookOptions<
        RenameProjectMutation,
        RenameProjectMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        RenameProjectMutation,
        RenameProjectMutationVariables
    >(RenameProjectDocument, options);
}
export type RenameProjectMutationHookResult = ReturnType<
    typeof useRenameProjectMutation
>;
export type RenameProjectMutationResult =
    Apollo.MutationResult<RenameProjectMutation>;
export type RenameProjectMutationOptions = Apollo.BaseMutationOptions<
    RenameProjectMutation,
    RenameProjectMutationVariables
>;
export const SaveProjectDocument = gql`
    mutation SaveProject($id: String!, $projectJson: String!) {
        editProject(id: $id, projectJson: $projectJson) {
            id
            projectJson
            updatedAt
        }
    }
`;
export type SaveProjectMutationFn = Apollo.MutationFunction<
    SaveProjectMutation,
    SaveProjectMutationVariables
>;

/**
 * __useSaveProjectMutation__
 *
 * To run a mutation, you first call `useSaveProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveProjectMutation, { data, loading, error }] = useSaveProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      projectJson: // value for 'projectJson'
 *   },
 * });
 */
export function useSaveProjectMutation(
    baseOptions?: Apollo.MutationHookOptions<
        SaveProjectMutation,
        SaveProjectMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        SaveProjectMutation,
        SaveProjectMutationVariables
    >(SaveProjectDocument, options);
}
export type SaveProjectMutationHookResult = ReturnType<
    typeof useSaveProjectMutation
>;
export type SaveProjectMutationResult =
    Apollo.MutationResult<SaveProjectMutation>;
export type SaveProjectMutationOptions = Apollo.BaseMutationOptions<
    SaveProjectMutation,
    SaveProjectMutationVariables
>;
export const SetUsernameDocument = gql`
    mutation SetUsername(
        $name: String!
        $sendUserTestingEmail: Boolean!
        $emailUpdates: Boolean!
    ) {
        setUsername(
            name: $name
            sendUserTestingEmail: $sendUserTestingEmail
            emailUpdates: $emailUpdates
        ) {
            name
        }
    }
`;
export type SetUsernameMutationFn = Apollo.MutationFunction<
    SetUsernameMutation,
    SetUsernameMutationVariables
>;

/**
 * __useSetUsernameMutation__
 *
 * To run a mutation, you first call `useSetUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUsernameMutation, { data, loading, error }] = useSetUsernameMutation({
 *   variables: {
 *      name: // value for 'name'
 *      sendUserTestingEmail: // value for 'sendUserTestingEmail'
 *      emailUpdates: // value for 'emailUpdates'
 *   },
 * });
 */
export function useSetUsernameMutation(
    baseOptions?: Apollo.MutationHookOptions<
        SetUsernameMutation,
        SetUsernameMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        SetUsernameMutation,
        SetUsernameMutationVariables
    >(SetUsernameDocument, options);
}
export type SetUsernameMutationHookResult = ReturnType<
    typeof useSetUsernameMutation
>;
export type SetUsernameMutationResult =
    Apollo.MutationResult<SetUsernameMutation>;
export type SetUsernameMutationOptions = Apollo.BaseMutationOptions<
    SetUsernameMutation,
    SetUsernameMutationVariables
>;
