import type {UserToken} from "~/types";

export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.client) {
        //客户端进行校验
        if(to.fullPath.match(/^\/admin.*$/)){
            // 这里是管理员端口
            const userToken = useCookie<UserToken>('userToken')

            if(userToken.value?.accessToken){
                // 如果访问token不存在，则直接跳到登录页


                // 如果存在，则在路由前，进行校验是否获取了用户信息，如果没有则获取


                // 获取完用户信息之后，再去判断是否有路由权限


            }else {
                return navigateTo('/signin')
            }

        }
    }
})