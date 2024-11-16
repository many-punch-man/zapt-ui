<template>
  <div class="min-w-fit">
    <!-- Sidebar backdrop (mobile only) -->
    <div class="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
         :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true"></div>

    <!-- Sidebar -->
    <div id="sidebar" ref="sidebar"
         class="flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out"
         :class="[variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-sm', sidebarOpen ? 'translate-x-0' : '-translate-x-64']">

      <!-- Sidebar header -->
      <div class="flex justify-between mb-10 pr-3 sm:px-2">
        <!-- Close button -->
        <button ref="trigger" class="lg:hidden text-gray-500 hover:text-gray-400" @click.stop="$emit('close-sidebar')"
                aria-controls="sidebar" :aria-expanded="sidebarOpen">
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"/>
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="block" to="/">
          <svg class="w-8 h-8 fill-current text-purple-600"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.3 33.26">
            <g id="图层_2" data-name="图层 2">
              <g id="图层_1-2" data-name="图层 1">
                <path class="cls-1"
                      d="M15.78,0a16,16,0,0,1-5.31,11.92c-.31.28-.63.55-1,.8a15.85,15.85,0,0,1-6.4,3c-.27.06-.55.12-.83.16a15,15,0,0,1-2.24.2v-12A4.11,4.11,0,0,1,4.15,0Z"/>
                <path class="cls-1"
                      d="M33.3,4.11v12c-.22,0-.43,0-.65,0a15.64,15.64,0,0,1-2.57-.21c-.28,0-.56-.1-.84-.16a15.85,15.85,0,0,1-6.4-3c-.33-.25-.65-.52-1-.8A16,16,0,0,1,16.58,0H29.19A4.11,4.11,0,0,1,33.3,4.11Z"/>
                <path class="cls-1" d="M5,20.52l7.36,12.74H4.15A4.11,4.11,0,0,1,0,29.15V20.52Z"/>
                <polygon class="cls-1" points="5.88 20.52 26.47 20.52 19.12 33.26 13.24 33.26 5.88 20.52"/>
                <path class="cls-1" d="M27.4,20.52h5.9v8.63a4.11,4.11,0,0,1-4.11,4.11H20Z"/>
                <path class="cls-2" d="M0,11.92,0,12v-.07Z"/>
              </g>
            </g>
          </svg>
        </router-link>
      </div>

      <!-- Links -->
      <div class="space-y-8">
        <!--Setting group-->
        <div>
          <h3 class="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
            <span class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                  aria-hidden="true">•••</span>
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block">Setting</span>
          </h3>
          <ul class="mt-3">
            <!-- User Setting -->
            <SidebarLinkGroup v-slot="parentLink" :activeCondition="currentRouteFullPath.includes('/admin/user-setting')">
              <a class="block text-gray-800 dark:text-gray-100 truncate transition"
                 :class="parentLink.expanded ? '' : 'hover:text-gray-900 dark:hover:text-white'" href="#0"
                 @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 fill-current text-gray-400 dark:text-gray-500"
                         xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path
                          d="M11.442 4.576a1 1 0 1 0-1.634-1.152L4.22 11.35 1.773 8.366A1 1 0 1 0 .227 9.634l3.281 4a1 1 0 0 0 1.59-.058l6.344-9ZM15.817 4.576a1 1 0 1 0-1.634-1.152l-5.609 7.957a1 1 0 0 0-1.347 1.453l.656.8a1 1 0 0 0 1.59-.058l6.344-9Z"/>
                    </svg>
                    <span
                        class="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">User Setting</span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500"
                         :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-8 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <NuxtLink to="/admin/user-setting/user" custom v-slot="{ href, navigate,isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition truncate"
                         :class="isExactActive ? 'text-violet-500' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
                         :href="href" @click="navigate">
                        <span
                            class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">User</span>
                      </a>
                    </li>
                  </NuxtLink>

                  <NuxtLink to="/admin/user-setting/department" custom v-slot="{ href, navigate,isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition truncate"
                         :class="isExactActive ? 'text-violet-500' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
                         :href="href" @click="navigate">
                        <span
                            class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Department</span>
                      </a>
                    </li>
                  </NuxtLink>
                  <NuxtLink to="/admin/user-setting/role" custom v-slot="{ href, navigate ,isExactActive}">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition truncate"
                         :class="isExactActive ? 'text-violet-500' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
                         :href="href" @click="navigate">
                        <span
                            class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Role</span>
                      </a>
                    </li>
                  </NuxtLink>
                  <NuxtLink to="/admin/user-setting/position" custom v-slot="{ href, navigate ,isExactActive}">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition truncate"
                         :class="isExactActive ? 'text-violet-500' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
                         :href="href" @click="navigate">
                        <span
                            class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Position</span>
                      </a>
                    </li>
                  </NuxtLink>
                </ul>
              </div>
            </SidebarLinkGroup>
          </ul>
          <!-- System Setting -->
          <ul class="mt-3">
            <!-- User Setting -->
            <SidebarLinkGroup v-slot="parentLink" :activeCondition="currentRouteFullPath.includes('/admin/system-setting')">
              <a class="block text-gray-800 dark:text-gray-100 truncate transition"
                 :class="parentLink.expanded ? '' : 'hover:text-gray-900 dark:hover:text-white'" href="#0"
                 @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 fill-current text-gray-400 dark:text-gray-500"
                         xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path
                          d="M11.442 4.576a1 1 0 1 0-1.634-1.152L4.22 11.35 1.773 8.366A1 1 0 1 0 .227 9.634l3.281 4a1 1 0 0 0 1.59-.058l6.344-9ZM15.817 4.576a1 1 0 1 0-1.634-1.152l-5.609 7.957a1 1 0 0 0-1.347 1.453l.656.8a1 1 0 0 0 1.59-.058l6.344-9Z"/>
                    </svg>
                    <span
                        class="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">System Setting</span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500"
                         :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-8 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <NuxtLink to="/admin/system-setting/menu" custom v-slot="{ href, navigate,isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition truncate"
                         :class="isExactActive ? 'text-violet-500' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
                         :href="href" @click="navigate">
                        <span
                            class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Menu</span>
                      </a>
                    </li>
                  </NuxtLink>
                </ul>
              </div>
            </SidebarLinkGroup>
          </ul>
          <!--  Infrastructure Setting-->
        </div>
      </div>

      <!-- Expand / collapse button -->
      <div class="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
        <div class="w-12 pl-4 pr-3 py-2">
          <button class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  @click.prevent="sidebarExpanded = !sidebarExpanded">
            <span class="sr-only">Expand / collapse sidebar</span>
            <svg class="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180"
                 xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path
                  d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="tsx" setup>
