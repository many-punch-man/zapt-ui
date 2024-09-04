import type {NitroFetchOptions} from "nitropack";

type CommonResponse<repT> =  {
    code: number
    msg: string
    data: repT
}

type PageResult<T> = {
    total: number
    list: T[]
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


type menuItem = {
    alwaysShow: boolean
    children: menuItem[]
    component: string
    componentName: string
    icon: string
    id: number
    keepAlive: boolean
    name: string
    parentId: number
    path: string
    visible: boolean
}

type UserVO = {
    id: number
    avatar: string
    username: string
    deptId: number
}

type UserInfoVO = {
    permissions: string[]
    roles: string[]
    isSetUser: boolean
    user: UserVO,
    menus: menuItem[]
}