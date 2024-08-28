<template>
  <!-- 页面装饰元素  -->
  <div class="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
    <PageIllustration/>
  </div>

  <!--  页面模块-->
  <HeroHome />


</template>

<script lang="tsx" setup>
import {ref} from 'vue'

defineOptions({name: 'index'})
</script>
