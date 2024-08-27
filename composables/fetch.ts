import type {ApiOptions, CommonResponse} from "~/types";


export const fetchGet = async<T> (url:string, option?:ApiOptions)=>{
    const {$api} = useNuxtApp()
    const res =  await $api<CommonResponse<T>>(url, {method:'GET',...option})
    return res as unknown as T
}

export const fetchGetOriginal = async<T> (url:string, option?:ApiOptions)=>{
    const {$api} = useNuxtApp()
    return await $api<T>(url, {method: 'GET', ...option})
}

export const fetchPost = async<T> (url:string, option?:ApiOptions)=>{
    const {$api} = useNuxtApp()
    const res =  await $api<CommonResponse<T>>(url, {method:'POST',...option})
    return res as unknown as T
}

export const fetchPostOriginal = async<T> (url:string, option?:ApiOptions)=>{
    const {$api} = useNuxtApp()
    return await $api<T>(url, {method: 'POST', ...option})
}

export const fetchDelete = async<T> (url:string, option?:ApiOptions)=>{
    const {$api} = useNuxtApp()
    const res =  await $api<CommonResponse<T>>(url, {method:'DELETE',...option})
    return res as unknown as T
}


export const fetchPut = async<T> (url:string, option?:ApiOptions)=>{
    const {$api} = useNuxtApp()
    const res =  await $api<CommonResponse<T>>(url, {method:'PUT',...option})
    return res as unknown as T
}

export const fetchDownload = async<T> (url:string, option?:ApiOptions)=>{
    const {$api} = useNuxtApp()
    const res =  await $api<T>(url, {method:'GET', responseType:'blob',...option})
    return res as unknown as Promise<T>
}
