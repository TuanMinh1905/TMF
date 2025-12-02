<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-800">
            TMF
          </NuxtLink>
          <span class="text-gray-400">|</span>
          <span class="text-gray-600 font-medium">Admin Panel</span>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-gray-600">
            Xin chào, <strong>{{ authStore.user?.fullName || authStore.user?.email }}</strong>
          </span>
          <button
            class="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            @click="handleLogout"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>

    <!-- Admin Navigation -->
    <nav class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex gap-6">
          <NuxtLink
            to="/admin"
            class="py-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-yellow-400 transition"
            active-class="!text-gray-800 !border-yellow-400"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/products"
            class="py-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-yellow-400 transition"
            active-class="!text-gray-800 !border-yellow-400"
          >
            Sản phẩm
          </NuxtLink>
          <NuxtLink
            to="/admin/categories"
            class="py-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-yellow-400 transition"
            active-class="!text-gray-800 !border-yellow-400"
          >
            Danh mục
          </NuxtLink>
          <NuxtLink
            to="/admin/brands"
            class="py-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-yellow-400 transition"
            active-class="!text-gray-800 !border-yellow-400"
          >
            Thương hiệu
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-blue-50 rounded-lg p-6">
            <div class="text-blue-600 text-3xl font-bold">20</div>
            <div class="text-blue-800 mt-2">Sản phẩm</div>
          </div>
          <div class="bg-green-50 rounded-lg p-6">
            <div class="text-green-600 text-3xl font-bold">14</div>
            <div class="text-green-800 mt-2">Danh mục</div>
          </div>
          <div class="bg-yellow-50 rounded-lg p-6">
            <div class="text-yellow-600 text-3xl font-bold">25</div>
            <div class="text-yellow-800 mt-2">Thương hiệu</div>
          </div>
          <div class="bg-purple-50 rounded-lg p-6">
            <div class="text-purple-600 text-3xl font-bold">1</div>
            <div class="text-purple-800 mt-2">Người dùng</div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="mt-8">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Thao tác nhanh</h2>
          <div class="flex gap-4">
            <NuxtLink
              to="/admin/products"
              class="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition"
            >
              Quản lý sản phẩm
            </NuxtLink>
            <NuxtLink
              to="/admin/categories"
              class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
            >
              Quản lý danh mục
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

// Áp dụng middleware admin
definePageMeta({
  middleware: 'admin',
})

const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>
