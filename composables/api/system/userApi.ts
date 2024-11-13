// system user api


import {fetchDelete} from "~/composables/fetch";
import type {UnwrapRef} from "vue";

export const deleteUserById = async (id: UnwrapRef<UserVO["id"]>) => {
    await fetchDelete('/system/user/delete', {
        params: {
            id
        }
    })
}