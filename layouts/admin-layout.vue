<template>
  <div class="flex h-[100dvh] overflow-hidden font-inter antialiased bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
    <!-- Sidebar -->
    <AdminSidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <AdminHeader :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import {ref} from 'vue'

defineOptions({name: 'admin-layout'})


const sidebarOpen = ref(false)
</script>
