<template>
  <div class="flex h-[100dvh] overflow-hidden font-inter antialiased bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 transition-all duration-200 ease-in-out">
    <!-- Sidebar -->
    <AdminSidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" :variant="sidebarVariant"/>

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <AdminHeader :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" :variant="headerVariant" />
      <main class="grow">
        <!--<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">-->
            <slot></slot>
        <!--</div>-->
      </main>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import {ref} from 'vue'

defineOptions({name: 'admin-layout'})
const sidebarOpen = ref(false)

const currentRoute = useRoute()

// 默认样式
const sidebarVariant = ref('v1'); // 侧边栏样式
const headerVariant = ref('v1'); // 头部样式



//根据路由来判断样式
watch(()=>currentRoute.fullPath,(newValue)=>{
  console.log("刷新页面布局")
  console.log(newValue)
  if (newValue.includes('/admin/system/setting/user')) {
    sidebarVariant.value = 'v2';
    headerVariant.value = 'v3';
  }else {
    console.log("默认样式")
    sidebarVariant.value = 'v1';
    headerVariant.value = 'v1';
  }
})


</script>
