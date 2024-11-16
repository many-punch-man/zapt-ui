type DictState = {
    dictMap: string
    isSetDict: boolean
    dictMapStr: string
}

type DictDataVO = {
    id: number | undefined
    sort: number | undefined
    label: string
    value: string
    dictType: string
    status: number
    colorType: string
    cssClass: string
    remark: string
    createTime: Date
}

////用户相关的type

// 用户vo
type UserVO = {
    id: number
    username: string
    nickname: string
    deptId: number
    postIds: string[]
    email: string
    mobile: string
    sex: number
    avatar: string
    loginIp: string
    status: number
    remark: string
    loginDate: Date
    createTime: Date
}

type SimpleUserVO = {
    id: number
    nickname: string
    deptId: number
    postIds: number[]
}

////部门相关type

// 部门vo
type DeptVO = {
    id?: number
    name: string
    parentId: number
    status: number
    sort: number
    leaderUserId: number
    phone: string
    email: string
    createTime: Date
}

// 岗位VO
type PostVO = {
    id?: number
    name: string
    code: string
    sort: number
    status: number
    remark: string
    createTime?: Date
}
// 角色vo
type RoleVO = {
    id: number
    name: string
    code: string
    sort: number
    status: number
    type: number
    dataScope: number
    dataScopeDeptIds: number[]
    createTime: Date
}

// 菜单vo
type MenuVO = {
    id: number
  name: string
  permission: string
  type: number
  sort: number
  parentId: number
  path: string
  icon: string
  component: string
  componentName?: string
  status: number
  visible: boolean
  keepAlive: boolean
  alwaysShow?: boolean
  createTime: Date
}