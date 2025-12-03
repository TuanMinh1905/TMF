// pages/brand/[name].vue
<template>
  <div class="pb-8 lg:pb-[20px]">
    <!-- 🧭 Breadcrumb -->
    <!-- <div class="flex items-center justify-center lg:bg-white lg:pb-[12px]">
      <div class="w-full lg:w-[1200px]">
        <BreadcrumbBase :items="breadcrumbItems" />
      </div>
    </div> -->

    <Wrap
      v-if="brand"
      attr1="lg:bg-white"
    >
      <BrandHeader :brand="brand" />
    </Wrap>

    <Wrap
      v-if="brand"
      attr1="lg:bg-white pt-[20px]"
    >
      <div
        class="mb-[35px] flex h-fit w-full flex-col items-center justify-center gap-[4px] bg-white"
        :class="isDesktop ? 'lg:rounded-[24px]' : ''"
      >
        <span
          v-if="isDesktop"
          class="self-start lg:mb-[20px] lg:font-monasans lg:text-[20px] lg:font-bold lg:leading-[100%] lg:text-textBrand"
        >
          Giới thiệu về {{ brand?.name || 'Brand' }} và lịch sử
        </span>

        <span
          :class="[
            'whitespace-pre-line p-[4px] text-[16px] font-normal leading-[130%] text-textBrand lg:text-[18px]',
            showFull ? '' : 'line-clamp-2',
          ]"
        >
          {{ brand?.introduction || '' }}
        </span>

        <button
          v-if="brand?.introduction && brand.introduction.length >= 132"
          class="flex h-fit w-fit gap-[4px] rounded-[50px] py-[6px] pl-[4px]"
          @click="showFull = !showFull"
        >
          <span class="font-monasans text-[14px] font-normal">
            {{ showFull ? 'Thu gọn' : 'Xem thêm' }}
          </span>
          <Transition>
            <div
              v-if="true"
              class="mt-[2px]"
            >
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="transition-transform duration-300"
                :class="showFull ? 'rotate-180' : ''"
              >
                <path
                  d="M1 6.5L5 10.5L9 6.5"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </Transition>
        </button>
      </div>
    </Wrap>

    <div
      class="flex h-fit w-full items-center justify-center gap-[10px] bg-white px-[10px] py-[12px] lg:mt-[20px]"
    >
      <button
        class="flex h-[30px] w-[205px] items-center justify-center rounded-[16px] bg-[#FFF8E1] px-[8px] py-[12px]"
        :class="selectedTabBrand === 'boss' ? 'bg-primary font-bold' : 'bg-primary'"
        @click="selectedTabBrand = 'boss'"
      >
        <span class="font-monasans text-[16px] font-normal leading-[20px]">Dành cho Boss</span>
      </button>

      <button
        class="flex h-[30px] w-[205px] items-center justify-center rounded-[16px] bg-[#FFF8E1] px-[8px] py-[12px]"
        :class="selectedTabBrand === 'promo' ? 'bg-primary font-bold' : 'bg-primary'"
        @click="selectedTabBrand = 'promo'"
      >
        <span class="font-monasans text-[16px] font-normal leading-[20px]">Khuyến mãi</span>
      </button>
    </div>

    <!-- 4. Danh sách sản phẩm -->
    <div
      class="flex h-fit w-full items-center justify-center gap-[10px] bg-white px-[10px] py-[12px] lg:mt-[20px]"
    >
      <div class="lg:mb-[20px] lg:flex lg:w-full lg:items-center lg:justify-center">
        <!-- ✅ Khối chính nền trắng -->
        <div
          class="shadow-sm lg:flex lg:w-[1200px] lg:flex-col lg:justify-center lg:rounded-[24px] lg:bg-white"
        >
          <div v-if="productsBrand.length > 0">
            <!-- Skeleton -->
            <!-- <SkeletonCard v-if="Object.keys(productsBrand).length === 0" class="z-0 bg-white" /> -->

            <!-- ✅ Danh sách sản phẩm -->
            <div v-if="productsBrand.length > 0">
              <div class="grid grid-cols-2 gap-[10px] md:grid-cols-3 lg:grid-cols-5 lg:gap-[24px]">
                <div
                  v-for="(product, index) in productsBrand"
                  :key="index"
                  class="rounded-[12px] bg-white"
                >
                  <Product :product="product" />
                </div>
              </div>
            </div>

            <!-- ✅ Không có dữ liệu -->
            <div
              v-else
              class="mt-[35px] flex h-[300px] w-full items-center justify-center text-gray-500"
            >
              Không có dữ liệu
            </div>
          </div>
        </div>
      </div>
    </div>

    <Wrap
      v-if="isDesktop"
      attr1="lg:mt-[20px]"
    >
      <BannerDowload />
    </Wrap>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useBrandStorage } from '~/store/brand'

const isDesktop = useState<boolean>('ssrIsDesktop')

const route = useRoute()
const slug = computed(() => (route.params.name as string) || '')

const brandStore = useBrandStorage()
brandStore.getBrand()
const brands = computed(() => brandStore.brands)
const brand = computed(() => brands.value.find((b: any) => b.slug === slug.value) ?? null)

const productsBrand = ref<any[]>([])
const selectedTabBrand = ref<'boss' | 'promo'>('boss')

//  Khai báo breadcrumb items
const breadcrumbItems = [
  { label: 'Petpet', to: '/' },
  { label: brand.value?.name || 'Thương hiệu' },
]

// watchEffect(() => {
//   if (!brand.value?._id) return

//   if (selectedTabBrand.value === 'promo') {
//     brandStore.getBrandPromo(brand.value._id)
//     productsBrand.value = brandStore.brandsPromo
//   } else if (selectedTabBrand.value === 'boss') {
//     brandStore.getBrandBoss(brand.value._id)
//     productsBrand.value = brandStore.brandsBoss
//   }
// })

// Watch both selectedTabBrand AND brand
watch(
  [selectedTabBrand, brand],
  async ([newTab, newBrand]) => {
    // Check if brand is loaded
    if (!newBrand?._id) return

    if (newTab === 'promo') {
      await brandStore.getBrandPromo(newBrand._id)
      productsBrand.value = brandStore.brandsPromo
    }
    else if (newTab === 'boss') {
      await brandStore.getBrandBoss(newBrand._id)
      productsBrand.value = brandStore.brandsBoss
    }
  },
  { immediate: true },
)

const showFull = ref(false)

definePageMeta({
  // middleware: 'layout-switcher',
})
</script>
