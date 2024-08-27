/*
    useAsyncData(key,handler,option)
    这个handler是一个异步函数。所以按道理，我们可以自定义这个函数，使得它可以实现发送错误的时候，自动刷新token
 */


import type {CookieRef} from "nuxt/app";

import type {NitroFetchOptions} from "nitropack";
import type {ApiOptions, CommonResponse} from "~/types";

/**
 * interface FetchOptions {
 *     baseURL?: string;
 *     body?: RequestInit["body"] | Record<string, any>;
 *     ignoreResponseError?: boolean;
 *     params?: Record<string, any>;
 *     query?: Record<string, any>;
 *     parseResponse?: (responseText: string) => any;
 *     responseType?: R;
 *     duplex?: "half" | undefined;
 *     timeout?: number;
 *     retry?: number | false;
 *     retryDelay?: number;
 *     retryStatusCodes?: number[];
 *     onRequest?(context: FetchContext): Promise<void> | void;
 *     onRequestError?(context: FetchContext & {
 *         error: Error;
 *     }): Promise<void> | void;
 *     onResponse?(context: FetchContext & {
 *         response: FetchResponse<R>;
 *     }): Promise<void> | void;
 *     onResponseError?(context: FetchContext & {
 *         response: FetchResponse<R>;
 *     }): Promise<void> | void;
 * }
 *
 * interface NitroFetchOptions<R extends NitroFetchRequest, M extends AvailableRouterMethod<R> = AvailableRouterMethod<R>> extends FetchOptions {
 *     method?: Uppercase<M> | M;
 * }
 * interface UseFetchOptions<ResT, DataT = ResT, PickKeys extends KeysOf<DataT> = KeysOf<DataT>, DefaultT = DefaultAsyncDataValue, R extends NitroFetchRequest = string & {}, M extends AvailableRouterMethod<R> = AvailableRouterMethod<R>> extends Omit<AsyncDataOptions<ResT, DataT, PickKeys, DefaultT>, 'watch'>, ComputedFetchOptions<R, M> {
 *     key?: string;
 *     $fetch?: typeof globalThis.$fetch;
 *     watch?: MultiWatchSources | false;
 * }
 */


export default defineNuxtPlugin((nuxtApp) => {



    let requestList: any[] = []
// 是否正在刷新中
    let isRefreshToken = false
// 请求白名单，无须token的接口
    const whiteList: string[] = ['/login', '/refresh-token']

    function isCommonResponse<repT>(arg: any): arg is CommonResponse<repT> {
        return arg && typeof arg.code === 'number' && typeof arg.msg === 'string' && arg.data !== undefined;
    }

    //define api function
    async function api<repT = any>(url: string, options: ApiOptions): Promise<any> {
        ////////////////////////////////请求前进行拦截的逻辑///////////////////
        // 请求前的逻辑
        // 1. 判断是否需要token
        let isToken = options.isToken ?? true
        // 白名单不需要token
        whiteList.some((item) => {
            if (url.includes(item)) {
                isToken = false
                return true
            }
            return false
        })
        //get cookies
        const userToken: CookieRef<UserToken> = useCookie('userToken', {
            maxAge: 60 * 60 * 24 * 7,
        })

        console.log("isToken", isToken,userToken.value)
        if (isToken && userToken.value.accessToken) {
            // 设置请求头
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${userToken.value.accessToken}`
            }
        } else {
            console.log("no token")
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer 123456789`
            }
        }

        //默认请求头
        const defaultOptions = {
            baseURL: 'http://localhost:1023/admin-api',
            method: 'GET',
        }


        const newOptions = {
            ...defaultOptions,
            ...options
        }
        ////////////////////////////////请求前进行拦截的逻辑///////////////////
        console.log("请求拦截完成------------>{}", newOptions)
        try {
            //  这里进行发送请求
            const response = await $fetch(url, newOptions as NitroFetchOptions<any>);
            console.log("发送请求------------>{}", response)

            if(isCommonResponse(response)){
                if (response.code === 401) {
                    console.log("发生401错误------->{}", response)
                    if (!isRefreshToken) {

                        try {
                            isRefreshToken = true
                            if (!userToken.value.refreshToken) {
                                // 1. 如果获取不到刷新令牌，则只能执行登出操作
                                navigateTo("/login")
                            }

                            // 1. 尝试刷新令牌

                            const refreshResp: any = await api(`/system/auth/refresh-token`, {
                                ...defaultOptions,
                                method: 'POST',
                                query: {
                                    refreshToken: userToken.value.refreshToken
                                }
                            })
                            console.log("刷新令牌成功------------>{}", refreshResp)

                            //刷新成功了，设置到cookies
                            userToken.value = refreshResp.data

                            // 2.1 放回队列的请求 + 当前请求
                            requestList.forEach((cb) => {
                                cb()
                            })
                            requestList = []
                            // 重新请求一次
                            return api<repT>(url, options);
                        } catch (error) {
                            console.log("捕获刷新令牌时候发生的Promise错误------->{}", response)
                            // 捕获刷新令牌时候发生的Promise错误

                            //发生错误了，直接失败，跳到登录页面
                            console.log("refresh token error", error)
                            //处理方法栈
                            requestList.forEach((cb: any) => {
                                cb()
                            })

                            // 清除token
                            userToken.value = {
                                accessToken: '',
                                refreshToken: '',
                                expiresTime: 0,
                                userId: ''
                            }

                            //跳转
                            navigateTo("/login")
                        } finally {
                            isRefreshToken = false
                        }
                    } else {
                        //加入队列，进行等待
                        return new Promise((resolve) => {
                            requestList.push(() => {
                                resolve(api<repT>(url, options))
                            })
                        })
                    }
                } else if (response.code === 500) {
                    //服务器错误
                    //todo 这里需要提示
                    console.log("发生500错误------->{}", response)
                    return Promise.reject(response)
                }  else if (response.code != 200) {
                    //其他错误
                    //todo 这里需要提示
                    console.log("发生其他错误------->{}", response)
                    return Promise.reject(response)
                } else {
                    console.log("返回响应数据------------>{}", response.data)
                    return Promise.resolve(response.data)
                }
            }else {
                console.log("返回原始数据----->{}", response)
                return Promise.resolve(response)
            }
////////////////////////////////响应请求逻辑//////////////////////////////

////////////////////////////////结束响应//////////////////////////////
        } catch (error) {

            console.warn("发送请求的时候发生错误------------>{}", error)
            return Promise.reject(error);
        }
        // 走到这里还没有执行的话，那就是发生了意外错误
        return Promise.reject("Unexpected error");
    }
    return {
        provide: {
            api
        }
    }
})