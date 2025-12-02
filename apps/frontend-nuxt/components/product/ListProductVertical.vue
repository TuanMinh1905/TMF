<template>
  <div>
    <!-- Products grid -->
    <div class="grid grid-cols-5 gap-[25px]">
      <Product v-for="(product, index) in displayedProducts" :key="index" :product="product" />
    </div>

    <!-- Load more button -->
    <div v-if="hasMore" class="mt-8 flex justify-center">
      <!-- Nút xem thêm -->
      <button v-if="!loadingMore"
        class="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-medium text-black transition-colors hover:opacity-90 min-w-[190px]"
        @click="loadMore">
        Xem thêm sản phẩm
      </button>

      <!-- Nút đang tải -->
      <button v-else disabled
        class="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-medium text-black opacity-80 cursor-not-allowed min-w-[220px]">
        <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Đang tải...
      </button>
    </div>


    <!-- No more products message -->
    <div v-if="!loading && !hasMore && displayedProducts.length > 0" class="mt-8 flex justify-center">
      <p class="text-sm text-gray-500">Đã hiển thị tất cả sản phẩm</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  products: {
    type: Array,
    required: false,
    default: () => [],
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const productsPerRow = 5 // 5 sản phẩm mỗi hàng
const initialRows = 3 // Hiển thị 3 hàng đầu (15 sản phẩm)
const rowsPerLoad = 3 // Mỗi lần load thêm 3 hàng (15 sản phẩm)

// State
const rowsToShow = ref(initialRows)
const loadingMore = ref(false)

// Computed properties
const displayedProducts = computed(() => {
  const maxProducts = rowsToShow.value * productsPerRow
  return props.products.slice(0, maxProducts)
})

const hasMore = computed(() => {
  return displayedProducts.value.length < props.products.length
})

// Methods
const loadMore = async () => {
  if (loadingMore.value || !hasMore.value) return

  loadingMore.value = true

  // Simulate loading delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  rowsToShow.value += rowsPerLoad
  loadingMore.value = false
}

// Reset pagination when products change
watch(
  () => props.products,
  () => {
    rowsToShow.value = initialRows
  },
  { deep: true },
)
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
