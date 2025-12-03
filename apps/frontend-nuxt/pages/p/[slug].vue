<template>
  <div class="pb-8 lg:pb-[20px]">
    <!-- <Wrap
      :attr1="'lg:pt-[20px]'"
      :attr3="'lg:flex lg:bg-white  lg:rounded-[24px]'"
    >
      <BreadcrumbProduct
        :product-title="product.title"
        :category="product.category"
      />
    </Wrap> -->

    <Wrap
      :attr1="'lg:pt-[20px]'"
      :attr3="'lg:flex lg:bg-white lg:px-[20px] lg:pt-[20px] lg:rounded-[24px]'"
    >
      <ProductGallery
        class="lg:mr-[50px]"
        :product="product"
      />
      <!--  -->
      <ProductPrice :product="product" />
    </Wrap>

    <Wrap
      :attr1="'lg:mt-[20px]'"
      :attr3="'lg:relative lg:flex lg:justify-between gap-[16px]'"
    >
      <div class="gap-[20px] lg:flexCol-center lg:h-fit lg:w-full lg:pr-[240px]">
        <ProductDescription :product="product" />
        <ProductEvaluate :product="product" />
        <ProductOneCollum :products="products" />
      </div>
    </Wrap>

    <Wrap attr1="lg:mt-[20px] lg:bg-white">
      <BrandList :allbrand="allBrand" />
    </Wrap>

    <Wrap attr1="lg:mt-[20px] pb-[50px]">
      <ListProductVertical
        :products="products"
        :loading="true"
      />
    </Wrap>

    <BannerDowload/>
  </div>
</template>

<script setup lang="ts">
import { useBrandStorage } from '~/store/brand'
import { useProductStorage } from '~/store/product'

const productStorage = useProductStorage()
const brandStore = useBrandStorage()

const route = useRoute()
const slug = route.params.slug as string

// Fetch product detail (includes relatedProducts)
await productStorage.getProductDetail(slug)
const product = computed(() => productStorage.currentProduct)
const products = computed(() => productStorage.relatedProducts)

// Watch route change
watch(() => route.params.slug, async (newSlug) => {
  if (newSlug) {
    await productStorage.getProductDetail(newSlug as string)
  }
})

brandStore.getBrand()
const allBrand = computed(() => brandStore.brands)

</script>
