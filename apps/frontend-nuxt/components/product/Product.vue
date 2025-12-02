<template>
  <!-- <NuxtLink :to="{ name: 'p-id', params: { id: product.alias } }"> -->
  <NuxtLink :to="localePath(`/p/${product.alias}`)">
    <div
      class="hover-effect mb-[0px] mb-[10px] flex break-inside-avoid flex-col justify-between rounded-[6px] border-[1px] bg-white lg:mt-[0px] lg:h-[365px] lg:max-w-[220px] lg:rounded-[14px] lg:border-[#D8DCE0]"
    >
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
      <div class="relative px-2 pb-3">
        <!-- <BarnerProduct class="absolute top-[-25px]" /> -->
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
        <div class="flexRow-between mt-4">
          <p class="rounded-[4px] text-xl font-bold text-textProduct">
            {{ formatVNDWithComma(product.price) }}
            <span class="text-sm">đ</span>
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
const localePath = useLocalePath()
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
