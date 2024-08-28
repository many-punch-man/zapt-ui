<template>
  <div class="flex flex-col min-h-screen overflow-hidden font-inter antialiased bg-gray-900 text-gray-200 tracking-tight">
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
