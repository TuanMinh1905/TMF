<template>
  <div
    class="flexCol-center h-fit w-full gap-[16px] bg-white px-[10px] py-[16px] lg:rounded-[24px] lg:p-[20px]"
  >
    <div class="flex h-fit w-full flex-col gap-[16px]">
      <div class="flex h-fit w-full justify-between">
        <span class="font-monasans text-[20px] font-semibold leading-[100%] text-grayPetpet">
          THÔNG TIN CHI TIẾT
        </span>
      </div>
      <div class="flex h-fit w-full flex-col items-center gap-[12px]">
        <span class="font-monasans text-[16px] font-bold leading-[100%] text-grayPetpet">
          {{ product.title }}
        </span>
      </div>
      <div class="flex h-fit w-full flex-col gap-[8px]">
        <div class="flex h-fit w-full justify-between rounded-[8px] bg-[#F4F4F4] p-[8px]">
          <span class="font-normal font-monasans text-[14px] leading-[100%] text-[#707070]">
            Thương hiệu
          </span>
          <span class="font-normal font-monasans text-[14px] leading-[100%] text-grayPetpet">
            {{ product.vendor }}
          </span>
        </div>
        <div class="flex h-fit w-full justify-between rounded-[8px] bg-[#F4F4F4] p-[8px]">
          <span class="font-normal font-monasans text-[14px] leading-[100%] text-[#707070]">
            Xuất sứ
          </span>
          <span class="font-normal font-monasans text-[14px] leading-[100%] text-grayPetpet">
            {{ product.country }}
          </span>
        </div>
        <div class="flex h-fit w-full justify-between rounded-[8px] bg-[#F4F4F4] p-[8px]">
          <span class="font-normal font-monasans text-[14px] leading-[100%] text-[#707070]">
            Khối lượng
          </span>
          <span class="font-normal font-monasans text-[14px] leading-[100%] text-grayPetpet">
            {{ product.weight }} {{ product.weight_unit }}
          </span>
        </div>
        <div class="flex h-fit w-full justify-between rounded-[8px] bg-[#F4F4F4] p-[8px]">
          <span class="font-normal font-monasans text-[14px] leading-[100%] text-[#707070]">
            Hạn sử dụng
          </span>
          <span class="font-normal font-monasans text-[14px] leading-[100%] text-grayPetpet">
            {{ formatVNDWithComma(product.expired_date) }}
          </span>
        </div>
      </div>
      <!--  -->
      <div class="flex h-fit w-full flex-col gap-[12px]">
        <span class="font-monasans text-[16px] font-bold leading-[100%] text-grayPetpet">
          Mô tả sản phẩm
        </span>
        <div class="flex w-full flex-col items-center justify-center gap-[12px]">
          <div
            :class="[
              // 'font-normal whitespace-pre-line  font-monasans text-[16px] leading-[20px] text-grayPetpet',
              // showFull ? '' : 'line-clamp-3',
            ]"
            v-html="product.content"
          />

          <!-- prettier-ignore -->
          <!-- <button
                v-if="
                  (product.content && product.content.length >= 200 && isDesktop === false) || (product.content && product.content.length >= 400 && isDesktop)
                "
                class="flex h-fit w-fit gap-[4px] rounded-[50px] py-[6px] pl-[4px]"
                @click="showFull = !showFull"
              >
                <span class="font-normal leading[100%] font-monasans text-[14px] text-colorLink">
                  {{ showFull ? 'Thu gọn' : 'Xem thêm' }}
                </span>
                <div
                  :class="showFull ? 'rotate-180' : ''"
                  class="mt-[3px]"
                >
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 6.5L5 10.5L9 6.5"
                      stroke="#0077A9"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>
