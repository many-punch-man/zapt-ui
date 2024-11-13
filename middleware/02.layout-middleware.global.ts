export default defineNuxtRouteMiddleware((to, from) => {
    if (to.fullPath.match(/^\/admin.*$/)) {
        setPageLayout("admin-layout")
    }else {
        setPageLayout("default")
    }
})