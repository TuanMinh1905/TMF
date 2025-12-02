// components/product/item/ProductPrice.vue
<template>
  <div v-if="isDesktop" class="mt-[30px] flex h-full w-full flex-col gap-[20px]">
    <!-- Title -->
    <div>
      <span class="font-monasans text-[24px] font-bold leading-[40px] text-grayPetpet">
        {{ product?.name ?? '' }}
      </span>
    </div>
    <!-- Rating - Đã bán - Tym - Share -->
    <div class="flex items-center gap-[8px]">
      <div class="flex gap-[6px]">
        <svg width="88" height="16" viewBox="0 0 88 16" fill="none" xmlns="http://www.w3.org/2000/svg"
          class="translate-y-[2px]">
          <g clip-path="url(#clip0_33688_50942)">
            <path
              d="M8.00491 12.6081L3.67845 15L4.50491 9.93382L1 6.34629L5.83677 5.60917L8 1L10.1632 5.60917L15 6.34629L11.4951 9.93382L12.3216 15L8.00491 12.6081Z"
              fill="#FED519" stroke="#FED519" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <g clip-path="url(#clip1_33688_50942)">
            <path
              d="M26.0049 12.6081L21.6784 15L22.5049 9.93382L19 6.34629L23.8368 5.60917L26 1L28.1632 5.60917L33 6.34629L29.4951 9.93382L30.3216 15L26.0049 12.6081Z"
              fill="#FED519" stroke="#FED519" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <g clip-path="url(#clip2_33688_50942)">
            <path
              d="M44.0049 12.6081L39.6784 15L40.5049 9.93382L37 6.34629L41.8368 5.60917L44 1L46.1632 5.60917L51 6.34629L47.4951 9.93382L48.3216 15L44.0049 12.6081Z"
              fill="#FED519" stroke="#FED519" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <g clip-path="url(#clip3_33688_50942)">
            <path
              d="M62.0049 12.6081L57.6784 15L58.5049 9.93382L55 6.34629L59.8368 5.60917L62 1L64.1632 5.60917L69 6.34629L65.4951 9.93382L66.3216 15L62.0049 12.6081Z"
              fill="#FED519" stroke="#FED519" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <g clip-path="url(#clip4_33688_50942)">
            <path
              d="M80.0049 12.6081L75.6784 15L76.5049 9.93382L73 6.34629L77.8368 5.60917L80 1L82.1632 5.60917L87 6.34629L83.4951 9.93382L84.3216 15L80.0049 12.6081Z"
              fill="#FED519" stroke="#FED519" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_33688_50942">
              <rect width="16" height="16" fill="white" />
            </clipPath>
            <clipPath id="clip1_33688_50942">
              <rect width="16" height="16" fill="white" transform="translate(18)" />
            </clipPath>
            <clipPath id="clip2_33688_50942">
              <rect width="16" height="16" fill="white" transform="translate(36)" />
            </clipPath>
            <clipPath id="clip3_33688_50942">
              <rect width="16" height="16" fill="white" transform="translate(54)" />
            </clipPath>
            <clipPath id="clip4_33688_50942">
              <rect width="16" height="16" fill="white" transform="translate(72)" />
            </clipPath>
          </defs>
        </svg>
        <span class="font-monasans text-[14px] font-normal leading-[150%]">
          {{ product?.rating }}/5
        </span>
      </div>
      <span class="font-monasans text-[14px] font-normal leading-[150%]">
        | Đã bán {{ product?.total_sell }}
      </span>
      <div class="flex gap-[6px]">
        <div>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.1111 6C22.6333 6 25 9.3525 25 12.48C25 18.8138 15.1778 24 15 24C14.8222 24 5 18.8138 5 12.48C5 9.3525 7.36667 6 10.8889 6C12.9111 6 14.2333 7.02375 15 7.92375C15.7667 7.02375 17.0889 6 19.1111 6Z"
              stroke="#707070" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <!-- Nút copy link -->
        <div>
          <!-- Nút Share -->
          <div @click="copyLink" class="cursor-pointer active:scale-95 transition-transform">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 16.7982C23.9739 19.8708 23.8038 21.5646 22.686 22.6815C21.3684 24 19.2462 24 15.0027 24C10.7592 24 8.637 24 7.3185 22.6815C6 21.363 6 19.2417 6 14.9973C6 10.7538 6 8.6316 7.3185 7.314C8.4354 6.1962 10.1292 6.0261 13.2018 6"
                stroke="#414545" stroke-width="1.5" stroke-linecap="round" />
              <path
                d="M24.0008 10.5H16.8008C15.1646 10.5 14.1791 11.3028 13.8128 11.67C13.7006 11.784 13.6436 11.841 13.6418 11.841C13.6418 11.8428 13.5848 11.8998 13.4708 12.012C13.1036 12.3783 12.3008 13.3638 12.3008 15V17.7M24.0008 10.5L19.5008 6M24.0008 10.5L19.5008 15"
                stroke="#ED4959" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <!-- ✅ Thông báo copy thành công -->
          <transition name="fade-slide">
            <div v-if="showToast"
              class="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#333] px-4 py-3 text-sm text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white"
                class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Đã copy link sản phẩm vào clipboard</span>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- Giá bán - giá gạch - Tag khuyến mãi -->
    <div class="mb-[10px] flex h-fit w-full items-center justify-between">
      <div class="flex gap-[8px]">
        <!-- Giá Bán -->
        <div class="flex h-fit w-fit">
          <span class="font-monasans text-[32px] font-bold leading-[26px] text-textProduct">
            {{ formatVNDWithComma(unit?.price) }}
          </span>
          <span
            class="font-monasans text-[14px] font-bold leading-[32px] text-[#E95160] underline decoration-1 underline-offset-0">
            đ
          </span>
        </div>
        <!-- Giá Gạch -->
        <div v-if="product?.price < product?.compare_at_price" class="h-[12px] w-fit">
          <span class="font-monasans text-[14px] font-medium leading-[32px] text-grayPetpet line-through">
            {{ formatVNDWithComma(unit?.compare_at_price) }}
          </span>
          <span
            class="font-monasans text-[10px] font-medium leading-[32px] text-grayPetpet underline decoration-1 underline-offset-0">
            đ
          </span>
        </div>
        <!-- Tag khuyến mãi -->
        <div v-if="unit?.price < unit?.compare_at_price" class="ml-[3px]">
          <span class="right-0 top-0 m-[4px] rounded-sm bg-primary p-[2px] text-[12px] font-bold text-[#FD6700]">
            {{ (100 - (unit?.price / unit?.compare_at_price) * 100).toFixed(1) }}%
          </span>
        </div>
      </div>
    </div>
    <!-- Vận chuyển và miễn phí vận chuyển -->
    <div class="flex items-center gap-[30px]">
      <p class="font-monasans text-[16px] font-normal leading-[100%] text-grayPetpet">
        Vận chuyển:
      </p>
      <h3 class="font-monasans text-[16px] font-bold leading-[100%] text-grayPetpet">
        Miễn phí vận chuyển
      </h3>
    </div>
    <!-- Biến thể -->
    <div class="flex gap-[30px]">
      <p class="font-monasans text-[16px] font-normal leading-[100%] text-grayPetpet">Phân loại:</p>
      <button v-for="(item, index) in units" :key="index" type="button"
        class="flexCol-center h-[108px] w-[79px] gap-[12px] rounded-[12px]"
        :class="selectedIndex === index ? 'border-[1px] border-primary' : ''" @click="updateSelected(index)">
        <p class="font-monasans text-[16px] font-normal leading-[100%] text-grayPetpet">
          {{ item.variant_unit_name }}
        </p>
        <figure>
          <img :src="item.main_image" alt="Ảnh combo" class="rounded-[12px]" />
        </figure>
      </button>
    </div>
    <!-- Số lượng -->
    <div class="flex items-center gap-[30px]">
      <p class="font-monasans text-[16px] font-normal leading-[100%] text-grayPetpet">Số lượng:</p>
      <div class="flex items-center">
        <button class="h-[34px] w-[34px] rounded-bl-[14px] rounded-tl-[14px] border-y border-l border-[#A8A8A8]"
          @click="count--">
          -
        </button>
        <!-- <input
              type="text"
              :placeholder="count"
              class="flexRow-center h-[34px] w-[41px] border border-[#A8A8A8]"
            /> -->
        <p class="flexRow-center h-[34px] w-[41px] border border-[#A8A8A8]">
          {{ count }}
        </p>
        <button class="h-[34px] w-[34px] rounded-br-[14px] rounded-tr-[14px] border-y border-r border-[#A8A8A8]"
          @click="count++">
          +
        </button>
      </div>
    </div>
    <!-- Nút Mua ngay -->
    <!-- Nút Mua ngay -->
    <button class="mb-[30px] h-[46px] w-[160px] rounded-[12px] bg-primary" @click="showPopup = true">
      <span class="font-monasans text-[16px] font-medium leading-[100%] text-grayPetpet">
        Mua ngay
      </span>
    </button>

    <!-- Hiển thị Popup -->
    <BannerPopup v-if="showPopup" :show="showPopup" @close="showPopup = false" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const showPopup = ref(false);

const isDesktop = useState<boolean>('ssrIsDesktop')

// Đây là biến thể
const units = computed(() => props.product?.units ?? [])
const selectedIndex = ref(0)
const unit = computed(() => units.value[selectedIndex.value] ?? null)

function updateSelected(index: number) {
  selectedIndex.value = index
}

const countProduct = () => useState<number>('count', () => 0)
const count = countProduct()

const showToast = ref(false)

function copyLink() {
  const link = window.location.href
  navigator.clipboard.writeText(link)
  showToast.value = true
  setTimeout(() => (showToast.value = false), 2500)
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
