<script setup>
import { ref } from 'vue'

const props = defineProps({
  content: String,
  id: String,
  dark: Boolean,
})

const open = ref(false)
</script>

<template>
  <div class="relative">
    <button
      class="block text-left text-zinc-500 underline decoration-dotted underline-offset-4 cursor-help"
      :class="dark ? 'decoration-zinc-600 ' : 'decoration-zinc-300'"
      :aria-describedby="`tooltip-${id}`"
      @mouseenter="open = true"
      @mouseleave="open = false"
      @focus="open = true"
      @focusout="open = false"
      @click.prevent
    >
      <slot />
    </button>
    <div :id="`tooltip-${id}`" role="tooltip" class="z-10 absolute top-full left-0">
      <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-out duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >      
        <div class="w-[12.5rem] text-xs bg-white text-zinc-500 border border-zinc-200 px-3 py-2 rounded shadow-lg overflow-hidden mt-1" v-show="open">
          {{ content }}
        </div>
      </transition>
    </div>
  </div>
</template>
