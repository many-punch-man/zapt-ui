<template>
  <div class="mb-8">
    <!-- Title -->
    <h1 class="text-1xl md:text-2xl text-slate-800 dark:text-slate-100 font-bold">{{title}}</h1>
  </div>
</template>

<script lang="tsx" setup>
defineOptions({name: 'PageHeader'})

defineProps({
  title: String
})

</script>
