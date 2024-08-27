import type {NitroFetchOptions} from "nitropack";

type CommonResponse<repT> =  {
    code: number
    msg: string
    data: repT
}

type customerOptions = {
    isToken?: boolean,
    row?: boolean
}


type ApiOptions = NitroFetchOptions<any> & customerOptions