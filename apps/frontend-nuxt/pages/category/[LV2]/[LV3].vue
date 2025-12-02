<template>
  <BigComponent
    :category-lv2="category"
    :selected-lv2="slugCategoryLV2"
    :category-lv3="categoryLV3"
    :selected-lv3="selectedLV3"
    :products="products"
    :brands="brands"
  />
</template>

<script setup lang="ts">
import { useBrandStorage } from '~/store/brand'
import { useCategoryStorage } from '~/store/category'
import { useProductStorage } from '~/store/product'

const route = useRoute()
const productStorage = useProductStorage()
const categoryStorage = useCategoryStorage()
const brandStore = useBrandStorage()
const slugCategoryLV2 = route.params.LV2 as string
const selectedLV3 = route.params.LV3 as string

// Category LV2
categoryStorage.getCategory()
const category = computed(() => categoryStorage.category)

// Category LV3 - lấy children của category LV2 đang được chọn
const itemCategoryLV2 = computed(
  () => category.value.find((c: any) => slugHas(slugCategoryLV2, c.slug)) ?? {},
)

const categoryLV3 = computed(() => itemCategoryLV2.value?.children || [])

// Ở đay lấy products hiển thị theo LV3
const products = computed(() => productStorage.products || [])

const itemCategoryLV3 = computed(
  () => categoryLV3.value.find((c: any) => slugHas(selectedLV3, c.slug)) ?? {},
)

watch(itemCategoryLV3, async (lv3) => {
  if (lv3?.id) {
    await productStorage.getProducts({ categoryId: lv3.id })
  }
})

// Brand
brandStore.getBrand()
const brands = computed(() => brandStore.brands)

</script>
