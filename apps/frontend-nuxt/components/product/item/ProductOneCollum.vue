<template>
  <div
    v-if="products.length > 0"
    class="no-scrollbar mx-[10px] gap-[7px] overflow-y-auto overscroll-contain lg:absolute lg:inset-y-0 lg:right-0 lg:mx-[0px] lg:grid lg:h-full lg:w-[220px] lg:gap-[13px]"
  >
    <Product
      v-for="(product, index) in products"
      :key="index"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
interface Product {
  [key: string]: any
}

defineProps<{
  products: Product[]
}>()
</script>
