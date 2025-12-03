<!-- File: components/locator/StoreLocator.vue -->
<template>
  <Wrap>
    <div class="w-full bg-white py-10">
      <!-- Tiêu đề -->
      <h2 class="text-[20px] lg:text-[22px] font-extrabold font-monasans text-black mb-6">
        Tìm kiếm cửa hàng gần nhất
      </h2>

      <!-- Dropdown filter -->
      <div class="mb-8 flex flex-col justify-between gap-8 md:flex-row">
        <!-- Province -->
        <div class="flex w-full items-center md:w-[350px]">
          <label for="province" class="mr-3 shrink-0 text-[14px] font-semibold text-gray-800">
            Tỉnh/Thành phố:
          </label>
          <select id="province" v-model="selectedProvince"
            class="w-full rounded-md border border-gray-300 px-4 py-2 font-monasans text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-400">
            <option value="">- Chọn Tỉnh/Thành phố -</option>
            <option value="">Tất cả</option>
            <option v-for="(province, index) in store.provinces" :key="province.name" :value="province.name">
              {{ province.name }}
            </option>
          </select>
        </div>

        <!-- District -->
        <div class="flex w-full items-center md:w-[350px]">
          <label for="district" class="mr-3 shrink-0 text-[14px] font-semibold text-gray-800">
            Phường/Xã:
          </label>
          <select id="district" v-model="selectedDistrict"
            class="w-full rounded-md border border-gray-300 px-4 py-2 font-monasans text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            :disabled="!selectedProvince">
            <option value="">- Chọn Phường/Xã -</option>
            <option value="">Tất cả</option>
            <option v-for="(district, idx) in filteredDistricts" :key="idx" :value="district">
              {{ district }}
            </option>
          </select>
        </div>
      </div>

      <!-- Store list title -->
      <p class="mb-4 text-[15px] font-semibold text-black">Danh sách cửa hàng:</p>

      <!-- Store list -->
      <div class="grid grid-cols-1 gap-x-8 gap-y-4 font-monasans text-[15px] text-black md:grid-cols-3">
        <div v-for="(store, idx) in displayedStores" :key="idx"
          class="flex items-center justify-between border-b border-gray-200 pb-2">
          <div class="flex items-center gap-2">
            <!-- Icon SVG màu vàng -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#FFD600]" fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0
                       9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38
                       11.5 12 11.5z" />
            </svg>
            <span class="leading-tight">{{ store.name }}</span>
          </div>

          <!-- Icon dropdown -->
          <button class="text-gray-600 hover:text-black" @click="toggleStore(idx)">
            <ChevronDownIcon v-if="expandedIndex !== idx" class="h-4 w-4" />
            <ChevronUpIcon v-else class="h-4 w-4" />
          </button>

          <!-- Chi tiết store -->
          <div v-if="expandedIndex === idx" class="col-span-3 ml-7 mt-2 text-sm text-gray-600">
            {{ store.fullAddress }}
          </div>
        </div>
      </div>

      <!-- Xem thêm -->
      <div class="mt-8 flex justify-center">
        <button v-if="visibleCount < filteredStores.length"
          class="rounded-full bg-[#FFD600] px-12 py-2.5 font-monasans font-semibold text-black shadow-sm transition-all hover:bg-[#FD6700]"
          @click="loadMore">
          Xem thêm
        </button>
      </div>
    </div>
  </Wrap>
</template>

<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'
import { computed, onMounted, ref, watch } from 'vue'

import Wrap from '~/components/base/Wrap.vue'
import { useLocatorStorage } from '~/store/locator'

// ===============================
//  STATE
// ===============================
const store = useLocatorStorage()

const selectedProvince = ref('')
const selectedDistrict = ref('')

// ===============================
//  COMPUTED FILTERS
// ===============================
const filteredDistricts = computed(() => {
  if (!selectedProvince.value) return []
  const found = store.provinces.find((p) => p.name === selectedProvince.value)
  return found ? found.districts : []
})

const filteredStores = computed(() => {
  let list = store.stores

  if (selectedProvince.value)
    list = list.filter((s) => s.province === selectedProvince.value)
  if (selectedDistrict.value)
    list = list.filter((s) => s.district === selectedDistrict.value)

  return list
})

// ===============================
//  LOAD MORE
// ===============================
const visibleCount = ref(9)
const displayedStores = computed(() =>
  filteredStores.value.slice(0, visibleCount.value)
)
const loadMore = () => (visibleCount.value += 9)

// ===============================
//  EXPAND / COLLAPSE
// ===============================
const expandedIndex = ref<number | null>(null)
const toggleStore = (idx: number) => {
  expandedIndex.value = expandedIndex.value === idx ? null : idx
}

// ===============================
//  ON MOUNT
// ===============================
onMounted(() => store.fetchStores())

watch(selectedProvince, (val) => {
  if (!val) selectedDistrict.value = ''
})
</script>
