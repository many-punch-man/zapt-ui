<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>


<script setup>
import AOS from 'aos'
onMounted(()=>{
  AOS.init({
    once: true,
    disable: 'phone',
    duration: 600,
    easing: 'ease-out-sine',
  })
})
</script>
