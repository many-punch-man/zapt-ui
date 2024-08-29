<template>
  <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
    <div class="flex flex-col md:flex-row md:-mr-px min-h-[20rem]">
      <slot/>
    </div>
  </div>
</template>

<script lang="tsx" setup>
defineOptions({name: 'BaseCard'})
</script>
