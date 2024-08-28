<template>
  <div>
    管理员布局
    <slot></slot>
  </div>
</template>

<script lang="tsx" setup>
import {ref} from 'vue'

defineOptions({name: 'admin-layout'})
</script>
