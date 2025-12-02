<template>
  <div
    class="h-fit bg-white px-[16px] pb-[10px] pt-[16px] lg:w-[446px] lg:p-[0px]"
  >
    <div class="no-scrollbar flex gap-[25px] overflow-x-auto overflow-y-hidden" style="max-width: 100%">
      <div
        v-for="item in menuItems"
        :key="item.label"
        class="flex h-[88px] w-[60px] flex-shrink-0 flex-col items-center text-center lg:h-[143px] lg:w-[120px]"
      >
          <NuxtLink :to="localePath(item.link)">
          <div
            role="button"
            tabindex="0"
            class="flexRow-center h-[60px] w-[60px] rounded-[14px] bg-[#F3F3F1] lg:h-[120px] lg:w-[120px] lg:rounded-[28px]"
          >
            <div><img
              :src="item.icon"
              alt=""
              class="lg:scale-[2]"
            /></div>
          </div>

          <span
            class="mt-1 text-center font-monasans text-[12px] font-bold leading-[1] text-grayPetpet lg:text-[16px] lg:font-medium lg:text-[#000000]"
          >
            {{ item.label }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const localePath = useLocalePath()

const menuItems = computed(() => [
  {
    label: 'Tạp chí',
    icon: '/quickAction_blog.svg',
    link: `/blog`,
  },
  {
    label: 'Tiệm thú y',
    icon: '/quickAction_branch.svg',
    link: '/introduce',
  },
  {
    label: 'Spa & Hotel',
    icon: '/quickAction_nowposition.svg',
    link: '/blog',
  },
])
</script>

<style scoped>
/* Custom class để ẩn scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
