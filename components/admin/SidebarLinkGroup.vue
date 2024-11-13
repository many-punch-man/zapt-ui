<template>
  <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 list-none bg-[linear-gradient(135deg,var(--tw-gradient-stops))]" :class="activeCondition && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'">
    <slot :handleClick="handleClick" :expanded="expanded" />
  </li>
</template>
<script lang="tsx" setup>
defineOptions({name: 'SidebarLinkGroup'})

const props = defineProps({
  activeCondition: Boolean,
})

const expanded = ref(props.activeCondition)

const handleClick = () => {
  expanded.value = !expanded.value
}

</script>
