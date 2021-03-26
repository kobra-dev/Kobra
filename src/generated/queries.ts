import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type Query = {
  __typename?: 'Query';
  project?: Maybe<Project>;
  projects: Array<Project>;
  isUsernameAvailable: Scalars['Boolean'];
  getUsername?: Maybe<Scalars['String']>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};


export type QueryProjectsArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Float']>;
  take?: Maybe<Scalars['Float']>;
  sortByNewest?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  user?: Maybe<Scalars['String']>;
};


export type QueryIsUsernameAvailableArgs = {
  name: Scalars['String'];
};


export type QueryGetUsernameArgs = {
  id: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  projectJson?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  user: User;
  parent?: Maybe<Project>;
  children?: Maybe<Array<Project>>;
};


export type ProjectChildrenArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Float']>;
  take?: Maybe<Scalars['Float']>;
  sortByNewest?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  user?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  projects: Array<Project>;
};


export type UserProjectsArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Float']>;
  take?: Maybe<Scalars['Float']>;
  sortByNewest?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addProject: Project;
  editProject: Project;
  removeProject: Project;
  setUsername: User;
};


export type MutationAddProjectArgs = {
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  projectJson?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
};


export type MutationEditProjectArgs = {
  name?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  projectJson?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationRemoveProjectArgs = {
  id: Scalars['String'];
};


export type MutationSetUsernameArgs = {
  name: Scalars['String'];
};

export type AddProjectMutationVariables = Exact<{
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  projectJson?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
}>;


export type AddProjectMutation = (
  { __typename?: 'Mutation' }
  & { addProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id'>
  ) }
);

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & { removeProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id'>
  ) }
);

export type EditProjectDetailsMutationVariables = Exact<{
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
}>;


export type EditProjectDetailsMutation = (
  { __typename?: 'Mutation' }
  & { editProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'isPublic' | 'summary' | 'description'>
  ) }
);

export type GetEditorProjectDetailsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetEditorProjectDetailsQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'userId' | 'name' | 'isPublic' | 'summary' | 'description' | 'projectJson'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ) }
  )> }
);

export type GetProjectDetailsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProjectDetailsQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & ProjectDetailsFragment
  )> }
);

export type ProjectDetailsFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'createdAt' | 'updatedAt' | 'userId' | 'name' | 'isPublic' | 'description' | 'summary'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'name'>
    & { projects: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name' | 'description' | 'updatedAt' | 'isPublic'>
    )> }
  ), parent?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'userId'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ) }
  )>, children?: Maybe<Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id'>
  )>> }
);

export type GetUserProjectsQueryVariables = Exact<{
  user: Scalars['String'];
}>;


export type GetUserProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'Project' }
    & UserProjectFragment
  )> }
);

export type UserProjectFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'name' | 'isPublic' | 'summary' | 'updatedAt'>
);

export type GetUsernameQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUsernameQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getUsername'>
);

export type IsUsernameAvailableQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type IsUsernameAvailableQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isUsernameAvailable'>
);

export type RenameProjectMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type RenameProjectMutation = (
  { __typename?: 'Mutation' }
  & { editProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id'>
  ) }
);

export type SaveProjectMutationVariables = Exact<{
  id: Scalars['String'];
  projectJson: Scalars['String'];
}>;


export type SaveProjectMutation = (
  { __typename?: 'Mutation' }
  & { editProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id'>
  ) }
);

export type SetUsernameMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type SetUsernameMutation = (
  { __typename?: 'Mutation' }
  & { setUsername: (
    { __typename?: 'User' }
    & Pick<User, 'name'>
  ) }
);

export const ProjectDetailsFragmentDoc = gql`
    fragment ProjectDetails on Project {
  createdAt
  updatedAt
  userId
  user {
    name
    projects(sortByNewest: true, take: 3, isPublic: true) {
      id
      name
      description
      updatedAt
      isPublic
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
    id
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
}
    `;
export const AddProjectDocument = gql`
    mutation AddProject($name: String!, $isPublic: Boolean!, $summary: String, $description: String, $projectJson: String, $parentId: String) {
  addProject(
    name: $name
    isPublic: $isPublic
    summary: $summary
    description: $description
    projectJson: $projectJson
    parentId: $parentId
  ) {
    id
  }
}
    `;
