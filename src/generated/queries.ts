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
  getProjectsByUser: Array<Project>;
  dataset: Dataset;
  datasets: Array<Dataset>;
  getDatasetContents: Scalars['String'];
  updates: Array<Update>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};


export type QueryGetProjectsByUserArgs = {
  user: Scalars['String'];
};


export type QueryDatasetArgs = {
  id: Scalars['Float'];
};


export type QueryGetDatasetContentsArgs = {
  id: Scalars['Float'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  user: Scalars['String'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  projectJson?: Maybe<Scalars['String']>;
  lastModified: Scalars['DateTime'];
};


export type Dataset = {
  __typename?: 'Dataset';
  id: Scalars['ID'];
  user: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type Update = {
  __typename?: 'Update';
  title: Scalars['String'];
  contents: Scalars['String'];
  date: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProject: AddProjectStatus;
  editProject: EditProjectStatus;
  removeProject: EditProjectStatus;
  addDataset: Dataset;
  editDataset: Dataset;
  editDatasetContents: Scalars['Boolean'];
  removeDataset: Scalars['Boolean'];
};


export type MutationAddProjectArgs = {
  user: Scalars['String'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  projectJson?: Maybe<Scalars['String']>;
};


export type MutationEditProjectArgs = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  projectJson?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationRemoveProjectArgs = {
  id: Scalars['String'];
};


export type MutationAddDatasetArgs = {
  newDatasetData: NewDatasetInput;
};


export type MutationEditDatasetArgs = {
  newDatasetData: NewDatasetInput;
  id: Scalars['Float'];
};


export type MutationEditDatasetContentsArgs = {
  newContents: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationRemoveDatasetArgs = {
  id: Scalars['Float'];
};

export type AddProjectStatus = {
  __typename?: 'AddProjectStatus';
  id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type EditProjectStatus = {
  __typename?: 'EditProjectStatus';
  success: Scalars['Boolean'];
  nModified: Scalars['Float'];
};

export type NewDatasetInput = {
  user: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  b64Data?: Maybe<Scalars['String']>;
};

export type AddProjectMutationVariables = Exact<{
  user: Scalars['String'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  projectJson?: Maybe<Scalars['String']>;
}>;


export type AddProjectMutation = (
  { __typename?: 'Mutation' }
  & { addProject: (
    { __typename?: 'AddProjectStatus' }
    & Pick<AddProjectStatus, 'id'>
  ) }
);

export type NewProjectFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'user' | 'name' | 'description' | 'projectJson' | 'isPublic'>
);

export type GetUpdatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUpdatesQuery = (
  { __typename?: 'Query' }
  & { updates: Array<(
    { __typename?: 'Update' }
    & Pick<Update, 'title' | 'contents' | 'date'>
  )> }
);

export type GetUserProjectsQueryVariables = Exact<{
  user: Scalars['String'];
}>;


export type GetUserProjectsQuery = (
  { __typename?: 'Query' }
  & { getProjectsByUser: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'isPublic' | 'description' | 'lastModified'>
  )> }
);

export type RenameProjectMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type RenameProjectMutation = (
  { __typename?: 'Mutation' }
  & { editProject: (
    { __typename?: 'EditProjectStatus' }
    & Pick<EditProjectStatus, 'success' | 'nModified'>
  ) }
);

export type SaveProjectMutationVariables = Exact<{
  id: Scalars['String'];
  projectJson: Scalars['String'];
}>;


export type SaveProjectMutation = (
  { __typename?: 'Mutation' }
  & { editProject: (
    { __typename?: 'EditProjectStatus' }
    & Pick<EditProjectStatus, 'success' | 'nModified'>
  ) }
);

export const NewProjectFragmentDoc = gql`
    fragment NewProject on Project {
  id
  user
  name
  description
  projectJson
  isPublic
}
    `;
export const AddProjectDocument = gql`
    mutation AddProject($user: String!, $name: String!, $isPublic: Boolean!, $description: String, $projectJson: String) {
  addProject(
    user: $user
    name: $name
    isPublic: $isPublic
    description: $description
    projectJson: $projectJson
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
 *      user: // value for 'user'
 *      name: // value for 'name'
 *      isPublic: // value for 'isPublic'
 *      description: // value for 'description'
 *      projectJson: // value for 'projectJson'
 *   },
 * });
 */
export function useAddProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>) {
        return Apollo.useMutation<AddProjectMutation, AddProjectMutationVariables>(AddProjectDocument, baseOptions);
      }
export type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>;
export type AddProjectMutationResult = Apollo.MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = Apollo.BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export const GetUpdatesDocument = gql`
    query GetUpdates {
  updates {
    title
    contents
    date
  }
}
    `;

/**
 * __useGetUpdatesQuery__
 *
 * To run a query within a React component, call `useGetUpdatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpdatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpdatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUpdatesQuery(baseOptions?: Apollo.QueryHookOptions<GetUpdatesQuery, GetUpdatesQueryVariables>) {
        return Apollo.useQuery<GetUpdatesQuery, GetUpdatesQueryVariables>(GetUpdatesDocument, baseOptions);
      }
export function useGetUpdatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUpdatesQuery, GetUpdatesQueryVariables>) {
          return Apollo.useLazyQuery<GetUpdatesQuery, GetUpdatesQueryVariables>(GetUpdatesDocument, baseOptions);
        }
export type GetUpdatesQueryHookResult = ReturnType<typeof useGetUpdatesQuery>;
export type GetUpdatesLazyQueryHookResult = ReturnType<typeof useGetUpdatesLazyQuery>;
export type GetUpdatesQueryResult = Apollo.QueryResult<GetUpdatesQuery, GetUpdatesQueryVariables>;
export const GetUserProjectsDocument = gql`
    query GetUserProjects($user: String!) {
  getProjectsByUser(user: $user) {
    id
    name
    isPublic
    description
    lastModified
  }
}
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
export function useGetUserProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
        return Apollo.useQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, baseOptions);
      }
export function useGetUserProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
          return Apollo.useLazyQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, baseOptions);
        }
export type GetUserProjectsQueryHookResult = ReturnType<typeof useGetUserProjectsQuery>;
export type GetUserProjectsLazyQueryHookResult = ReturnType<typeof useGetUserProjectsLazyQuery>;
export type GetUserProjectsQueryResult = Apollo.QueryResult<GetUserProjectsQuery, GetUserProjectsQueryVariables>;
export const RenameProjectDocument = gql`
    mutation RenameProject($id: String!, $name: String!) {
  editProject(id: $id, name: $name) {
    success
    nModified
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
    success
    nModified
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