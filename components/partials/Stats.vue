<script setup>
import { ref } from 'vue'
import Counter from './Counter.vue'

const stats = ref([
  {
    number: 476,
    suffix: 'K',
    text: 'Assets packed with power beyond your imagination.',
  },
  {
    number: 1.44,
    suffix: 'K',
    text: 'Assets packed with power beyond your imagination.',
  },
  {
    number: 1.5,
    suffix: 'M+',
    text: 'Assets packed with power beyond your imagination.',
  },
  {
    number: 192,
    suffix: 'K',
    text: 'Assets packed with power beyond your imagination.',
  },
])
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="max-w-sm mx-auto grid gap-12 sm:grid-cols-2 md:grid-cols-4 md:-mx-5 md:gap-0 items-start md:max-w-none">
      <template v-for="stat in stats">
        <div class="relative text-center md:px-5 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-8 after:border-l after:border-zinc-300 after:border-dashed last:after:hidden">
          <h4 class="font-inter-tight text-2xl md:text-3xl font-bold tabular-nums mb-2"><Counter :number="stat.number" />{{ stat.suffix }}</h4>
          <p class="text-sm text-zinc-500">{{ stat.text }}</p>
        </div>
      </template>
    </div>

  </div>
</template>
