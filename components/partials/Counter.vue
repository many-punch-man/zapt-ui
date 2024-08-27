<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  number: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 3000,
  },
})

const counterElement = ref(null)
const startTimestamp = ref(null)
const rawValue = ref(0)
const counterValue = ref(0)
const precision = (props.number % 1 === 0)
  ? 0
  : (props.number.toString().split('.')[1] || []).length
const animationRequestId = ref(null)
const animationCompleted = ref(false)
let observer = null

const easeOut = (t) => {
  return 1 - Math.pow(1 - t, 5)
}

const startAnimation = () => {
  const step = (timestamp) => {
    if (!startTimestamp.value) startTimestamp.value = timestamp
    const progress = Math.min((timestamp - startTimestamp.value) / props.duration, 1)
    const easedProgress = easeOut(progress)
    rawValue.value = parseFloat((easedProgress * props.number).toFixed(precision))
    counterValue.value = rawValue.value.toFixed(precision)

    if (progress < 1) {
      animationRequestId.value = window.requestAnimationFrame(step)
    } else {
      animationCompleted.value = true
    }
  }

  animationRequestId.value = window.requestAnimationFrame(step)
}

onMounted(() => {
  // Intersection observer to watch visibility
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationCompleted.value) {
        startAnimation()
      }
    })
  })
  observer.observe(counterElement.value)
})

onUnmounted(() => {
  if (animationRequestId.value) {
    window.cancelAnimationFrame(animationRequestId.value)
  }
  if (observer) {
    observer.disconnect()
  }
})
</script>


<template>
  <span ref="counterElement">{{ counterValue }}</span>
</template>
