<script setup>
const props = defineProps(['testimonial'])
</script>

<template>
    <div class="rounded h-full w-[22rem] border border-transparent [background:linear-gradient(#323237,#323237)_padding-box,linear-gradient(120deg,theme(colors.zinc.700),theme(colors.zinc.700),theme(colors.zinc.700))_border-box] p-5">
      <div class="flex items-center mb-4">
        <img class="shrink-0 rounded-full mr-3" :src="props.testimonial.image" width="44" height="44" :alt="props.testimonial.name" />
        <div>
          <div class="font-inter-tight font-bold text-zinc-200">{{ props.testimonial.name }}</div>
          <div>
            <a class="text-sm font-medium text-zinc-500 hover:text-zinc-300 transition" :href="props.testimonial.link">{{ props.testimonial.user }}</a>
          </div>
        </div>
      </div>
      <div class="text-zinc-500 before:content-['\0022'] after:content-['\0022']">
        <slot />
      </div>
    </div>
</template>
