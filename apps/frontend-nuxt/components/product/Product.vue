<template>
  <div
    class="hover-effect mb-[0px] mb-[10px] flex break-inside-avoid flex-col justify-between rounded-[6px] border-[1px] bg-white lg:mt-[0px] lg:h-[400px] lg:max-w-[220px] lg:rounded-[14px] lg:border-[#D8DCE0]"
  >
    <!-- Link to product detail -->
    <NuxtLink :to="localePath(`/p/${product.alias}`)">
      <div class="flexRow-center relative overflow-hidden lg:rounded-t-[14px]">
        <img
          :src="product.images"
          :alt="product.name"
          class="mb-2 mt-[5px] h-full min-h-[200px] w-full rounded object-cover lg:min-h-[258px] lg:scale-125"
          style="object-fit: contain"
        >
        <span
          v-if="product.compare_at_price > product.price"
          class="absolute right-0 top-0 m-[4px] h-fit w-fit rounded-[6px] bg-primary p-[2px] text-[12px] font-bold text-[#FD6700] lg:rounded-[14px]"
        >
          {{ (100 - (product.price / product.compare_at_price) * 100).toFixed(1) }}%
        </span>
      </div>
      <div class="relative px-2 pb-2">
        <h2
          class="text-md w-full font-normal leading-[20px]"
          style="
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          "
        >
          {{ product.title }}
        </h2>
        <div class="flex items-center gap-[1px]">
          <svg
            width="15"
            height="16"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.16143 0.681186L7.65343 4.1539L11.4731 4.4766C11.738 4.4991 11.8458 4.82417 11.6447 4.99529L8.74743 7.46379L9.61565 11.1361C9.67586 11.3913 9.39468 11.592 9.16709 11.4564L5.88447 9.50953L2.60184 11.4564C2.37365 11.5914 2.09307 11.3907 2.15328 11.1361L3.0215 7.46379L0.123619 4.9947C-0.0774806 4.82358 0.0296923 4.49851 0.295216 4.47601L4.11491 4.15331L5.6069 0.681185C5.71046 0.439605 6.05787 0.439605 6.16143 0.681185L6.16143 0.681186Z"
              fill="#FFC226"
            />
          </svg>

          <svg
            width="15"
            height="16"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.16143 0.681186L7.65343 4.1539L11.4731 4.4766C11.738 4.4991 11.8458 4.82417 11.6447 4.99529L8.74743 7.46379L9.61565 11.1361C9.67586 11.3913 9.39468 11.592 9.16709 11.4564L5.88447 9.50953L2.60184 11.4564C2.37365 11.5914 2.09307 11.3907 2.15328 11.1361L3.0215 7.46379L0.123619 4.9947C-0.0774806 4.82358 0.0296923 4.49851 0.295216 4.47601L4.11491 4.15331L5.6069 0.681185C5.71046 0.439605 6.05787 0.439605 6.16143 0.681185L6.16143 0.681186Z"
              fill="#FFC226"
            />
          </svg>

          <svg
            width="15"
            height="16"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.16143 0.681186L7.65343 4.1539L11.4731 4.4766C11.738 4.4991 11.8458 4.82417 11.6447 4.99529L8.74743 7.46379L9.61565 11.1361C9.67586 11.3913 9.39468 11.592 9.16709 11.4564L5.88447 9.50953L2.60184 11.4564C2.37365 11.5914 2.09307 11.3907 2.15328 11.1361L3.0215 7.46379L0.123619 4.9947C-0.0774806 4.82358 0.0296923 4.49851 0.295216 4.47601L4.11491 4.15331L5.6069 0.681185C5.71046 0.439605 6.05787 0.439605 6.16143 0.681185L6.16143 0.681186Z"
              fill="#FFC226"
            />
          </svg>

          <svg
            width="15"
            height="16"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.16143 0.681186L7.65343 4.1539L11.4731 4.4766C11.738 4.4991 11.8458 4.82417 11.6447 4.99529L8.74743 7.46379L9.61565 11.1361C9.67586 11.3913 9.39468 11.592 9.16709 11.4564L5.88447 9.50953L2.60184 11.4564C2.37365 11.5914 2.09307 11.3907 2.15328 11.1361L3.0215 7.46379L0.123619 4.9947C-0.0774806 4.82358 0.0296923 4.49851 0.295216 4.47601L4.11491 4.15331L5.6069 0.681185C5.71046 0.439605 6.05787 0.439605 6.16143 0.681185L6.16143 0.681186Z"
              fill="#FFC226"
            />
          </svg>

          <svg
            width="15"
            height="16"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.16143 0.681186L7.65343 4.1539L11.4731 4.4766C11.738 4.4991 11.8458 4.82417 11.6447 4.99529L8.74743 7.46379L9.61565 11.1361C9.67586 11.3913 9.39468 11.592 9.16709 11.4564L5.88447 9.50953L2.60184 11.4564C2.37365 11.5914 2.09307 11.3907 2.15328 11.1361L3.0215 7.46379L0.123619 4.9947C-0.0774806 4.82358 0.0296923 4.49851 0.295216 4.47601L4.11491 4.15331L5.6069 0.681185C5.71046 0.439605 6.05787 0.439605 6.16143 0.681185L6.16143 0.681186Z"
              fill="#FFC226"
            />
          </svg>
        </div>
        <div class="flexRow-between mt-2">
          <p class="rounded-[4px] text-xl font-bold text-textProduct">
            {{ formatVNDWithComma(product.price) }}
            <span class="text-sm">đ</span>
          </p>
        </div>
      </div>
    </NuxtLink>
    
    <!-- Nút thêm vào giỏ hàng -->
    <div class="px-2 pb-3">
      <button
        class="w-full flex items-center justify-center gap-2 py-2 bg-primary hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition-all text-sm"
        :disabled="loading"
        @click="handleAddToCart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span v-if="loading">Đang thêm...</span>
        <span v-else>Thêm vào giỏ</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'
import { useAuthStore } from '~/store/auth'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const localePath = useLocalePath()
const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const loading = ref(false)

async function handleAddToCart() {
  // Kiểm tra đăng nhập
  if (!authStore.isLoggedIn) {
    // Redirect đến trang login
    router.push('/login')
    return
  }

  loading.value = true
  const result = await cartStore.addToCart(props.product.id)
  loading.value = false

  if (result.success) {
    // Có thể show toast notification ở đây
    console.log('Đã thêm vào giỏ hàng!')
  } else {
    alert(result.error || 'Lỗi thêm vào giỏ hàng')
  }
}
</script>

<style scoped>
.hover-effect {
  transition: all 0.1s ease;
}

.hover-effect:hover {
  border: 2px solid #fed519;
  transform: translateY(-5px);
}
</style>
