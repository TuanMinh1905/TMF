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

        <!-- Cart Icon -->
        <NuxtLink
          to="/cart"
          class="relative p-2 hover:bg-gray-100 rounded-full transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-grayTMF" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <!-- Badge số lượng -->
          <span
            v-if="cartStore.totalItems > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ cartStore.totalItems > 99 ? '99+' : cartStore.totalItems }}
          </span>
        </NuxtLink>

        <!-- User Menu - Login/Logout -->
        <div class="flex items-center gap-3">
          <!-- Đã đăng nhập -->
          <template v-if="authStore.isLoggedIn">
            <!-- Link tài khoản -->
            <NuxtLink
              to="/account"
              class="flex items-center gap-2 text-sm text-grayTMF hover:text-gray-900 transition"
            >
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span class="text-sm font-bold text-gray-800">
                  {{ userInitial }}
                </span>
              </div>
              <span class="hidden lg:block">
                <strong>{{ authStore.user?.fullName || authStore.user?.email }}</strong>
              </span>
            </NuxtLink>

            <!-- Nút vào Admin (chỉ hiện với ADMIN) -->
            <NuxtLink
              v-if="authStore.isAdmin"
              to="/admin"
              class="px-3 py-1.5 text-sm bg-primary hover:bg-yellow-500 text-gray-800 rounded-lg transition font-medium"
            >
              Admin
            </NuxtLink>

            <!-- Nút Đăng xuất -->
            <button
              class="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
              @click="handleLogout"
            >
              Đăng xuất
            </button>
          </template>

          <!-- Chưa đăng nhập -->
          <template v-else>
            <NuxtLink
              to="/login"
              class="px-4 py-2 text-sm bg-primary hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition"
            >
              Đăng nhập
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
            >
              Đăng ký
            </NuxtLink>
          </template>
        </div>

        <!-- <LanguageSwitcher /> -->
      </div>

    </Wrap>
  </nav>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n, useLocalePath, useRoute } from '#imports'
import { useCartStore } from '~/store/cart'
import { useAuthStore } from '~/store/auth'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const fullURL = computed(() => route.fullPath)
const cartStore = useCartStore()
const authStore = useAuthStore()

// Fetch cart khi đã login
onMounted(() => {
  if (authStore.isLoggedIn) {
    cartStore.fetchCart()
  }
})

// Watch login state để fetch cart
watch(() => authStore.isLoggedIn, (isLoggedIn) => {
  if (isLoggedIn) {
    cartStore.fetchCart()
  } else {
    cartStore.clearCart()
  }
})

// Logout handler
function handleLogout() {
  authStore.logout()
  cartStore.clearCart()
}

// User initial for avatar
const userInitial = computed(() => {
  const name = authStore.user?.fullName || authStore.user?.email || 'U'
  return name.charAt(0).toUpperCase()
})

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
