// components/introduce/Category.vue
<template>
  <div
    class="w-fit max-w-full py-[20px] lg:flex lg:w-[1200px] lg:flex-col lg:items-center lg:justify-center lg:gap-[32px] lg:rounded-[24px] lg:bg-white lg:pb-[40px] lg:pt-[24px]"
  >
    <!-- Tiêu đề -->
    <div class="flex flex-col lg:w-full">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="flex flex-col opacity-80">
          <span class="text-[20px] font-bold leading-[100%] text-[#000000] lg:text-[24px]">
            <strong>Đa dạng danh mục hàng hóa</strong>
          </span>
        </div>
      </div>
    </div>

    <!-- Danh mục -->
    <div
      class="mx-auto mt-[16px] grid w-full
         max-w-[1200px] grid-cols-2 gap-x-[24px] gap-y-[28px] sm:grid-cols-3
         md:grid-cols-4 lg:grid-cols-5"
    >
      <NuxtLink
        v-for="item in categoryLV2"
        :key="item._id"
        :to="localePath(`/category/${mode}/${item.alias}`)"
        class="group flex w-full flex-col items-center text-center"
      >
        <!-- Hình -->
        <div
          class="relative flex aspect-square h-[152px] w-full max-w-[211px]
             items-center justify-center overflow-hidden rounded-[27px]
             border-[3px] border-[#FFCC00] bg-white"
        >
          <img
            src="/category_shirt.svg"
            :alt="item.display?.text || 'Category Image'"
            class="h-full w-full object-cover"
          >
        </div>

        <!-- Label -->
        <div
          class="mt-[-10px] inline-block rounded-[12px] bg-[#FFCC00] px-[16px]
             py-[4px] text-sm font-semibold text-[#000] shadow-sm"
        >
          {{ item.display.text }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useCategoryStorage } from '~/store/category'

const localePath = useLocalePath()

const categoryStorage = useCategoryStorage()
categoryStorage.getCategory()

// Dữ liệu danh mục
const categoryLV2 = computed(() => (categoryStorage.category || []).slice(0, 5))
</script>
