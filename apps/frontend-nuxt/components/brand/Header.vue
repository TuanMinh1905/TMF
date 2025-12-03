<template>
  <div class="h-fit w-full">
    <div class="relative z-[1] h-fit w-full lg:h-[401px]">
      <img
        :src="brand?.cover?.[0]"
        alt="Ảnh nền"
        class="h-full w-full rounded object-cover lg:rounded-[24px]"
      />
      <div class="absolute inset-0 rounded bg-black bg-opacity-50 lg:rounded-[24px]" />
      <!--  -->

      <div class="absolute top-[20px] flex w-full flex-col items-center justify-between px-1">
        <div
          class="z-10 mb-[25px] mt-[160px] flex w-full items-center justify-between px-1 lg:mb-[50px]"
        >
          <div class="flex h-[62px] w-full items-center justify-between px-1">
            <div class="flexRow-center gap-[13px]">
              <div
                class="flexRow-center h-[62px] w-[62px] overflow-hidden rounded-full border-[2px] border-primary bg-white lg:h-[146px] lg:w-[146px] lg:border-[5px]"
              >
                <img :src="brand?.logo" alt="" class="max-h-full max-w-full object-contain" />
              </div>
              <div class="flex h-fit w-fit flex-col gap-[6px]">
                <span
                  class="font-Longreach text-[24px] font-normal leading-[100%] text-primary lg:text-[48px]"
                >
                  {{ brand?.name }}
                </span>
                <div class="flex h-fit w-fit flex-col gap-2 rounded-[100px] bg-[#C5FFAA] p-[4px]">
                  <div class="flexRow-center h-fit w-fit gap-[2px]">
                    <div>
                      <svg
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.00131 13.3327C7.76749 13.3336 8.52631 13.1832 9.23416 12.89C9.94202 12.5967 10.585 12.1666 11.1261 11.6241C11.6685 11.083 12.0987 10.4401 12.3919 9.73221C12.6851 9.02435 12.8356 8.26554 12.8346 7.49935C12.8356 6.73317 12.6851 5.97435 12.3919 5.2665C12.0987 4.55864 11.6685 3.9157 11.1261 3.3746C10.585 2.83215 9.94202 2.40196 9.23416 2.10875C8.52631 1.81553 7.76749 1.66508 7.00131 1.66602C6.23512 1.66508 5.47631 1.81553 4.76845 2.10875C4.06059 2.40196 3.41765 2.83215 2.87656 3.3746C2.3341 3.9157 1.90391 4.55864 1.6107 5.2665C1.31748 5.97435 1.16703 6.73317 1.16797 7.49935C1.16703 8.26554 1.31748 9.02435 1.6107 9.73221C1.90391 10.4401 2.3341 11.083 2.87656 11.6241C3.41765 12.1666 4.06059 12.5967 4.76845 12.89C5.47631 13.1832 6.23512 13.3336 7.00131 13.3327Z"
                          fill="#17B157"
                          stroke="#17B157"
                          stroke-width="1.16667"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.66797 7.5L6.41797 9.25L9.91797 5.75"
                          stroke="white"
                          stroke-width="1.16667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <span
                      class="font-monasans text-[8px] font-bold uppercase leading-[100%] text-[#17B157]"
                    >
                      CHÍNH HÃNG
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <ClientOnly>
              <BrandRating :brand="brand" />
            </ClientOnly>

            <div class="h-fit w-fit gap-[10px] rounded-[100px] bg-primary px-[12px] py-[8px]">
              + Theo dõi
            </div>
          </div>
          <ClientOnly>
            <BrandRating :brand="brand" />
          </ClientOnly>
        </div>
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
