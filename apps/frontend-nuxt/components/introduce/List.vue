// components/introduce/List.vue
<template>
  <div
    class="w-fit max-w-full py-[20px] lg:flex lg:w-[1200px] lg:flex-col lg:items-center lg:justify-center lg:gap-[32px] lg:rounded-[24px] lg:bg-white lg:pb-[40px] lg:pt-[24px]"
  >
    <div class="flex flex-col lg:w-full">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="flex flex-col opacity-80">
          <span class="text-[20px] font-bold leading-[100%] text-[#000000] lg:text-[24px]">
            <strong>Thương hiệu uy tín hàng đầu</strong>
          </span>
          <div class="mb-5">
            <span class="font-monasans text-[14px] font-normal leading-[100%] text-[#6B6B6B] lg:text-[16px]">
              Sen chọn đúng gu - Boss thích mê ly
            </span>
          </div>
        </div>
      </div>
      <div v-if="isDesktop">
        <div class="flex flex-wrap justify-between gap-[24px]">
          <NuxtLink
            v-for="(brand, index) in allbrand"
            :key="index"
            class="float-left flex h-[152px] w-[211px] flex-col justify-center overflow-hidden rounded-lg border-[2px] bg-white p-1 text-center shadow-sm"
            :to="localePath(`/brand/${brand?.slug}`)"
          >
            <div class="flex h-[44px] w-full items-center justify-center overflow-hidden bg-white">
              <img
                :src="brand?.logoUrl"
                :alt="brand?.name"
                class="block h-full rounded-2xl object-contain"
              >
            </div>
            <span class="font-[monasans] text-[24px] font-normal leading-[180%] text-grayPetpet">
              {{ brand?.name }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Brand = {
  name: string
  logo?: string
  [key: string]: any
}

const props = defineProps<{ allbrand: Brand[] }>()

const localePath = useLocalePath()

const displayBrands = computed(() => {
  return props.allbrand.slice()
})

const isDesktop = useState<boolean>('ssrIsDesktop')
</script>

<style>
.grid.scroll-x--rows-2 {
  display: grid;
  /* Chỉ còn 1 hàng, cuộn ngang */
  grid-template-rows: auto;
  grid-auto-flow: column;
  overflow-x: auto;
  gap: 20px 15px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

/* Ẩn thanh cuộn cho đẹp */
.grid.scroll-x--rows-2::-webkit-scrollbar {
  display: none;
}
</style>