import {ref} from 'vue'
import SidebarLinkGroup from "~/components/admin/SidebarLinkGroup.vue";

defineOptions({name: 'AdminSidebar'})

const trigger = ref()
const sidebar = ref()


const props = defineProps({
  sidebarOpen: Boolean,
  variant: {
    type: String,
    default: 'v1'
  }
})

const emit = defineEmits(['close-sidebar'])

let storedSidebarExpanded = 'true'
// if(import.meta.client){
//   storedSidebarExpanded = localStorage.getItem('sidebar-expanded')?? 'true'
// }
const sidebarExpanded = ref(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true')

const currentRoute = useRouter().currentRoute.value

const currentRouteFullPath = computed(() => {
  return useRouter().currentRoute.value.fullPath
})

// close on click outside
const clickHandler = (e: MouseEvent) => {
  if (!sidebar.value || !trigger.value) return
  if (
      !props.sidebarOpen ||
      sidebar.value.contains(e.target) ||
      trigger.value.contains(e.target)
  ) return
  emit('close-sidebar')
}

// close if the esc key is pressed
const keyHandler = (e: KeyboardEvent) => {
  if (!props.sidebarOpen || e.code !== '27') return
  emit('close-sidebar')
}


const handleExpand = () => {
  sidebarExpanded.value = !sidebarExpanded.value
  console.log(sidebarExpanded.value)
}

onMounted(() => {
  document.addEventListener('click', clickHandler)
  document.addEventListener('keydown', keyHandler)
})

onUnmounted(() => {
  document.removeEventListener('click', clickHandler)
  document.removeEventListener('keydown', keyHandler)
})

watch(() => sidebarExpanded.value, () => {
  // localStorage.setItem('sidebar-expanded', String(sidebarExpanded.value))
  if (sidebarExpanded.value) {
    document.querySelector('body')?.classList.add('sidebar-expanded')
  } else {
    document.querySelector('body')?.classList.remove('sidebar-expanded')
  }
})


</script>
