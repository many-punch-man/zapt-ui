<template>
  <div class="min-w-fit">
    <!-- 移动端弹出遮罩 -->
    <div class="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
         :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true"></div>

    <!-- Sidebar -->
    <div id="sidebar" ref="sidebar"
         class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out"
         :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'">

      <!-- Sidebar header -->
      <div class="flex justify-between mb-10 pr-3 sm:px-2">
        <!-- Close button -->
        <button ref="trigger" class="lg:hidden text-slate-500 hover:text-slate-400" @click.stop="$emit('close-sidebar')"
                aria-controls="sidebar" :aria-expanded="sidebarOpen">
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <!-- Logo -->
        <NuxtLink class="block" to="/admin">
          <svg class="w-8 h-8 fill-current text-purple-600" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z"/>
          </svg>
        </NuxtLink>
      </div>


      <!-- Links -->
      <div class="space-y-8">
        <!-- Pages group -->
        <div>
          <h3 class="text-xs uppercase text-slate-500 font-semibold pl-3">
            <span class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                  aria-hidden="true">•••</span>
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
          </h3>
          <!-- Dashboard -->
          <SidebarLinkGroup v-slot="parentLink"
                            :activeCondition="currentRoute.fullPath === '/admin' || currentRoute.fullPath.includes('dashboard')">
            <a class="block text-slate-200 truncate transition duration-150"
               :class="(currentRoute.fullPath === '/' || currentRoute.fullPath.includes('dashboard')) ? 'hover:text-slate-200' : 'hover:text-white'"
               href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <path class="fill-current"
                          :class="(currentRoute.fullPath === '/admin' || currentRoute.fullPath.includes('dashboard')) ? 'text-indigo-500' : 'text-slate-400'"
                          d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                    <path class="fill-current"
                          :class="(currentRoute.fullPath === '/admin' || currentRoute.fullPath.includes('dashboard')) ? 'text-indigo-600' : 'text-slate-600'"
                          d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                    <path class="fill-current"
                          :class="(currentRoute.fullPath === '/admin' || currentRoute.fullPath.includes('dashboard')) ? 'text-indigo-200' : 'text-slate-400'"
                          d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
                  </svg>
                  <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                </div>
                <!-- Icon -->
                <div class="flex shrink-0 ml-2">
                  <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                       :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </div>
              </div>
            </a>
            <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
              <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                <NuxtLink to="/" custom v-slot="{ href, navigate, isExactActive }">
                  <li class="mb-1 last:mb-0">
                    <a class="block transition duration-150 truncate"
                       :class="isExactActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200'" :href="href"
                       @click="navigate">
                        <span
                            class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Main</span>
                    </a>
                  </li>
                </NuxtLink>
                <NuxtLink to="/dashboard/analytics" custom v-slot="{ href, navigate, isExactActive }">
                  <li class="mb-1 last:mb-0">
                    <a class="block transition duration-150 truncate"
                       :class="isExactActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200'" :href="href"
                       @click="navigate">
                        <span
                            class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Analytics</span>
                    </a>
                  </li>
                </NuxtLink>
                <NuxtLink to="/dashboard/fintech" custom v-slot="{ href, navigate, isExactActive }">
                  <li class="mb-1 last:mb-0">
                    <a class="block transition duration-150 truncate"
                       :class="isExactActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200'" :href="href"
                       @click="navigate">
                        <span
                            class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Fintech</span>
                    </a>
                  </li>
                </NuxtLink>
              </ul>
            </div>
          </SidebarLinkGroup>
        </div>

      </div>


      <!--这个button 只有平板模式下，才会显示-->
      <!-- Expand / collapse button -->
      <div class="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
        <div class="px-3 py-2">
          <button @click.prevent="handleExpand">
            <span class="sr-only">Expand / collapse sidebar</span>
            <svg class="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
              <path class="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
              <path class="text-slate-600" d="M3 23H1V1h2z" />
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
  sidebarOpen: Boolean
})

const emit = defineEmits(['close-sidebar'])

let storedSidebarExpanded = 'true'
// if(import.meta.client){
//   storedSidebarExpanded = localStorage.getItem('sidebar-expanded')?? 'true'
// }
const sidebarExpanded = ref(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true')

const currentRoute = useRouter().currentRoute.value

// close on click outside
const clickHandler = (e:MouseEvent) => {
  if (!sidebar.value || !trigger.value) return
  if (
      !props.sidebarOpen ||
      sidebar.value.contains(e.target) ||
      trigger.value.contains(e.target)
  ) return
  emit('close-sidebar')
}

// close if the esc key is pressed
const keyHandler = (e:KeyboardEvent) => {
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

watch(()=>sidebarExpanded.value, () => {
  // localStorage.setItem('sidebar-expanded', String(sidebarExpanded.value))
  if (sidebarExpanded.value) {
    document.querySelector('body')?.classList.add('sidebar-expanded')
  } else {
    document.querySelector('body')?.classList.remove('sidebar-expanded')
  }
})



</script>
