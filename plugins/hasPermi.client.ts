/** 自定义指令，用来判断用户是否有权限. 因为用户权限不放在cookies里面。所以只需要在客户端进行判断就可以了
 *
 * v-hasPermi="['strain:freezing-tube-stock-pre-entry:delete']"
 */
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('hasPermi', {
        mounted(el, binding) {
            //获取绑定的值
            const {value} = binding
            const all_permission = '*:*:*'

            const permissions = useUserStore().getPermissions
            if (value && value instanceof Array && value.length > 0) {
                const permissionFlag = value

                const hasPermissions = permissions.some((permission: string) => {
                    return all_permission === permission || permissionFlag.includes(permission)
                })
                if (!hasPermissions) {
                    el.parentNode && el.parentNode.removeChild(el)
                }
            } else {
                throw new Error('Please set the operation permission label value')
            }
        }
    })
})