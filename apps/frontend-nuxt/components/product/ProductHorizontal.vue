<template>
  <!-- <NuxtLink :to="{ name: 'p-id', params: { id: product.alias } }"> -->
  <NuxtLink :to="localePath(`/p/${product.alias}`)">
    <div
      class="hover-effect flex h-[256px] w-[156px] flex-col justify-between rounded-[8px] border-[1px] border-[#D8DCE0] bg-white lg:h-[365px]  lg:w-[220px] lg:rounded-[14px] "
    >
      <div
        v-if="loading"
        class="flexRow-center max-h-[156px] w-full"
      >
        <div class="h-auto max-h-[156px] w-full p-2">
          <div class="flexRow-center h-auto min-h-[156px] w-full animate-pulse rounded-md bg-gray-500">
            <svg
              class="h-10 w-10 text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path
                d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
              />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flexRow-center relative min-h-[156px] w-full overflow-hidden"
      >
        <img
          :src="product.images"
          :alt="product.name"
          class="mb-2 mt-[20px] w-full rounded-t-[24px] object-contain"
          style="object-fit: contain"
        >
        <span
          v-if="product.compare_at_price > product.price"
          class="absolute right-0 top-0 h-fit w-fit rounded-tr-[6px] bg-primary p-[2px] text-[12px] font-bold text-[#FD6700] lg:rounded-tr-[14px] lg:text-[19px]"
        >
          {{ (100 - (product.price / product.compare_at_price) * 100).toFixed(1) }}%
        </span>
      </div>

      <div
        v-if="loading"
        class="px-2 pb-1"
      >
        <div class="flex items-center gap-[1px]" />
        <div class="group flexRow-between mt-2 rounded-md bg-[#FFFDF6] pl-1">
          <p class="text-[18px] font-bold leading-[18px] text-textProduct">
            {{ formatVNDWithComma(product.price) }}
            <span class="text-sm">đ</span>
          </p>
        </div>
      </div>
      <div
        v-else
        class="px-2 pb-1"
      >
        <h2
          class="text-md w-full font-normal leading-[20px]"
          style="
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          "
        >
          {{ product.name }}
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
        <div class="group flexRow-between mt-2 rounded-md">
          <p class="text-[18px] font-bold leading-[18px] text-textProduct">
            {{ formatVNDWithComma(product.price) }}
            <span class="text-sm">đ</span>
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { formatVNDWithComma } from '~/utils/index.js'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

const localePath = useLocalePath()
</script>

<style scoped>
.hover-effect {
  /* border: 2px solid transparent; */
  transition: all 0.1s ease;
}

.hover-effect:hover {
  border: 2px solid #fed519;
  transform: translateX(5px);
}
</style>
