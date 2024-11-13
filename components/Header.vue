<template>
  <header class="absolute w-full z-30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-20">
        <!--商标-->
        <div class="shrink-0 mr-4">
          <NuxtLink to="/">
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
          </NuxtLink>
        </div>

        <!--  桌面版导航栏-->
        <nav class="hidden md:flex md:grow">
          <!--链接-->
          <ul class="flex grow justify-end flex-wrap items-center">
            <li>
              <NuxtLink to="/features"
                        class="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                Features
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/features"
                        class="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                Bolg
              </NuxtLink>
            </li>
            <li>

              <NuxtLink to="/features"
                        class="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                About
              </NuxtLink>
            </li>
            <Dropdown title="Support">
              <li>
                <NuxtLink to="/contact"
                          class="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">
                  Contact
                  us
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact"
                          class="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">
                  Download Center
                </NuxtLink>
              </li>
            </Dropdown>
          </ul>
          <!--    登录按钮-->
          <ul class="flex grow justify-end flex-wrap items-center">
            <li>
              <NuxtLink to="/signin"
                        class="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                Sign in
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/signup" class="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">Sign up</NuxtLink>
            </li>
          </ul>

        </nav>

        <!-- 移动端导航栏 -->
        <div class="md:hidden">

          <!-- Hamburger button -->
          <button class="hamburger" ref="hamburger" :class="{ active: mobileNavOpen }" aria-controls="mobile-nav"
                  :aria-expanded="mobileNavOpen" @click="mobileNavOpen = !mobileNavOpen">
            <span class="sr-only">Menu</span>
            <svg class="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect y="4" width="24" height="2" rx="1"/>
              <rect y="11" width="24" height="2" rx="1"/>
              <rect y="18" width="24" height="2" rx="1"/>
            </svg>
          </button>

          <!-- Mobile navigation -->
          <nav id="mobile-nav" ref="mobileNav"
               class="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
               :style="[mobileNavOpen ? { maxHeight: mobileNav.scrollHeight + 'px', opacity: 1 } : { maxHeight: 0, opacity: .8 }]">
            <ul class="bg-gray-800 px-4 py-2">
              <li>
                <router-link to="/features" class="flex text-gray-300 hover:text-gray-200 py-2">Features</router-link>
              </li>
              <li>
                <router-link to="/pricing" class="flex text-gray-300 hover:text-gray-200 py-2">Pricing</router-link>
              </li>
              <li>
                <router-link to="/blog" class="flex text-gray-300 hover:text-gray-200 py-2">Blog</router-link>
              </li>
              <li>
                <router-link to="/about" class="flex text-gray-300 hover:text-gray-200 py-2">About us</router-link>
              </li>
              <li class="py-2 my-2 border-t border-b border-gray-700">
                <span class="flex text-gray-300 py-2">Support</span>
                <ul class="pl-4">
                  <li>
                    <router-link to="/contact"
                                 class="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">Contact us
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/help" class="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">Help
                      center
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/404"
                                 class="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">404
                    </router-link>
                  </li>
                </ul>
              </li>
              <li>
                <router-link to="/signin"
                             class="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">
                  Sign
                  in
                </router-link>
              </li>
              <li>
                <router-link to="/signup"
                             class="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out">
                  Sign
                  up
                </router-link>
              </li>
            </ul>
          </nav>

        </div>


      </div>
    </div>

  </header>

</template>

<script lang="tsx" setup>
import {ref} from 'vue'

defineOptions({name: 'Header'})


const mobileNavOpen = ref(false)
const mobileNav = ref()
const hamburger = ref()
const clickOutside = (e: MouseEvent) => {
  if (!mobileNavOpen.value || mobileNav.value.contains(e.target) || hamburger.value.contains(e.target)) return
  mobileNavOpen.value = false
}

const keyPress = (e: KeyboardEvent) => {
  if (!mobileNavOpen.value || e.code !== '27') return
  mobileNavOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', clickOutside)
  document.addEventListener('keydown', keyPress)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutside)
  document.removeEventListener('keydown', keyPress)
})
</script>
