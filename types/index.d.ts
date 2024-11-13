import type {NitroFetchOptions} from "nitropack";

declare global {
    type CommonResponse<repT> = {
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

    type Tree = {
        id: number
        name: string
        children?: Tree[] | any[]
    }
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

    type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

    /**
     * 获取 dictType 对应的数据字典数组
     *
     * @param dictType 数据类型
     * @returns {*|Array} 数据字典数组
     */
    type DictDataType = {
        dictType: string
        label: string
        value: string | number | boolean
        colorType: ElementPlusInfoType | ''
        cssClass: string
    }

    type NumberDictDataType = DictDataType & {
        value: number | string
    }

// 导入其他的类型声明文件
    import './system'

}
