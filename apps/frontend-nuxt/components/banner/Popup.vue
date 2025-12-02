// components/banner/Popup.vue
<template>
    <!-- Overlay -->
    <div v-if="show" class="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
        @click.self="emit('close')">

        <div class="relative bg-[#FFD43B] w-[700px] h-[400px] flex items-center justify-between shadow-lg overflow-visible"
            style="border-radius: 80px 80px 0px 60px;">
            <!-- Nền app.svg -->
            <img src="/public/app.svg" alt="background"
                class="absolute inset-0 w-full h-full object-cover rounded-[80px_80px_0px_60px]" />

            <!-- Khối nội dung trái (SEN + text + QR + nút) -->
            <div class="relative z-10 flex flex-col justify-start pl-[10px] pt-[60px] w-full">
                <!-- Hàng SEN + text -->
                <div class="flex items-center">
                    <!-- Bong bóng SEN -->
                    <img src="/public/SEN.svg" alt="sen text"
                        class="w-[230px] -translate-x-[110px] -translate-y-[10px]" />

                    <!-- Khối chữ -->
                    <div class="flex flex-col justify-center -ml-[70px]">
                        <p class="font-Longreach text-[32px] font-extrabold leading-tight text-[#414545]">
                            VÀO ỨNG DỤNG TMF<br />ĐỂ TIẾP TỤC MUA SẮM NHAAAA
                        </p>

                        <p class="font-monasans text-[18px] text-[#414545] mt-[8px]">
                            Nhiều voucher và ưu đãi hấp dẫn đang chờ 😆😆
                        </p>
                    </div>
                </div>

                <!-- QR + Nút tải app -->
                <div class="flex flex-col items-start mt-[20px] ml-[110px]">
                    <!-- QR -->
                    <img src="/public/QR-2.svg" alt="qr-code"
                        class="w-[180px] h-[180px] rounded-[16px] bg-white p-[8px]" />

                    <!-- Nút tải app -->
                    <div class="flex items-center gap-[8px] mt-[14px]">
                        <!-- Google Play -->
                        <button
                            class="flex items-center justify-center px-[10px] bg-[#FFF8D6] gap-[6px] rounded-[10px] shadow w-[100px] h-[44px]">
                            <svg width="20" height="20" viewBox="0 0 36 37" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.10156 34.4047V3.5327C2.10176 3.46572 2.1212 3.4003 2.15744 3.34462C2.19367 3.28895 2.24509 3.24551 2.30525 3.21976C2.36541 3.194 2.43163 3.18708 2.4956 3.19984C2.55958 3.21261 2.61846 3.24451 2.66486 3.29154L18.3051 18.9679L2.66486 34.6459C2.61846 34.6929 2.55958 34.7248 2.4956 34.7376C2.43163 34.7504 2.36541 34.7434 2.30525 34.7177C2.24509 34.6919 2.19367 34.6485 2.15744 34.5928C2.1212 34.5372 2.10176 34.4717 2.10156 34.4047ZM24.8629 25.4094L5.25208 36.5139L5.23985 36.521C4.90202 36.7095 4.58101 36.2398 4.85769 35.9664L20.2304 20.8588L24.8629 25.4094ZM4.85922 1.96946C4.58101 1.69609 4.90202 1.22633 5.24138 1.41486L5.25361 1.42193L24.8629 12.5264L20.2304 17.0787L4.85922 1.96946ZM32.7797 20.9318L27.3034 24.0316L22.1542 18.9679L27.3034 13.9067L32.7797 17.0041C34.2694 17.8501 34.2694 20.0858 32.7797 20.9318Z"
                                    fill="#414545" />
                            </svg>
                            <div class="flex flex-col items-start leading-none">
                                <span class="font-monasans text-[8px] text-[#414545]">Download on the</span>
                                <span class="font-monasans text-[10px] font-semibold text-[#414545]">Google
                                    Play</span>
                            </div>
                        </button>

                        <!-- App Store -->
                        <button
                            class="flex items-center justify-center px-[10px] bg-[#FFF8D6] gap-[6px] rounded-[10px] shadow w-[100px] h-[44px]">
                            <svg width="20" height="20" viewBox="0 0 37 37" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M33.1975 27.0425C32.6546 28.8308 31.7985 30.6191 30.6292 32.4074C28.8336 35.2115 27.0449 36.6136 25.2631 36.6136C24.581 36.6136 23.6067 36.3847 22.3399 35.9268C21.1428 35.469 20.0919 35.2401 19.1871 35.2401C18.338 35.2401 17.3497 35.4762 16.2221 35.9483C15.0946 36.4347 14.1759 36.6779 13.466 36.6779C11.3502 36.6779 9.25522 34.8252 7.18116 31.1198C5.13493 27.3858 4.11182 23.7877 4.11182 20.3255C4.11182 17.0636 4.89829 14.3883 6.47124 12.2996C8.04419 10.2394 10.0208 9.20933 12.4011 9.20933C13.4034 9.20933 14.6353 9.42393 16.0969 9.85313C17.5445 10.2823 18.505 10.4969 18.9783 10.4969C19.6047 10.4969 20.6 10.2537 21.9641 9.76729C23.3839 9.28087 24.588 9.03765 25.5763 9.03765C27.2328 9.03765 28.7153 9.50262 30.0237 10.4325C30.7476 10.9476 31.4714 11.6629 32.1952 12.5785C31.0956 13.5371 30.3021 14.3812 29.8149 15.1108C28.9101 16.4556 28.4577 17.9363 28.4577 19.553C28.4577 21.327 28.938 22.9222 29.8985 24.3385C30.8589 25.7549 31.9586 26.6562 33.1975 27.0425Z"
                                    fill="#414545" />
                            </svg>
                            <div class="flex flex-col items-start leading-none">
                                <span class="font-monasans text-[8px] text-[#414545]">Download on the</span>
                                <span class="font-monasans text-[10px] font-semibold text-[#414545]">App
                                    Store</span>
                            </div>
                        </button>
                    </div>

                </div>
            </div>


        </div>

    </div>

</template>



<script setup>
const props = defineProps({
    show: Boolean, // nhận giá trị show từ component cha
});
const emit = defineEmits(["close"]); // gửi sự kiện "close" ra ngoài khi đóng popup
</script>

<style scoped>
.flexRow-center {
    @apply flex items-center justify-center;
}
</style>
