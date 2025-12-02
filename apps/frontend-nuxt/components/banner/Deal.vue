<template>
  <div class="relative flex h-[96px] w-full items-center justify-between overflow-hidden rounded-[12px] px-[24px]">
    <!-- Left Text -->
    <div class="flex flex-col gap-3 z-[1]">
      <h1 class="font-monasans text-[32px] font-bold leading-[100%]" :style="{ color: textColor }">
        {{ title }}
      </h1>

      <p v-if="subtitle" class="font-monasans text-[20px] font-normal leading-[100%] opacity-80"
        :style="{ color: textColor }">
        {{ subtitle }}
      </p>
    </div>

    <!-- Right Image -->
    <img v-if="imgSrc" :src="imgSrc" alt="banner-image"
      class="absolute right-[8px] top-[-3px] bottom-[-4px] h-[178px] w-auto object-contain" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  textColor: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  imgSrc: { type: String, default: '' }, // hình tùy chọn
})
</script>
