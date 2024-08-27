import type {CommonResponse} from "~/types";


export const getTestAPI = async () => {
    const data =  await fetchAppGet<string>("/test/index")
    return data
}