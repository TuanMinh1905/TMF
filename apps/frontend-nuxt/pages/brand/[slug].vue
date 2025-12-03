<template>
  <div class="pb-8 lg:pb-[20px]">
    <!-- Loading -->
    <div v-if="brandStore.loadingDetail" class="flex items-center justify-center py-20">
      <svg class="animate-spin h-10 w-10 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Brand not found -->
    <div v-else-if="!brand" class="flex flex-col items-center justify-center py-20">
      <p class="text-xl text-gray-500">Không tìm thấy thương hiệu</p>
      <NuxtLink to="/" class="mt-4 text-yellow-500 hover:underline">Quay về trang chủ</NuxtLink>
    </div>

    <!-- Brand content -->
    <template v-else>
      <!-- Brand Header -->
      <Wrap attr1="lg:bg-white">
        <div class="flex items-center gap-6 py-6">
          <img 
            v-if="brand.logoUrl" 
            :src="brand.logoUrl" 
            :alt="brand.name" 
            class="w-24 h-24 object-contain rounded-lg border p-2"
          />
          <div>
            <h1 class="text-2xl font-bold text-gray-800">{{ brand.name }}</h1>
            <p class="text-gray-500 mt-1">{{ brandProducts.length }} sản phẩm</p>
          </div>
        </div>
      </Wrap>

      <!-- Brand Description -->
      <Wrap v-if="brand.description" attr1="lg:bg-white pt-[20px]">
        <div class="mb-[35px] flex h-fit w-full flex-col items-center justify-center gap-[4px] bg-white lg:rounded-[24px]">
          <span class="self-start lg:mb-[20px] lg:font-monasans lg:text-[20px] lg:font-bold lg:leading-[100%] lg:text-textBrand">
            Giới thiệu về {{ brand.name }}
          </span>
          <span
            :class="[
              'whitespace-pre-line p-[4px] text-[16px] font-normal leading-[130%] text-textBrand lg:text-[18px]',
              showFull ? '' : 'line-clamp-2',
            ]"
          >
            {{ brand.description }}
          </span>
          <button
            v-if="brand.description && brand.description.length >= 132"
            class="flex h-fit w-fit gap-[4px] rounded-[50px] py-[6px] pl-[4px]"
            @click="showFull = !showFull"
          >
            <span class="font-monasans text-[14px] font-normal">
              {{ showFull ? 'Thu gọn' : 'Xem thêm' }}
            </span>
            <div class="mt-[2px]">
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="transition-transform duration-300"
                :class="showFull ? 'rotate-180' : ''"
              >
                <path d="M1 6.5L5 10.5L9 6.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </button>
        </div>
      </Wrap>

      <!-- Products List -->
      <div class="flex h-fit w-full items-center justify-center gap-[10px] bg-white px-[10px] py-[12px] lg:mt-[20px]">
        <div class="lg:mb-[20px] lg:flex lg:w-full lg:items-center lg:justify-center">
          <div class="shadow-sm lg:flex lg:w-[1200px] lg:flex-col lg:justify-center lg:rounded-[24px] lg:bg-white">
            <div v-if="brandProducts.length > 0">
              <div class="grid grid-cols-2 gap-[10px] md:grid-cols-3 lg:grid-cols-5 lg:gap-[24px]">
                <div v-for="product in brandProducts" :key="product.id" class="rounded-[12px] bg-white">
                  <Product :product="product" />
                </div>
              </div>
            </div>
            <div v-else class="mt-[35px] flex h-[300px] w-full items-center justify-center text-gray-500">
              Không có sản phẩm
            </div>
          </div>
        </div>
      </div>

      <Wrap attr1="lg:mt-[20px]">
        <BannerDowload />
      </Wrap>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useBrandStorage } from '~/store/brand'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const brandStore = useBrandStorage()

// Fetch brand detail by slug
await brandStore.getBrandDetail(slug.value)

// Watch for route changes
watch(slug, async (newSlug) => {
  if (newSlug) {
    await brandStore.getBrandDetail(newSlug)
  }
})

const brand = computed(() => brandStore.currentBrand)
const brandProducts = computed(() => brandStore.brandProducts)

const showFull = ref(false)
</script>
