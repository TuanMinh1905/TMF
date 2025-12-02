<template>
  <section class="lg:w-full" :class="attr1">
    <div class="lg:flexRow-center" :class="attr2">
      <div class="px-[10px] lg:px-[0px] lg:w-[1200px]" :class="attr3">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  attr1: {
    type: String,
  },
  attr2: {
    type: String,
  },
  attr3: {
    type: String,
  },
})
</script>
