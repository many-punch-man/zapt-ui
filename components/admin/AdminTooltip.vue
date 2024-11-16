<script lang="ts" setup>
import AdminIcon from "~/components/admin/AdminIcon.vue";

defineOptions({ name: 'Tooltip' })

defineProps({
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <span>{{ title }}</span>
  <el-tooltip :content="message" placement="top">
    <AdminIcon :icon="icon" class="relative top-1px ml-1px" />
  </el-tooltip>
</template>
