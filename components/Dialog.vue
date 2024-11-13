<template>
  <el-dialog
      v-bind="getBindValue"
      :close-on-click-modal="true"
      :fullscreen="isFullscreen"
      :width="width"
      destroy-on-close
      lock-scroll
      draggable
      class="com-dialog"
      :show-close="false"
      @close="close"
  >
    <template #header="{ close }">
      <div class="relative h-54px flex items-center justify-between pl-15px pr-15px">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <!--  这里需要添加按钮-->
    </template>

    <el-scrollbar v-if="scroll" :style="dialogStyle">
      <slot></slot>
    </el-scrollbar>
    <slot v-else></slot>

    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>

  </el-dialog>
</template>

<script lang="tsx" setup>

defineOptions({name: 'Dialog'})

const slots = useSlots()

interface Props {
  modelValue?: boolean
  title?: string
  fullscreen?: boolean
  width?: string | number
  scroll?: boolean
  maxHeight?: string | number
  close?: () => void
}
const props = withDefaults(defineProps<Props>(),{
  modelValue: false,
  title: 'Dialog',
  fullscreen: true,
  width: '50%',
  scroll: false,
  maxHeight: '400px',
  close: () => {}
})




const isFullscreen = ref(false)

const dialogHeight = ref(isNumber(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight)

const dialogStyle = computed(() => {
  return {
    height: unref(dialogHeight)
  }
})


// 一次性绑定多个属性
/**
 * attrs是一个对象，包含了传递给这个Dialog的所有属性。这使得没有定义在props的属性，都可以传递给真实的el-dialog组件。
 * 但是有一些属性例如delArr中的属性，需要忽略，因为这些事内部已经定义好的了
 */
const getBindValue = computed(() => {
  const delArr: string[] = ['fullscreen', 'title', 'maxHeight', 'appendToBody']
  // const attrs: Record<string, unknown> = useAttrs() //获取属性
  const attrs = useAttrs() //获取属性
  console.log("attrs",attrs)
  const obj: Props & Record<string, unknown>  = { ...attrs, ...props }
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      // 删除属性
      delete obj[key]
    }
  }
  return obj
})



</script>
