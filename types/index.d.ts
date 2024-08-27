import type {NitroFetchOptions} from "nitropack";

type CommonResponse<repT> =  {
    code: number
    msg: string
    data: repT
}

type customerOptions = {
    isToken?: boolean,
    isApp?: boolean,
}


type ApiOptions = NitroFetchOptions<any> & customerOptions


////////// auth 相关的类型


type UserToken = {
    accessToken: string
    refreshToken: string
    expiresTime: number
    userId: string
}