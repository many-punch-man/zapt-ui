<template>
  <section class="relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pt-32 pb-12 md:pt-40 md:pb-20">

        <!-- Page header -->
        <div class="max-w-3xl mx-auto text-center pb-12 md:pb-20">
          <h1 class="h1">Welcome back. We exist to make entrepreneurship easier.</h1>
        </div>

        <!-- Form -->
        <div class="max-w-sm mx-auto">
          <form>
            <div class="flex flex-wrap -mx-3 mb-4">
              <div class="w-full px-3">
                <label class="block text-gray-300 text-sm font-medium mb-1" for="email">Account</label>
                <input id="account" type="text" class="form-input w-full text-gray-300"
                       placeholder="you@yourcompany.com" autocomplete="true" required v-model="formData.username"/>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
              <div class="w-full px-3">
                <label class="block text-gray-300 text-sm font-medium mb-1" for="password">Password</label>
                <input id="password" type="password" class="form-input w-full text-gray-300"
                       placeholder="Password (at least 10 characters)" autocomplete="true" required
                       v-model="formData.password"/>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
              <div class="w-full px-3">
                <div class="flex justify-between">
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox"/>
                    <span class="text-gray-400 ml-2">Keep me signed in</span>
                  </label>
                  <router-link to="/reset-password"
                               class="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot
                    Password?
                  </router-link>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mt-6">
              <div class="w-full px-3">
                <button class="btn text-white bg-purple-600 hover:bg-purple-700 w-full" @click.prevent.stop="submit">
                  Sign in
                </button>
              </div>
            </div>
          </form>

          <div class="flex items-center my-6">
            <div class="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
            <div class="text-gray-400">Or, sign in with your social account</div>
            <div class="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
          </div>

          <form>
            <div class="flex flex-wrap -mx-3">
              <div class="w-full px-3">
                <button class="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                  <svg class="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z"/>
                  </svg>
                  <span class="h-6 flex items-center border-r border-white border-opacity-25 mr-4"
                        aria-hidden="true"></span>
                  <span class="flex-auto pl-16 pr-8 -ml-16">Sign in with Google</span>
                </button>
              </div>
            </div>
          </form>

          <div class="text-gray-400 text-center mt-6">
            Don’t you have an account?
            <router-link to="/signup" class="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">
              Sign up
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="tsx" setup>
import {fetchPost} from "~/composables/fetch";
import type {UserToken} from "~/types";

defineOptions({name: 'SignIn'})

const formData = ref({
  username: '',
  password: '',
  captchaVerification: ''
})

/**
 * 登录
 */
const submit = async () => {
  console.log(formData.value)
  const userToken = await fetchPost<UserToken>('/system/auth/login', {
    isToken: false,
    body: formData.value
  })
  console.log("登录成功，输出{}", userToken)
  // 将这个token保存到cookie中
  // cookie保存一周
  const cookieUserToken = useCookie<UserToken>('userToken', {
    maxAge: 60 * 60 * 24 * 7
  })
  cookieUserToken.value = userToken
  navigateTo('/admin')
}

</script>
