import {defineStore} from "pinia";
import type {Recordable} from "~/types";

const getSimpleDictDataList = async () => {
    return await fetchGet<any>('/system/dict-data/simple-list')
}

export const useDictStore = defineStore('dict', {
    state: (): DictState => ({
        dictMap: new Map<string, any>(),
        isSetDict: false
    }),
    getters: {
        getDictMap(): Recordable {
            return this.dictMap
        },
        getIsSetDict(): boolean {
            return this.isSetDict
        }
    },
    actions: {
        async setDictMap() {
            const res = await getSimpleDictDataList()
            // 设置数据
            const dictDataMap = new Map<string, any>()
            res.forEach((dictData: DictDataVO) => {
                // 获得 dictType 层级
                const enumValueObj = dictDataMap.get(dictData.dictType)
                if (!enumValueObj) {
                    dictDataMap.set(dictData.dictType, [])
                }
                // 处理 dictValue 层级
                let existingArray = dictDataMap.get(dictData.dictType) || []
                existingArray.push({
                    value: dictData.value,
                    label: dictData.label,
                    colorType: dictData.colorType,
                    cssClass: dictData.cssClass
                })
                //更新
                dictDataMap.set(dictData.dictType, existingArray)
            })
            this.dictMap = dictDataMap
            this.isSetDict = true
        },
        getDictByType(type: string) {
            if (!this.isSetDict) {
                this.setDictMap()
            }
            return this.dictMap.get(type)
        },
        resetStore(){
            this.isSetDict = false
            this.dictMap = new Map<string, any>()
        }
    },
    persist: {
        storage: persistedState.localStorage,
    },
})