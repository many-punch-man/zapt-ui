<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <!-- Site header -->
    <Header />

    <main class="grow">
      <slot></slot>
    </main>


    <Footer/>
  </div>
</template>

<script lang="tsx" setup>

defineOptions({name: 'default'})
</script>
