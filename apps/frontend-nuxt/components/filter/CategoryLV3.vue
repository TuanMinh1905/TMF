<template>
  <div class="relative">
    <div
      class="no-scrollbar overflow-x-auto whitespace-nowrap bg-white lg:rounded-[24px]"
    >
      <button
        v-for="(filter, index) in categories"
        :key="filter.id ?? index"
        class="mr-2 inline-block rounded-full border border-[#D8DCE0] px-4 py-1 text-[14px] font-normal"
        :class="
          slugHas(selectedLV3, filter.slug)
            ? 'bg-primary text-black'
            : 'bg-white text-grayPetpet'
        "
        @click="(navigateTo(localePath(`/category/${selectedLV2}/${filter.slug}`), { redirectCode: 302 }))"
      >
        {{ filter?.name }}
      </button>
    </div>
  
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },

  selectedLV2: {
    type: String,
    required: true,
  },

  selectedLV3: {
    type: String,
    required: true,
  },
})

const localePath = useLocalePath()

</script>

<style scoped>
/* Ẩn thanh cuộn ngang */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
