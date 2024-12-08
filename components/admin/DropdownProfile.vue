<template>
  <div class="relative inline-flex">
    <button
        ref="trigger"
        class="inline-flex justify-center items-center group"
        aria-haspopup="true"
        @click.prevent="dropdownOpen = !dropdownOpen"
        :aria-expanded="dropdownOpen"
    >
      <img class="w-8 h-8 rounded-full" :src="UserAvatar" width="32" height="32" alt="User"/>
      <div class="flex items-center truncate">
        <span
            class="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">Acme Inc.</span>
        <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
        </svg>
      </div>
    </button>
    <client-only>
      <Transition
          enter-active-class="transition ease-out duration-200 transform"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-out duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
      >
        <div v-show="dropdownOpen"
             class="origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
             :class="align === 'right' ? 'right-0' : 'left-0'">
          <div class="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
            <div class="font-medium text-gray-800 dark:text-gray-100">Acme Inc.</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 italic">Administrator</div>
          </div>
          <ul
              ref="dropdown"
              @focusin="dropdownOpen = true"
              @focusout="dropdownOpen = false"
          >
            <li>
              <router-link
                  class="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
                  to="/settings/account" @click="dropdownOpen = false">Settings
              </router-link>
            </li>
            <li>
              <router-link
                  class="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
                  to="/signin" @click="handleSignOut">Sign Out
              </router-link>
            </li>
          </ul>
        </div>
      </Transition>
    </client-only>

  </div>
</template>

<script lang="tsx" setup>
import UserAvatar from '@/assets/images/user-avatar-32.png'
import {ref} from "vue";

defineOptions({name: 'DropdownProfile'})

const dropdownOpen = ref(false)
const trigger = ref()
const dropdown = ref()

defineProps({
  align: String
})


// close on click outside
const clickHandler = (even: MouseEvent) => {
  if (!dropdownOpen.value || dropdown.value.contains(even.target) || trigger.value.contains(even.target)) return
  dropdownOpen.value = false
}

// close if the esc key is pressed
const keyHandler = (event: KeyboardEvent) => {
  if (!dropdownOpen.value || event.code !== '27') return
  dropdownOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', clickHandler)
  document.addEventListener('keydown', keyHandler)
})

onUnmounted(() => {
  document.removeEventListener('click', clickHandler)
  document.removeEventListener('keydown', keyHandler)
})

const handleSignOut = async () => {
  await useUserStore().loginOut();
  useDictStore().resetStore();
  dropdownOpen.value = false
  navigateTo("/")
}


</script>
