<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const props = defineProps({
  color: {
    type: String,
    required: true,
  },
})
const colorSVG = ref(props.color)
</script>

<template>
  <button
    class=""
    @click="goBack"
  >
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 32.5L15 22.5L25 12.5"
        :stroke="colorSVG"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>
