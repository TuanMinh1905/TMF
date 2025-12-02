<template>
  <div
    class="flexCol-center h-fit w-full gap-[16px] rounded-[24px] bg-white px-[10px] py-[16px] lg:p-[20px]"
  >
    <div class="flex w-full items-center gap-[16px]">
      <span class="font-monasans text-[24px] font-semibold leading-[160%] text-[#000000]">
        ĐÁNH GIÁ
      </span>
      <div
        class="flexRow-center h-fit w-fit gap-[4px] rounded-[50px] bg-[#FFF693] px-[7px] py-[4px]"
      >
        <span class="font-monasans text-[16px] font-semibold leading-[100%] text-grayPetpet">
          {{ product.rating }}
        </span>
        <div>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.37831 2.07556L10.4135 6.70584L15.6238 7.1361C15.9852 7.1661 16.1322 7.59952 15.8579 7.82768L11.9058 11.119L13.0901 16.0153C13.1722 16.3556 12.7887 16.6232 12.4782 16.4424L8.00051 13.8466L3.52279 16.4424C3.21151 16.6224 2.82879 16.3548 2.91092 16.0153L4.09523 11.119L0.142316 7.82689C-0.131998 7.59873 0.0141935 7.16531 0.376387 7.13531L5.58671 6.70505L7.62189 2.07556C7.76316 1.75346 8.23705 1.75346 8.37831 2.07556L8.37831 2.07556Z"
              fill="#FED519"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="h-fit w-full">
      <div
        v-for="item in itemsFeedback"
        :key="item.id"
        class="bg-white p-5"
        :class="item.id === itemsFeedback.length ? '' : 'border-b-[0.5px] border-[#D8D8D8]'"
      >
        <div class="flex items-start gap-3">
          <img
            :src="item.avatar"
            alt="avatar"
            class="h-10 w-10 rounded-full object-cover shadow ring-2 ring-white"
          />

          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-x-3">
              <h3 class="font-semibold text-gray-900">
                {{ item.name }}
              </h3>
              <div class="text-sm leading-none text-amber-400">★★★★★</div>
            </div>

            <p class="mt-1 text-[13px] text-gray-500">
              {{ item.date }}
              <span class="mx-2 text-gray-300">|</span>
              Phân loại: {{ item.variant }}
            </p>

            <p class="mt-3 text-sm leading-relaxed text-gray-700">
              {{ item.content }}
            </p>
          </div>
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

const itemsFeedback = [
  {
    id: 1,
    name: 'Phạm Tuấn Minh',
    avatar: '/avt_Test1.jpg',
    rating: 5.0,
    date: '15/03/2025',
    variant: 'Túi 2 Kg',
    content:
      'Shop uy tín. Đóng gói hàng hộp giấy cứng còn bọc chống sốc đầy đủ. Gửi hàng đi nhanh, và ship cũng rất lẹ, 1 ngày đã nhận. Giá thì quá ngon. Royal thì chất lượng khỏi bàn rồi, quá ok. Thank shop. 5 sao.',
  },
  {
    id: 2,
    name: 'Đỗ Quang Thanh',
    avatar: '/avt_Test2.jpg',
    rating: 5.0,
    date: '14/03/2025',
    variant: 'Túi 2 Kg',
    content: 'Sản phẩm chất lượng. Đóng gói cẩn thận. Giao hàng nhanh chóng',
  },
  {
    id: 3,
    name: 'Trịnh Gia Ngân',
    avatar: '/avt_Test3.jpg',
    rating: 5.0,
    date: '11/03/2025',
    variant: 'Túi 5 Kg',
    content: 'Sản phẩm chất lượng. Đóng gói cẩn thận. Giao hàng nhanh chóng',
  },
]
</script>
