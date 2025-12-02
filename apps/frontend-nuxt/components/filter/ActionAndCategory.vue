<template>
  <div class="lg:flex lg:h-[171px] lg:items-center">
    <HomeAction />
    <div class="mx-[5px] h-[103px] border-[2px] border-grayPetpet opacity-30" />
    <FilterCategory
      :categories="listCategory"
      :selected="'cho-boss'"
      :size="sizeMap['homeOne']"
      class="ml-[28px]"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  listCategory: {
    type: Array,
    required: true,
  },
})

const { sizeMap } = useFilterSizeTokens()
</script>
