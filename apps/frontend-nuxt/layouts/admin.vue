<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Header -->
    <header class="bg-slate-800 text-white shadow-lg">
      <div
        class="max-w-full mx-auto px-6 py-3 flex justify-between items-center"
      >
        <div class="flex items-center gap-4">
          <NuxtLink to="/admin" class="text-2xl font-bold text-yellow-400">
            TMF
          </NuxtLink>
          <span class="text-slate-500">|</span>
          <span class="text-slate-300 font-medium">Quản trị hệ thống</span>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-slate-300">
            <strong class="text-white">{{
              authStore.user?.fullName || authStore.user?.email
            }}</strong>
            <span
              class="ml-2 px-2 py-0.5 bg-yellow-500 text-slate-800 text-xs font-bold rounded"
              >ADMIN</span
            >
          </span>
          <NuxtLink
            to="/"
            class="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-white rounded transition"
          >
            Về trang chủ
          </NuxtLink>
          <button
            class="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition"
            @click="handleLogout"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-slate-800 min-h-[calc(100vh-56px)] shadow-lg">
        <nav class="p-4 space-y-1">
          <NuxtLink
            to="/admin"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
            :class="{
              '!bg-yellow-500 !text-slate-800': route.path === '/admin',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </NuxtLink>

          <NuxtLink
            to="/admin/products"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
            :class="{
              '!bg-yellow-500 !text-slate-800':
                route.path.startsWith('/admin/products'),
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            Sản phẩm
          </NuxtLink>

          <NuxtLink
            to="/admin/categories"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
            :class="{
              '!bg-yellow-500 !text-slate-800':
                route.path.startsWith('/admin/categories'),
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Danh mục
          </NuxtLink>

          <NuxtLink
            to="/admin/orders"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
            :class="{
              '!bg-yellow-500 !text-slate-800':
                route.path.startsWith('/admin/orders'),
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            Đơn hàng
          </NuxtLink>

          <NuxtLink
            to="/admin/customers"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
            :class="{
              '!bg-yellow-500 !text-slate-800':
                route.path.startsWith('/admin/customers'),
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Khách hàng
          </NuxtLink>

          <NuxtLink
            to="/admin/brands"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
            :class="{
              '!bg-yellow-500 !text-slate-800':
                route.path.startsWith('/admin/brands'),
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            Thương hiệu
          </NuxtLink>

          <NuxtLink
            to="/admin/report"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
            :class="{
              '!bg-yellow-500 !text-slate-800':
                route.path.startsWith('/admin/report'),
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            Báo cáo
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

function handleLogout() {
  authStore.logout();
  router.push("/login");
}
</script>
