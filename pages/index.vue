<template>
  <div>
    这里是首页
    {{data}}
  </div>
</template>

<script setup lang="ts" >
defineOptions({name: 'index'})

const {data,execute} = await useAsyncData(()=>getTestAPI())

</script>
