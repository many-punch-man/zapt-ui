interface TreeHelperConfig {
    id: string
    children: string
    pid: string
}


const DEFAULT_CONFIG: TreeHelperConfig = {
    id: 'id',
    children: 'children',
    pid: 'parentId'
}

export const defaultProps = {
    children: 'children',
    label: 'name',
    value: 'id',
    isLeaf: 'leaf',
}


const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config)


/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export const handleTree = (data: any[], id?: string, parentId?: string, children?: string) => {
    if (!Array.isArray(data)) {
        console.warn('data must be an array')
        return []
    }
    const config = {
        id: id || 'id',
        parentId: parentId || 'parentId',
        childrenList: children || 'children'
    }

    const childrenListMap: Record<string, any[]> =  {}
    const nodeIds: Record<string, any> = {}
    const tree: any[] = []

    for (const d of data) {
        const parentId = d[config.parentId]
        if (childrenListMap[parentId] == null) {
            childrenListMap[parentId] = []
        }
        nodeIds[d[config.id]] = d
        childrenListMap[parentId].push(d)
    }

    for (const d of data) {
        const parentId = d[config.parentId]
        if (nodeIds[parentId] == null) {
            tree.push(d)
        }
    }

    for (const t of tree) {
        adaptToChildrenList(t)
    }

    function adaptToChildrenList(o:any) {
        if (childrenListMap[o[config.id]] !== null) {
            o[config.childrenList] = childrenListMap[o[config.id]]
        }
        if (o[config.childrenList]) {
            for (const c of o[config.childrenList]) {
                adaptToChildrenList(c)
            }
        }
    }

    return tree
}


/**
 * 获取树的所有节点的ID
 */
export const getAllIds = (data: any[], config?: TreeHelperConfig = DEFAULT_CONFIG) => {
    const ids: any[] = []
    data.forEach(item => {
        ids.push(item[config.id])
        if (item[config.children]) {
            ids.push(...getAllIds(item[config.children], config))
        }
    })
    return ids
}