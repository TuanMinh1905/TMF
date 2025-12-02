<template>
  <nav>
    <Wrap attr3="flexRow-between w-full">
      <div class="flex items-center gap-[24px]">
        <NuxtLink :to="localePath(`/`)">
          <span class="font-Longreach text-[60px] font-normal text-grayTMF">
            TMF
          </span>
        </NuxtLink>
        <button
          v-for="item in itemHeader"
          :key="item.name"
          :class="
            getSegment(fullURL, 0) === item.slug ? 'gap-[10px] border-b-[4px] border-primary' : ''
          "
        >
          <NuxtLink :to="localePath(item.link)">
            <span
              class="font-monasans text-[16px] leading-[160%] text-grayTMF"
              :class="getSegment(fullURL, 0) === item.slug ? 'font-bold' : 'font-normal'"
            >
              {{ item.name }}
            </span>
          </NuxtLink>
        </button>
      </div>

      <div class="flex gap-[20px] items-center">
        <div
          class="w-[500px] lg:w-[328px] search-container relative mr-[12px] h-[48px] rounded-[12px] border-[2px] border-primary bg-white transition-all duration-300"
        >
          <div class="absolute left-0 top-0 h-full w-[60px] overflow-hidden rounded-l-[12px]">
            <img
              :src="Sticker"
              alt="Ảnh thanh search"
              class="h-[160px] w-[62px] object-cover"
            >
          </div>

          <input
            ref="inputRef"
            type="text"
            placeholder="Tìm Hoddie cho mùa đông"
            class="absolute left-[61px] top-[10px] w-[75%] text-[16px] leading-[160%] text-grayTMF focus:outline-none"
          >


        </div>

        <!-- User Menu -->
        <AuthUserMenu />

        <!-- <LanguageSwitcher /> -->
      </div>

    </Wrap>
  </nav>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n, useLocalePath, useRoute } from '#imports'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const fullURL = computed(() => route.fullPath)

const itemHeader = computed(() => [
  {
    name: t('nav.home'),
    link: localePath(`/`),
    slug: ``,
  },
  {
    name: t('nav.categories'),
    link: localePath(`/category/ao`),
    slug: 'category',
  },
  {
    name: t('nav.about'),
    link: localePath(`/introduce`),
    slug: 'introduce',
  },
  {
    name: t('nav.blog'),
    link: localePath(`/blog`),
    slug: 'blog',
  },
])

const Sticker = '/icon_thanhsearch.png'
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  will-change: transform, opacity;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
