<template>
  <div class="flex items-center gap-3">
    <!-- Đã đăng nhập -->
    <template v-if="authStore.isLoggedIn">
      <span class="text-sm text-gray-600">
        Xin chào, <strong>{{ authStore.user?.fullName || authStore.user?.email }}</strong>
      </span>

      <!-- Nút vào Admin (chỉ hiện với ADMIN) -->
      <NuxtLink
        v-if="authStore.isAdmin"
        to="/admin"
        class="px-3 py-1.5 text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-lg transition"
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
        class="px-4 py-2 text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition"
      >
        Đăng nhập
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>
