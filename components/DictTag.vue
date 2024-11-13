<template>
  <div>
    <client-only>
      <span v-if="!props.type"></span>
      <span v-else-if="props.value === undefined || props.value === null"></span>
      <el-tag
          v-else
          :style="dictData?.cssClass ? 'color: #fff' : ''"
          :type="dictData?.colorType ?? 'primary'"
          :color="dictData?.cssClass && isHexColor(dictData?.cssClass)
              ? dictData?.cssClass
              : ''"
          :disableTransitions="true"
      >
        {{dictData?.label}}
      </el-tag>
    </client-only>
  </div>

</template>

<script lang="tsx" setup>
import {type PropType, ref} from 'vue'
import type {DictDataType} from "~/types";

defineOptions({name: 'DictTag'})


const props = defineProps({
  type:{
    type: String as PropType<string>,
    required:true
  },
  value:{
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    required: true
  }
})

const dictData = ref<DictDataType>()
const getDictObj = (dictType: string, value: string) => {
  // 这里使用了localStorage缓存，服务端渲染可能会有问题
  const dictOptions = getDictOptions(dictType)
  dictOptions.forEach((dict: DictDataType) => {
    if (dict.value === value) {
      if (dict.colorType + '' === 'primary' || dict.colorType + '' === 'default') {
        dict.colorType = ''
      }
      dictData.value = dict
    }
  })
}

const isHexColor = (color: string) => {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-f]{6})$/
  return reg.test(color)
}

onMounted(()=>{
  getDictObj(props.type, props.value.toString())
})

</script>
