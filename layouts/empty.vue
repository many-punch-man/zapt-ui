<template>
  <div>
    <slot ></slot>
  </div>
</template>

<script lang="tsx" setup>
import {ref} from 'vue'

defineOptions({name: 'empty'})
</script>
