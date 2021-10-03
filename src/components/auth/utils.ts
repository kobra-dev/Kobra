import { MutationUpdaterFn } from "@apollo/client";
import {
    GetUsernameDocument,
    SetUsernameMutation
} from "src/generated/queries";

export const setUsernameCacheUpdate: {
    (
        newUserUid: string
    ): MutationUpdaterFn<SetUsernameMutation>;
} =
    (newUserUid: string) =>
    (cache, { data }) => {
        cache.writeQuery({
            query: GetUsernameDocument,
            variables: {
                id: newUserUid
            },
            data: {
                user: {
                    id: newUserUid,
                    name: data?.setUsername.name
                }
            }
        });
    };
