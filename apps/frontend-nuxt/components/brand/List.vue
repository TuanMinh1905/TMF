// components/brand/List.vue
<template>
  <div
    class="w-fit max-w-full py-[20px] lg:flex lg:w-[1200px] lg:flex-col lg:items-center lg:justify-center lg:gap-[32px] lg:rounded-[24px] lg:bg-white lg:pb-[24px] lg:pt-[24px]"
  >
    <div class="flex flex-col lg:w-full">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="mb-2 w-full gap-[12px] bg-white py-[20px] pl-[16px] lg:mb-[0px] lg:py-[0px] lg:pl-[0px]">
          <!-- Wrapper -->
          <div class="flex items-center justify-between">
            <h2 class="lag:text-[24px] font-monasans text-[21px] font-semibold leading-[1] text-black">
              Thương hiệu yêu thích
            </h2>
            <span
              class="text-md group flex cursor-pointer select-none items-center justify-center gap-2 font-medium"
              @click="toggleShowAll"
            >
              <div class="group flexRow-center cursor-pointer gap-[6px]">
                <span
                  class="text-sm font-normal leading-none text-grayPetpet group-hover:text-colorLink lg:text-[14px]"
                >
                  {{ showAll ? 'Thu gọn' : 'Xem tất cả' }}
                </span>
                <div
                  class="mt-[4px] transition-transform duration-300"
                  :class="{ 'rotate-90': showAll }"
                >
                  <svg
                    width="7"
                    height="12"
                    viewBox="0 0 7 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="scale-[0.75] fill-grayPetpet group-hover:fill-colorLink"
                  >
                    <path
                      d="M0.310022 0.710022C0.217319 0.802536 0.143771 0.912424 0.0935898 1.0334C0.0434083 1.15437 0.0175781 1.28405 0.0175781 1.41502C0.0175781 1.54599 0.0434083 1.67567 0.0935898 1.79665C0.143771 1.91762 0.217319 2.02751 0.310022 2.12002L4.19002 6.00002L0.310022 9.88002C0.123045 10.067 0.0180016 10.3206 0.0180016 10.585C0.0180016 10.8494 0.123045 11.103 0.310022 11.29C0.497 11.477 0.750596 11.582 1.01502 11.582C1.27945 11.582 1.53304 11.477 1.72002 11.29L6.31002 6.70002C6.40273 6.60751 6.47627 6.49762 6.52645 6.37665C6.57664 6.25567 6.60247 6.12599 6.60247 5.99502C6.60247 5.86405 6.57664 5.73437 6.52645 5.6134C6.47627 5.49242 6.40273 5.38254 6.31002 5.29002L1.72002 0.700022C1.34002 0.320022 0.700022 0.320022 0.310022 0.710022Z"
                    />
                  </svg>
                </div>
              </div>
            </span>
          </div>

          <div class="mb-5">
            <span class="font-monasans text-[14px] font-normal leading-[100%] text-[#6B6B6B] lg:text-[16px]">
              Sen chọn đúng gu - Boss thích mê ly
            </span>
          </div>
        </div>
      </div>

      <div>
        <!-- Hiển thị nhiều hàng nếu showAll -->
        <div class="flex w-full flex-wrap  gap-[36px] pb-2">
          <NuxtLink
            v-for="(brand, index) in displayBrands"
            :key="brand.id"
            class="flex h-[152px] w-[211px] flex-shrink-0 flex-col justify-center overflow-hidden rounded-lg border-[2px] bg-white p-1 text-center shadow-sm"
            :to="localePath(`/brand/${brand.slug}`)"
            :title="brand.description || ''"
          >
            <div class="flex h-[44px] w-full items-center justify-center overflow-hidden bg-white">
              <img
                :src="brand.logoUrl || '/placeholder-brand.svg'"
                :alt="brand.name"
                class="block h-full rounded-2xl object-contain"
              >
            </div>
            <span class="font-[monasans] text-[24px] font-normal leading-[180%] text-grayPetpet">
              {{ brand.name }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  allbrand: Brand[]
}>()

const localePath = useLocalePath()

type Brand = {
  id: number
  name: string
  logoUrl?: string | null
  description?: string | null
}

const showAll = ref(false)
const toggleShowAll = () => (showAll.value = !showAll.value)

// Nếu showAll = true → hiển thị toàn bộ, ngược lại chỉ 5 item
const displayBrands = computed(() =>
  showAll.value ? props.allbrand || [] : (props.allbrand || []).slice(0, 5),
)
</script>

<style>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
