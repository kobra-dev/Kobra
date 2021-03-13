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
  user?: Maybe<Scalars['String']>;
  searchTerm?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Float']>;
  take?: Maybe<Scalars['Float']>;
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
  description?: Maybe<Scalars['String']>;
  projectJson?: Maybe<Scalars['String']>;
  user: User;
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  projects: Array<Project>;
};


export type UserProjectsArgs = {
  where?: Maybe<ProjectWhereInput>;
  orderBy?: Maybe<Array<ProjectOrderByInput>>;
  cursor?: Maybe<ProjectWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<Array<ProjectScalarFieldEnum>>;
};

export type ProjectWhereInput = {
  AND?: Maybe<Array<ProjectWhereInput>>;
  OR?: Maybe<Array<ProjectWhereInput>>;
  NOT?: Maybe<Array<ProjectWhereInput>>;
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserRelationFilter>;
  userId?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  isPublic?: Maybe<BoolFilter>;
  description?: Maybe<StringNullableFilter>;
  projectJson?: Maybe<StringNullableFilter>;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringFilter>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type NestedStringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type UserRelationFilter = {
  is?: Maybe<UserWhereInput>;
  isNot?: Maybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  id?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  projects?: Maybe<ProjectListRelationFilter>;
};

export type ProjectListRelationFilter = {
  every?: Maybe<ProjectWhereInput>;
  some?: Maybe<ProjectWhereInput>;
  none?: Maybe<ProjectWhereInput>;
};

export type BoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type NestedBoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type StringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type NestedStringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type ProjectOrderByInput = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  user?: Maybe<UserOrderByInput>;
  userId?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  isPublic?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  projectJson?: Maybe<SortOrder>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type UserOrderByInput = {
  id?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
};

export type ProjectWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export enum ProjectScalarFieldEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  Name = 'name',
  IsPublic = 'isPublic',
  Description = 'description',
  ProjectJson = 'projectJson'
}

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


export type MutationSetUsernameArgs = {
  name: Scalars['String'];
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
    { __typename?: 'Project' }
    & Pick<Project, 'id'>
  ) }
);

export type GetUserProjectsQueryVariables = Exact<{
  user: Scalars['String'];
}>;


export type GetUserProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'isPublic' | 'description' | 'updatedAt'>
  )> }
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


export const AddProjectDocument = gql`
    mutation AddProject($user: String!, $name: String!, $isPublic: Boolean!, $description: String, $projectJson: String) {
  addProject(
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
export const GetUserProjectsDocument = gql`
    query GetUserProjects($user: String!) {
  projects(user: $user) {
    id
    name
    isPublic
    description
    updatedAt
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