export type AddProjectMutationFn = Apollo.MutationFunction<AddProjectMutation, AddProjectMutationVariables>;

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
export function useAddProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>) {
        return Apollo.useMutation<AddProjectMutation, AddProjectMutationVariables>(AddProjectDocument, baseOptions);
      }
export type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>;
export type AddProjectMutationResult = Apollo.MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = Apollo.BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($id: String!) {
  removeProject(id: $id) {
    id
  }
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

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
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, baseOptions);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const EditProjectDetailsDocument = gql`
    mutation EditProjectDetails($id: String!, $name: String, $isPublic: Boolean, $summary: String, $description: String) {
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
  }
}
    `;
export type EditProjectDetailsMutationFn = Apollo.MutationFunction<EditProjectDetailsMutation, EditProjectDetailsMutationVariables>;

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
export function useEditProjectDetailsMutation(baseOptions?: Apollo.MutationHookOptions<EditProjectDetailsMutation, EditProjectDetailsMutationVariables>) {
        return Apollo.useMutation<EditProjectDetailsMutation, EditProjectDetailsMutationVariables>(EditProjectDetailsDocument, baseOptions);
      }
export type EditProjectDetailsMutationHookResult = ReturnType<typeof useEditProjectDetailsMutation>;
export type EditProjectDetailsMutationResult = Apollo.MutationResult<EditProjectDetailsMutation>;
export type EditProjectDetailsMutationOptions = Apollo.BaseMutationOptions<EditProjectDetailsMutation, EditProjectDetailsMutationVariables>;
export const GetEditorProjectDetailsDocument = gql`
    query GetEditorProjectDetails($id: String!) {
  project(id: $id) {
    userId
    user {
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
export function useGetEditorProjectDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetEditorProjectDetailsQuery, GetEditorProjectDetailsQueryVariables>) {
        return Apollo.useQuery<GetEditorProjectDetailsQuery, GetEditorProjectDetailsQueryVariables>(GetEditorProjectDetailsDocument, baseOptions);
      }
export function useGetEditorProjectDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEditorProjectDetailsQuery, GetEditorProjectDetailsQueryVariables>) {
          return Apollo.useLazyQuery<GetEditorProjectDetailsQuery, GetEditorProjectDetailsQueryVariables>(GetEditorProjectDetailsDocument, baseOptions);
        }
export type GetEditorProjectDetailsQueryHookResult = ReturnType<typeof useGetEditorProjectDetailsQuery>;
export type GetEditorProjectDetailsLazyQueryHookResult = ReturnType<typeof useGetEditorProjectDetailsLazyQuery>;
export type GetEditorProjectDetailsQueryResult = Apollo.QueryResult<GetEditorProjectDetailsQuery, GetEditorProjectDetailsQueryVariables>;
export const GetProjectDetailsDocument = gql`
    query GetProjectDetails($id: String!) {
  project(id: $id) {
    ...ProjectDetails
  }
}
    ${ProjectDetailsFragmentDoc}`;

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
export function useGetProjectDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>) {
        return Apollo.useQuery<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(GetProjectDetailsDocument, baseOptions);
      }
export function useGetProjectDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>) {
          return Apollo.useLazyQuery<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(GetProjectDetailsDocument, baseOptions);
        }
export type GetProjectDetailsQueryHookResult = ReturnType<typeof useGetProjectDetailsQuery>;
export type GetProjectDetailsLazyQueryHookResult = ReturnType<typeof useGetProjectDetailsLazyQuery>;
export type GetProjectDetailsQueryResult = Apollo.QueryResult<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>;
export const GetUserProjectsDocument = gql`
    query GetUserProjects($user: String!) {
  projects(user: $user) {
    ...UserProject
  }
}
    ${UserProjectFragmentDoc}`;

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
export function useGetUserProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
        return Apollo.useQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, baseOptions);
      }
export function useGetUserProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
          return Apollo.useLazyQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, baseOptions);
        }
export type GetUserProjectsQueryHookResult = ReturnType<typeof useGetUserProjectsQuery>;
export type GetUserProjectsLazyQueryHookResult = ReturnType<typeof useGetUserProjectsLazyQuery>;
export type GetUserProjectsQueryResult = Apollo.QueryResult<GetUserProjectsQuery, GetUserProjectsQueryVariables>;
export const GetUsernameDocument = gql`
    query GetUsername($id: String!) {
  getUsername(id: $id)
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
export function useGetUsernameQuery(baseOptions: Apollo.QueryHookOptions<GetUsernameQuery, GetUsernameQueryVariables>) {
        return Apollo.useQuery<GetUsernameQuery, GetUsernameQueryVariables>(GetUsernameDocument, baseOptions);
      }
export function useGetUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsernameQuery, GetUsernameQueryVariables>) {
          return Apollo.useLazyQuery<GetUsernameQuery, GetUsernameQueryVariables>(GetUsernameDocument, baseOptions);
        }
