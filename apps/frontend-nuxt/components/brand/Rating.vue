<template>
  <div
    class="flexRow-center mt-[25px] h-[60px] w-[408px] gap-[4px] rounded-[12px] bg-white px-[0px] py-[12px] lg:mt-[0px]"
  >
    <div class="flexCol-center h-[36px] w-full gap-[13px]">
      <div
        class="flex-1 text-center font-monasans text-[18px] font-bold leading-[100%] text-textProduct"
      >
        {{ brand?.rating_percent || 0 }}%
      </div>
      <div
        class="font-mulish flex-1 text-center text-[10px] font-extrabold uppercase leading-[100%] text-black"
      >
        hài lòng
      </div>
    </div>
    <div class="flex h-[36px] w-full flex-col items-center justify-between gap-[13px]">
      <div
        class="flex-1 text-center font-monasans text-[18px] font-bold leading-[100%] text-textProduct"
      >
        {{ brand?.followed_number || 0 }}
      </div>
      <div
        class="font-mulish flex-1 text-center text-[10px] font-extrabold uppercase leading-[100%] text-black"
      >
        theo dõi
      </div>
    </div>
    <div class="flex h-[36px] w-full flex-col items-center justify-between gap-[13px]">
      <div
        class="flex-1 text-center font-monasans text-[18px] font-bold leading-[100%] text-textProduct"
      >
        {{ brand?.rating || 0 }}.0/5.0
      </div>
      <div
        class="font-mulish flex-1 text-center text-[10px] font-extrabold uppercase leading-[100%] text-black"
      >
        đánh giá
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  brand: {
    type: Object,
    required: true,
  },
})
</script>
