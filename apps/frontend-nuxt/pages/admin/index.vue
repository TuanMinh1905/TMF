<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <svg class="animate-spin h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <div v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Sản phẩm</p>
              <p class="text-2xl font-bold text-gray-800">{{ stats.products }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Đơn hàng</p>
              <p class="text-2xl font-bold text-gray-800">{{ stats.orders }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Khách hàng</p>
              <p class="text-2xl font-bold text-gray-800">{{ stats.customers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Doanh thu</p>
              <p class="text-2xl font-bold text-gray-800">{{ formatVNDWithComma(stats.totalRevenue) }}đ</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Secondary Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-800">Đơn chờ xử lý</h3>
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              {{ stats.pendingOrders }}
            </span>
          </div>
          <NuxtLink 
            to="/admin/orders?status=PENDING" 
            class="text-blue-600 hover:underline text-sm"
          >
            Xem tất cả →
          </NuxtLink>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-800">Danh mục</h3>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {{ stats.categories }}
            </span>
          </div>
          <NuxtLink 
            to="/admin/categories" 
            class="text-blue-600 hover:underline text-sm"
          >
            Quản lý danh mục →
          </NuxtLink>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-800">Thương hiệu</h3>
            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {{ stats.brands }}
            </span>
          </div>
          <NuxtLink 
            to="/admin/brands" 
            class="text-blue-600 hover:underline text-sm"
          >
            Quản lý thương hiệu →
          </NuxtLink>
        </div>
      </div>

      <!-- Order Status & Recent Orders -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="font-semibold text-gray-800 mb-4">Trạng thái đơn hàng</h3>
          <div class="space-y-3">
            <div
              v-for="status in ordersByStatus"
              :key="status.status"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <span 
                  class="w-3 h-3 rounded-full"
                  :class="getStatusDotClass(status.status)"
                ></span>
                <span class="text-gray-700">{{ getStatusLabel(status.status) }}</span>
              </div>
              <span class="font-medium text-gray-800">{{ status.count }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-800">Đơn hàng gần đây</h3>
            <NuxtLink 
              to="/admin/orders" 
              class="text-blue-600 hover:underline text-sm"
            >
              Xem tất cả
            </NuxtLink>
          </div>
          <div class="space-y-3">
            <div
              v-for="order in recentOrders"
              :key="order.id"
              class="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div>
                <p class="font-medium text-gray-800">TMF{{ String(order.id).padStart(8, '0') }}</p>
                <p class="text-sm text-gray-500">{{ order.customer }}</p>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-800">{{ formatVNDWithComma(order.totalAmount) }}đ</p>
                <span 
                  class="text-xs px-2 py-0.5 rounded-full"
                  :class="getStatusClass(order.status)"
                >
                  {{ getStatusLabel(order.status) }}
                </span>
              </div>
            </div>
            <div v-if="recentOrders.length === 0" class="text-center text-gray-500 py-4">
              Chưa có đơn hàng
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="font-semibold text-gray-800 mb-4">Thao tác nhanh</h3>
        <div class="flex flex-wrap gap-4">
          <NuxtLink
            to="/admin/products/create"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Thêm sản phẩm
          </NuxtLink>
          <NuxtLink
            to="/admin/categories"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Thêm danh mục
          </NuxtLink>
          <NuxtLink
            to="/admin/orders"
            class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-800 rounded-lg transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Xem đơn hàng
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import clientAPI from '~/services/_AxiosConfig'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const authStore = useAuthStore()

const loading = ref(true)
const stats = ref({
  products: 0,
  categories: 0,
  brands: 0,
  customers: 0,
  orders: 0,
  pendingOrders: 0,
  totalRevenue: 0,
})
const ordersByStatus = ref<{ status: string; count: number }[]>([])
const recentOrders = ref<any[]>([])

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING: 'Chờ xác nhận',
    CONFIRMED: 'Đã xác nhận',
    SHIPPING: 'Đang giao',
    COMPLETED: 'Hoàn thành',
    CANCELLED: 'Đã hủy',
  }
  return labels[status] || status
}

function getStatusClass(status: string) {
  const classes: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    SHIPPING: 'bg-purple-100 text-purple-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

function getStatusDotClass(status: string) {
  const classes: Record<string, string> = {
    PENDING: 'bg-yellow-500',
    CONFIRMED: 'bg-blue-500',
    SHIPPING: 'bg-purple-500',
    COMPLETED: 'bg-green-500',
    CANCELLED: 'bg-red-500',
  }
  return classes[status] || 'bg-gray-500'
}

async function fetchStats() {
  loading.value = true
  try {
    const response = await clientAPI().get('/admin/stats', {
      headers: authStore.getAuthHeaders(),
    })
    stats.value = response.data.stats
    ordersByStatus.value = response.data.ordersByStatus || []
    recentOrders.value = response.data.recentOrders || []
  } catch (err: any) {
    console.error('Fetch stats error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
</script>