export type GetUsernameQueryHookResult = ReturnType<typeof useGetUsernameQuery>;
export type GetUsernameLazyQueryHookResult = ReturnType<typeof useGetUsernameLazyQuery>;
export type GetUsernameQueryResult = Apollo.QueryResult<GetUsernameQuery, GetUsernameQueryVariables>;
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
export function useIsUsernameAvailableQuery(baseOptions: Apollo.QueryHookOptions<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>) {
        return Apollo.useQuery<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>(IsUsernameAvailableDocument, baseOptions);
      }
export function useIsUsernameAvailableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>) {
          return Apollo.useLazyQuery<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>(IsUsernameAvailableDocument, baseOptions);
        }
export type IsUsernameAvailableQueryHookResult = ReturnType<typeof useIsUsernameAvailableQuery>;
export type IsUsernameAvailableLazyQueryHookResult = ReturnType<typeof useIsUsernameAvailableLazyQuery>;
export type IsUsernameAvailableQueryResult = Apollo.QueryResult<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>;
export const RenameProjectDocument = gql`
    mutation RenameProject($id: String!, $name: String!) {
  editProject(id: $id, name: $name) {
    id
  }
}
    `;
export type RenameProjectMutationFn = Apollo.MutationFunction<RenameProjectMutation, RenameProjectMutationVariables>;

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
export function useRenameProjectMutation(baseOptions?: Apollo.MutationHookOptions<RenameProjectMutation, RenameProjectMutationVariables>) {
        return Apollo.useMutation<RenameProjectMutation, RenameProjectMutationVariables>(RenameProjectDocument, baseOptions);
      }
export type RenameProjectMutationHookResult = ReturnType<typeof useRenameProjectMutation>;
export type RenameProjectMutationResult = Apollo.MutationResult<RenameProjectMutation>;
export type RenameProjectMutationOptions = Apollo.BaseMutationOptions<RenameProjectMutation, RenameProjectMutationVariables>;
export const SaveProjectDocument = gql`
    mutation SaveProject($id: String!, $projectJson: String!) {
  editProject(id: $id, projectJson: $projectJson) {
    id
  }
}
    `;
export type SaveProjectMutationFn = Apollo.MutationFunction<SaveProjectMutation, SaveProjectMutationVariables>;

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
export function useSaveProjectMutation(baseOptions?: Apollo.MutationHookOptions<SaveProjectMutation, SaveProjectMutationVariables>) {
        return Apollo.useMutation<SaveProjectMutation, SaveProjectMutationVariables>(SaveProjectDocument, baseOptions);
      }
export type SaveProjectMutationHookResult = ReturnType<typeof useSaveProjectMutation>;
export type SaveProjectMutationResult = Apollo.MutationResult<SaveProjectMutation>;
export type SaveProjectMutationOptions = Apollo.BaseMutationOptions<SaveProjectMutation, SaveProjectMutationVariables>;
export const SetUsernameDocument = gql`
    mutation SetUsername($name: String!) {
  setUsername(name: $name) {
    name
  }
}
    `;
export type SetUsernameMutationFn = Apollo.MutationFunction<SetUsernameMutation, SetUsernameMutationVariables>;

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
 *   },
 * });
 */
export function useSetUsernameMutation(baseOptions?: Apollo.MutationHookOptions<SetUsernameMutation, SetUsernameMutationVariables>) {
        return Apollo.useMutation<SetUsernameMutation, SetUsernameMutationVariables>(SetUsernameDocument, baseOptions);
      }
export type SetUsernameMutationHookResult = ReturnType<typeof useSetUsernameMutation>;
export type SetUsernameMutationResult = Apollo.MutationResult<SetUsernameMutation>;
export type SetUsernameMutationOptions = Apollo.BaseMutationOptions<SetUsernameMutation, SetUsernameMutationVariables>;