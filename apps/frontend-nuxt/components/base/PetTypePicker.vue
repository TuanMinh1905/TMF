<template>
  <div
    ref="target"
    class="flexRow-between h-[48px] w-[197px] cursor-pointer items-center gap-[10px] rounded-[12px] border-[2px] border-primary bg-white px-[10px] py-[6px]"
    @click="open = !open"
  >
    <div class="-m-[24px] h-[48px] overflow-hidden rounded-full">
      <img :src="imgSrc" alt="Pet Type" class="h-full w-full object-cover" />
    </div>
    <div class="flexRow-center gap-[10px]">
      <span class="font-monasans text-[16px] font-medium leading-[160%] text-grayTMF">
        {{ label }}
      </span>
      <Transition>
        <div v-show="true">
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="transition-transform duration-300"
            :class="open ? 'rotate-180' : ''"
          >
            <path
              d="M1 0.999999L7 7L13 1"
              stroke="#414545"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  imgSrc: { type: String, required: true },
  label: { type: String, default: 'Chó cưng' },
})

const open = ref(false)
const target = ref(null)
onClickOutside(target, () => {
  open.value = false
})
</script>
