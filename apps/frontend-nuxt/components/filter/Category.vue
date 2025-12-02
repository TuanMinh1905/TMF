<template>
  <div
    class="no-scrollbar flexRow-between mb-[10px] gap-[28px] overflow-x-auto overflow-y-hidden pb-[10px] pt-[16px] lg:mb-[0px] lg:gap-[25px] lg:p-[0px]"
    :class="[size.length ? '' : 'bg-white']"
  >
    <div
      v-for="(item, index) in categories"
      :key="index"
      class="flex flex-shrink-0 flex-col items-center text-center"
    >
      <button
        class="flexRow-center rounded-[14px] lg:rounded-[28px]"
        :class="[slugHas(selected, item.slug || '') ? 'bg-primary' : 'bg-[#F3F3F1]', size.sizeButton]"
        @click="
          () => {
            if (item?.slug) {
              navigateTo(localePath(`/category/${item.slug}`), { redirectCode: 302 })
            }
          }
        "
      >
        <div class="flex items-center justify-center">
          <img
            :src="item.urlImage || `/category_${item.slug || 'default'}.svg`"
            alt=""
            class="h-[96px] w-auto object-contain"
          >
        </div>
      </button>
      <span
        :class="size.sizeText"
        class="mt-1 text-center font-monasans font-bold leading-[1] text-grayPetpet lg:font-medium lg:text-[#000000]"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },

  selected: {
    type: String,
    required: true,
  },

  size: {
    type: Object,
    required: true,
  },
})
const localePath = useLocalePath()
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
