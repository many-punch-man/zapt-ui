<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: String,
  id: String,
  active: Boolean,
})

const accordionOpen = ref(false)

onMounted(() => {
  accordionOpen.value = props.active
})
</script>

<template>
  <div class="bg-zinc-100 rounded">
    <h2>
      <button
        :id="`accordion-title-${id}`"
        class="flex items-center justify-between w-full font-inter-tight text-left font-medium text-zinc-800 px-4 py-2.5"
        @click="accordionOpen = !accordionOpen"
        :aria-expanded="accordionOpen"
        :aria-controls="`accordion-text-${id}`"        
      >
        <span>{{ title }}</span>
        <svg class="fill-zinc-400 shrink-0 ml-8" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
          <rect y="5" width="12" height="2" rx="1" class="transform origin-center transition duration-200 ease-out" :class="{ '!rotate-180': accordionOpen }" />
          <rect y="5" width="12" height="2" rx="1" class="transform origin-center rotate-90 transition duration-200 ease-out" :class="{ '!rotate-180': accordionOpen }" />
        </svg>    
      </button>
    </h2>
    <div
      :id="`accordion-text-${id}`"
      role="region"
      :aria-labelledby="`accordion-title-${id}`"
      class="grid text-sm text-zinc-500 overflow-hidden transition-all duration-300 ease-in-out"    
      :class="accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <div class="overflow-hidden">
        <p class="px-4 pb-3">
          <slot />
        </p>
      </div>
    </div>    
  </div>
</template>
