/** 自定义指令，用来判断用户是否有某个角色
 *
 * v-hasRole="['super_admin', 'strain_warehouseman']"
 */
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('hasRole', {
        mounted(el, binding) {
            // 获取用户角色列表
            const { value } = binding
            const roles = useUserStore().getRoles
            const super_admin = 'admin'

            if (value && value instanceof Array && value.length > 0) {
                const roleFlag = value
                const hasRole = roles.some((role: string) => {
                    return super_admin === role || roleFlag.includes(role)
                })
                if (!hasRole) {
                    el.parentNode && el.parentNode.removeChild(el)
                }
            } else {
                throw new Error('Please set the role permission tag value')
            }
        }
    })
})