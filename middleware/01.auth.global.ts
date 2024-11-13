import {useUserStore} from "~/composables/useUserStore";
import {useDictStore} from "~/composables/useDictStore";

const whiteList = [
    '/admin/signin',
    '/admin/signup',
]

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.client) {
        const userToken = useCookie<UserToken>('userToken')

        //客户端进行校验
        if (to.fullPath.match(/^\/admin.*$/)) {
            // 这里是管理员端口
            if (userToken.value?.accessToken) {
                // 获取字典缓存
                const dictStore = useDictStore()
                if(!dictStore.isSetDict){
                    await dictStore.setDictMap()
                }

                // 从localStorage中加载用户信息
                useUserStore().loadState();

                if (!useUserStore().getIsSetUser) {
                    // 如果pinia中，没有用户信息，则请求接口获取用户信息
                    await useUserStore().setUserInfoAction()

                    //获取后台赋予的权限列表
                    const permissionList = useUserStore().getMenus
                    // todo 后续校验路由权限

                    return
                } else {
                    //todo 后续校验路由权限
                    return
                }
            } else {
                // 如果访问token不存在，则直接跳到登录页
                useMessage().error('Please login first')
                return navigateTo('/signin')
            }

        } else if (to.fullPath === '/signin') {
            if (userToken.value?.accessToken) {
                console.log("middleware: accessToken存在，重定向")
                return navigateTo("/admin")
            }
            return
        }
    }
})