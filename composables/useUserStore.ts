import type {menuItem, UserInfoVO, UserToken, UserVO} from "~/types";


const getUserInfo = async () => {
    return await fetchGet<UserInfoVO>('/system/auth/get-permission-info');
}

const loginOut = async () => {
    return await fetchPost('/system/auth/logout');
}


export const useUserStore = defineStore('user', {
    state: () :UserInfoVO => ({
        permissions: [],
        roles: [],
        isSetUser: false,
        user: {
            id: 0,
            avatar: '',
            username: '',
            deptId: 0,
        },
        menus: []
    }),
    getters: {
        getPermissions(): string[] {
            return this.permissions
        },
        getRoles(): string[] {
            return this.roles
        },
        getIsSetUser(): boolean {
            return this.isSetUser
        },
        getUser(): UserVO {
            return this.user
        },
        getMenus(): menuItem[] {
            return this.menus
        },
    },
    actions: {
        async setUserInfoAction() {
            this.loadState()
            const userToken = useCookie<UserToken>('userToken')
            // console.log('利用token获取用户信息', userToken.value)
            if (!userToken.value?.accessToken) {
                this.resetState()
                return null
            }

            let user = this.getUser
            //如果id为0，说明没有用户信息
            if (user.id == 0) {
                const userInfo = await getUserInfo()
                console.log('userInfo', userInfo)
                this.user = userInfo.user
                this.permissions = userInfo.permissions
                this.isSetUser = true
                this.roles = userInfo.roles
                this.menus = userInfo.menus
            }
            this.saveState()
        },
        async loginOut() {
            await loginOut()
            const userToken = useCookie<UserToken>('userToken')
            userToken.value = {
                accessToken: '',
                refreshToken: '',
                expiresTime: 0,
                userId: ''
            }
            refreshCookie('userToken')
            this.resetState()
            this.saveState()
        },
        resetState() {
            this.permissions = []
            this.roles = []
            this.isSetUser = false
            this.user = {
                id: 0,
                avatar: '',
                username: '',
                deptId: 0,
            }
            this.menus = []
        },
        // 在页面加载时，恢复状态
        loadState() {
            const savedState = localStorage.getItem('userStore')
            if (savedState) {
                this.$patch(JSON.parse(savedState))
            }
        },
        saveState(){
            // 保存状态
            localStorage.setItem('userStore', JSON.stringify(this.$state))
        },

    },
    persist: {
        storage: persistedState.localStorage,
    },
})