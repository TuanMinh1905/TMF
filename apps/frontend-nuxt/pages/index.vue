<template>
  <div class="pb-8 lg:bg-white lg:pb-[20px]">
    <Wrap
        attr1="lg:bg-white"
      >
        <BannerListSlider />
    </Wrap>

    <Wrap attr1="bg-primary lg:bg-white lg:py-[20px]">
      <FilterActionAndCategory
        :listCategory="category"
      />
    </Wrap>

    <Wrap
        attr1="lg:mt-[20px] lg:bg-white"
      >
      <BrandList
        :allbrand="allBrand"
      />
    </Wrap>

    <Wrap attr1="lg:mt-[20px] lg:bg-white pt-[0px] lg:pt-[24px] pb-[0px] lg:pb-[40px]">
      <FilterCategory
        :categories="category"
        :selected="'cho-boss'"
        :size="sizeMap['homeTwo']"
      />
    </Wrap>

    <Wrap
        attr1="bg-colorLayout lg:bg-white pb-[50px]"
      >
      <ListProductVertical
        :products="products"
        :loading="productsLoading"
      />
    </Wrap>

    <Wrap
      attr1="lg:mt-[20px] "
    >
      <BannerDowload />
    </Wrap>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStorage } from '~/store/category'
import { useBrandStorage } from '~/store/brand'
import { useProductStorage } from '~/store/product'

const { sizeMap } = useFilterSizeTokens()

const categoryStorage = useCategoryStorage()
categoryStorage.getCategory()
const category = computed(() => categoryStorage.category)

const brandStore = useBrandStorage()
brandStore.getBrand()
const allBrand = computed(() => brandStore.brands)

const productStore = useProductStorage()
productStore.getProducts()
const products = computed(() => productStore.products)
const productsLoading = computed(() => productStore.loading)

watchEffect(() => {
  console.log('All Brands on Home Page:', allBrand.value)
})

</script>