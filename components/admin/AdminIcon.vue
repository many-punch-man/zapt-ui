<template>
  <div>
    <span :class="icon"></span>
  </div>
</template>

<script lang="tsx" setup>
defineOptions({name: 'AdminIcon'})
defineProps({
  icon: {
    type: String,
    required: true,
  },
})
</script>
