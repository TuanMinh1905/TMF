<template>
    <div class="flex flex-col items-center justify-center w-full py-10">
        <!-- 🏪 Tiêu đề cửa hàng -->
        <h2 class="text-[26px] font-extrabold text-yellow-400 font-monasans text-center mb-6">
            Cửa hàng PetPet Flagship Store
        </h2>

        <!-- 🧭 Phần thông tin + slider -->
        <div class="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 w-full max-w-6xl">
            <!-- 📝 Thông tin cửa hàng -->
            <div class="flex-1 space-y-4 text-gray-700">
                <!-- 📍 Địa chỉ -->
                <div class="flex items-start gap-3">
                    <div class="bg-[#E95160]/10 rounded-full h-8 w-8 flex items-center justify-center mt-1">
                        <!-- SVG địa chỉ -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#E95160]" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 
          9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 
          11.5 12 11.5z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-[16px] font-medium">
                            91B Trần Não, Phường An Khánh, T.P Hồ Chí Minh
                        </p>
                        <p class="text-[14px] text-[#E95160]">(Xem trên bản đồ)</p>
                    </div>
                </div>

                <!-- ☎️ Số điện thoại -->
                <div class="flex items-center gap-3">
                    <div class="bg-[#E95160]/10 rounded-full h-8 w-8 flex items-center justify-center">
                        <!-- SVG điện thoại -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#E95160]" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M6.62 10.79a15.093 15.093 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 
          2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 
          1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 
          1.01l-2.21 2.2z" />
                        </svg>
                    </div>
                    <p class="text-[16px]">0789 199 399 - 0789 113 133</p>
                </div>

                <!-- ⏰ Giờ hoạt động -->
                <div class="flex items-center gap-3">
                    <div class="bg-[#E95160]/10 rounded-full h-8 w-8 flex items-center justify-center">
                        <!-- SVG đồng hồ -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#E95160]" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M12 1a11 11 0 1011 11A11 11 0 0012 1zm0 20a9 9 0 119-9 9 9 0 01-9 
          9zm.5-9.79V7a.5.5 0 00-1 0v4.5a.5.5 0 00.29.45l3.5 1.75a.5.5 0 00.45-.9z" />
                        </svg>
                    </div>
                    <p class="text-[16px]">
                        Giờ hoạt động: Mở cửa: 07h00; Đóng cửa: 21h00
                    </p>
                </div>
            </div>



            <!-- 🖼️ Slider ảnh cửa hàng -->
            <div class="flex-1 flex justify-center items-center">
                <div class="relative w-[380px] h-[200px] flex items-center justify-center">
                    <!-- Ảnh trái -->
                    <img v-if="images[currentIndex - 1 >= 0 ? currentIndex - 1 : images.length - 1]"
                        :src="images[currentIndex - 1 >= 0 ? currentIndex - 1 : images.length - 1]"
                        class="absolute w-[260px] h-[160px] object-cover rounded-[16px] opacity-60 transform -translate-x-[140px] rotate-[-10deg] transition-all duration-500" />

                    <!-- Ảnh chính -->
                    <img :src="images[currentIndex]"
                        class="relative z-10 w-[320px] h-[200px] object-cover rounded-[18px] shadow-md transition-all duration-500" />

                    <!-- Ảnh phải -->
                    <img v-if="images[(currentIndex + 1) % images.length]"
                        :src="images[(currentIndex + 1) % images.length]"
                        class="absolute w-[260px] h-[160px] object-cover rounded-[16px] opacity-60 transform translate-x-[140px] rotate-[10deg] transition-all duration-500" />

                    <!-- Nút điều hướng -->
                    <button @click="prev"
                        class="absolute left-3 top-1/2 -translate-y-1/2 bg-white text-gray-700 rounded-full h-8 w-8 flex items-center justify-center shadow hover:bg-yellow-50 transition">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <button @click="next"
                        class="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-gray-700 rounded-full h-8 w-8 flex items-center justify-center shadow hover:bg-yellow-50 transition">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">
import { ref } from "vue";

const images = ref([
    'https://paddy.vn/cdn/shop/files/Paddy_Tran_Nao_1170x.png?v=1725593952',
    'https://paddy.vn/cdn/shop/files/Untitled_design_03c05b50-a9c0-4861-8724-61460ba2a817_1170x.jpg?v=1743650833',
    'https://paddy.vn/cdn/shop/files/168_1170x.jpg?v=1678602865'
]);

const currentIndex = ref(0);

function next() {
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
}

function prev() {
    currentIndex.value =
        (currentIndex.value - 1 + images.value.length) % images.value.length;
}
</script>

<style scoped>
.flexRow-center {
    @apply flex items-center justify-center;
}
</style>
