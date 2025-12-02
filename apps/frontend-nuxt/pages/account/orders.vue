<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-800">TMF</NuxtLink>
          <span class="text-gray-300">|</span>
          <h1 class="text-xl text-gray-600">Lịch sử đơn hàng</h1>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Chưa đăng nhập -->
      <div v-if="!authStore.isLoggedIn" class="bg-white rounded-lg shadow p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <p class="text-gray-500 mb-4">Vui lòng đăng nhập để xem lịch sử đơn hàng</p>
        <NuxtLink
          to="/login"
          class="inline-block px-6 py-3 bg-primary hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition"
        >
          Đăng nhập
        </NuxtLink>
      </div>

      <!-- Đã đăng nhập -->
      <div v-else class="grid lg:grid-cols-4 gap-6">
        <!-- Sidebar Menu -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-4">
            <!-- User info -->
            <div class="flex items-center gap-3 pb-4 border-b mb-4">
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span class="text-xl font-bold text-gray-800">
                  {{ userInitial }}
                </span>
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ authStore.user?.fullName || 'Khách hàng' }}</p>
                <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
              </div>
            </div>

            <!-- Menu -->
            <nav class="space-y-1">
              <NuxtLink
                to="/account"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Thông tin cá nhân
              </NuxtLink>

              <NuxtLink
                to="/account/orders"
                class="flex items-center gap-3 px-3 py-2 rounded-lg bg-yellow-50 text-yellow-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Lịch sử đơn hàng
              </NuxtLink>

              <button
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition w-full"
                @click="handleLogout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Đăng xuất
              </button>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow">
            <!-- Header -->
            <div class="p-6 border-b">
              <h2 class="text-xl font-bold text-gray-800">Lịch sử đơn hàng</h2>
              <p class="text-gray-500 mt-1">Theo dõi trạng thái các đơn hàng của bạn</p>
            </div>

            <!-- Filter tabs -->
            <div class="border-b">
              <div class="flex overflow-x-auto">
                <button
                  v-for="tab in statusTabs"
                  :key="tab.value"
                  class="px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition"
                  :class="activeStatus === tab.value 
                    ? 'border-yellow-500 text-yellow-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'"
                  @click="activeStatus = tab.value"
                >
                  {{ tab.label }}
                  <span 
                    v-if="getOrderCountByStatus(tab.value) > 0"
                    class="ml-1.5 px-2 py-0.5 text-xs rounded-full"
                    :class="activeStatus === tab.value ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'"
                  >
                    {{ getOrderCountByStatus(tab.value) }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Loading -->
            <div v-if="loading" class="p-8 text-center">
              <svg class="animate-spin h-8 w-8 mx-auto text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-500 mt-2">Đang tải...</p>
            </div>

            <!-- Empty state -->
            <div v-else-if="filteredOrders.length === 0" class="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p class="text-gray-500 mb-4">
                {{ activeStatus === 'ALL' ? 'Bạn chưa có đơn hàng nào' : 'Không có đơn hàng nào' }}
              </p>
              <NuxtLink
                to="/category/ao"
                class="inline-block px-6 py-3 bg-primary hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition"
              >
                Mua sắm ngay
              </NuxtLink>
            </div>

            <!-- Orders list -->
            <div v-else class="divide-y">
              <div
                v-for="order in filteredOrders"
                :key="order.id"
                class="p-6"
              >
                <!-- Order header -->
                <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <p class="text-sm text-gray-500">
                      Mã đơn hàng: 
                      <span class="font-medium text-gray-800">TMF{{ String(order.id).padStart(8, '0') }}</span>
                    </p>
                    <p class="text-sm text-gray-500">
                      Ngày đặt: {{ formatDate(order.createdAt) }}
                    </p>
                  </div>
                  <span 
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                    :class="getStatusClass(order.status)"
                  >
                    <span class="w-2 h-2 rounded-full mr-2" :class="getStatusDotClass(order.status)"></span>
                    {{ getStatusLabel(order.status) }}
                  </span>
                </div>

                <!-- Order items -->
                <div class="space-y-3 mb-4">
                  <div
                    v-for="item in order.items"
                    :key="item.id"
                    class="flex gap-4"
                  >
                    <img
                      :src="item.product?.imageUrl || '/placeholder.png'"
                      :alt="item.product?.name"
                      class="w-16 h-16 object-cover rounded-lg border"
                    />
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-gray-800 truncate">{{ item.product?.name }}</p>
                      <p class="text-sm text-gray-500">
                        {{ formatVNDWithComma(item.price) }}đ x {{ item.quantity }}
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="font-medium text-gray-800">
                        {{ formatVNDWithComma(item.price * item.quantity) }}đ
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Order footer -->
                <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t">
                  <div class="text-sm text-gray-500">
                    {{ order.items.length }} sản phẩm
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500">Tổng tiền:</p>
                    <p class="text-lg font-bold text-red-500">
                      {{ formatVNDWithComma(order.totalAmount) }}đ
                    </p>
                  </div>
                </div>

                <!-- Shipping info -->
                <div v-if="order.shippingAddress" class="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
                  <p class="text-gray-600">
                    <span class="font-medium">Địa chỉ:</span> {{ order.shippingAddress }}
                  </p>
                  <p v-if="order.phone" class="text-gray-600 mt-1">
                    <span class="font-medium">SĐT:</span> {{ order.phone }}
                  </p>
                  <p v-if="order.note" class="text-gray-600 mt-1">
                    <span class="font-medium">Ghi chú:</span> {{ order.note }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import clientAPI from '~/services/_AxiosConfig'

interface OrderItem {
  id: number
  quantity: number
  price: number
  product: {
    id: number
    name: string
    imageUrl: string | null
  } | null
}

interface Order {
  id: number
  status: string
  totalAmount: number
  shippingAddress: string | null
  phone: string | null
  note: string | null
  createdAt: string
  items: OrderItem[]
}

const authStore = useAuthStore()
const router = useRouter()

const orders = ref<Order[]>([])
const loading = ref(false)
const activeStatus = ref('ALL')

const statusTabs = [
  { label: 'Tất cả', value: 'ALL' },
  { label: 'Chờ xác nhận', value: 'PENDING' },
  { label: 'Đã xác nhận', value: 'CONFIRMED' },
  { label: 'Đang giao', value: 'SHIPPING' },
  { label: 'Đã giao', value: 'COMPLETED' },
  { label: 'Đã hủy', value: 'CANCELLED' },
]

const userInitial = computed(() => {
  const name = authStore.user?.fullName || authStore.user?.email || 'U'
  return name.charAt(0).toUpperCase()
})

const filteredOrders = computed(() => {
  if (activeStatus.value === 'ALL') {
    return orders.value
  }
  return orders.value.filter(order => order.status === activeStatus.value)
})

function getOrderCountByStatus(status: string) {
  if (status === 'ALL') {
    return orders.value.length
  }
  return orders.value.filter(order => order.status === status).length
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING: 'Chờ xác nhận',
    CONFIRMED: 'Đã xác nhận',
    SHIPPING: 'Đang giao hàng',
    COMPLETED: 'Đã giao',
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

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function fetchOrders() {
  if (!authStore.isLoggedIn) return

  loading.value = true
  try {
    const response = await clientAPI().get('/orders', {
      headers: authStore.getAuthHeaders(),
    })
    orders.value = response.data.orders || []
  } catch (err: any) {
    console.error('Fetch orders error:', err)
  } finally {
    loading.value = false
  }
}

function handleLogout() {
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  fetchOrders()
})
</script>
