<template>
  <div class="flex flex-col min-h-screen overflow-hidden font-inter antialiased bg-gray-900 text-gray-200 tracking-tight">
    <!-- Site header -->
    <Header />

    <main class="grow">
      <!-- 页面装饰元素  -->
      <div class="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
        <PageIllustration/>
      </div>


      <slot></slot>
    </main>


    <Footer/>
  </div>
</template>

<script lang="tsx" setup>

defineOptions({name: 'default'})
</script>
