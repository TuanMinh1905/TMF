<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>
    </div>

    <!-- Filter tabs -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="border-b">
        <div class="flex overflow-x-auto">
          <button
            v-for="tab in statusTabs"
            :key="tab.value"
            class="px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition"
            :class="activeStatus === tab.value 
              ? 'border-yellow-500 text-yellow-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'"
            @click="filterByStatus(tab.value)"
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
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <svg class="animate-spin h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <table v-else class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">Mã đơn</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">Khách hàng</th>
            <th class="text-right px-6 py-4 text-sm font-semibold text-gray-600">Tổng tiền</th>
            <th class="text-center px-6 py-4 text-sm font-semibold text-gray-600">Trạng thái</th>
            <th class="text-center px-6 py-4 text-sm font-semibold text-gray-600">Ngày đặt</th>
            <th class="text-center px-6 py-4 text-sm font-semibold text-gray-600">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <p class="font-medium text-gray-800">TMF{{ String(order.id).padStart(8, '0') }}</p>
              <p class="text-sm text-gray-500">{{ order.items?.length || 0 }} sản phẩm</p>
            </td>
            <td class="px-6 py-4">
              <p class="font-medium text-gray-800">{{ order.user?.fullName || 'Khách' }}</p>
              <p class="text-sm text-gray-500">{{ order.user?.email }}</p>
              <p v-if="order.phone" class="text-sm text-gray-500">{{ order.phone }}</p>
            </td>
            <td class="px-6 py-4 text-right">
              <p class="font-bold text-red-500">{{ formatVNDWithComma(order.totalAmount) }}đ</p>
            </td>
            <td class="px-6 py-4 text-center">
              <select
                :value="order.status"
                class="px-3 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                :class="getStatusSelectClass(order.status)"
                @change="updateStatus(order, ($event.target as HTMLSelectElement).value)"
              >
                <option value="PENDING">Chờ xác nhận</option>
                <option value="CONFIRMED">Đã xác nhận</option>
                <option value="SHIPPING">Đang giao</option>
                <option value="COMPLETED">Hoàn thành</option>
                <option value="CANCELLED">Đã hủy</option>
              </select>
            </td>
            <td class="px-6 py-4 text-center text-gray-600">
              {{ formatDate(order.createdAt) }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-center">
                <button
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Xem chi tiết"
                  @click="viewOrder(order)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="orders.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-gray-500">
              Không có đơn hàng nào
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="px-6 py-4 border-t flex items-center justify-between">
        <p class="text-sm text-gray-600">
          Hiển thị {{ (pagination.page - 1) * pagination.limit + 1 }} - 
          {{ Math.min(pagination.page * pagination.limit, pagination.total) }} 
          trong {{ pagination.total }} đơn hàng
        </p>
        <div class="flex gap-2">
          <button
            :disabled="pagination.page <= 1"
            class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            @click="goToPage(pagination.page - 1)"
          >
            Trước
          </button>
          <button
            :disabled="pagination.page >= pagination.totalPages"
            class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            @click="goToPage(pagination.page + 1)"
          >
            Sau
          </button>
        </div>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div
      v-if="selectedOrder"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="selectedOrder = null"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b sticky top-0 bg-white">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-800">
              Chi tiết đơn hàng #TMF{{ String(selectedOrder.id).padStart(8, '0') }}
            </h2>
            <button
              class="p-2 hover:bg-gray-100 rounded-lg transition"
              @click="selectedOrder = null"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="p-6">
          <!-- Customer Info -->
          <div class="mb-6">
            <h3 class="font-semibold text-gray-800 mb-3">Thông tin khách hàng</h3>
            <div class="bg-gray-50 rounded-lg p-4 space-y-2">
              <p><span class="text-gray-500">Họ tên:</span> {{ selectedOrder.user?.fullName || 'N/A' }}</p>
              <p><span class="text-gray-500">Email:</span> {{ selectedOrder.user?.email }}</p>
              <p><span class="text-gray-500">SĐT:</span> {{ selectedOrder.phone || 'N/A' }}</p>
              <p><span class="text-gray-500">Địa chỉ:</span> {{ selectedOrder.shippingAddress || 'N/A' }}</p>
              <p v-if="selectedOrder.note"><span class="text-gray-500">Ghi chú:</span> {{ selectedOrder.note }}</p>
            </div>
          </div>

          <!-- Order Items -->
          <div class="mb-6">
            <h3 class="font-semibold text-gray-800 mb-3">Sản phẩm</h3>
            <div class="space-y-3">
              <div
                v-for="item in selectedOrder.items"
                :key="item.id"
                class="flex items-center gap-4 p-3 border rounded-lg"
              >
                <img
                  :src="item.product?.imageUrl || '/placeholder.png'"
                  :alt="item.product?.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <p class="font-medium text-gray-800">{{ item.product?.name }}</p>
                  <p class="text-sm text-gray-500">
                    {{ formatVNDWithComma(item.price) }}đ x {{ item.quantity }}
                  </p>
                </div>
                <p class="font-bold text-gray-800">
                  {{ formatVNDWithComma(item.price * item.quantity) }}đ
                </p>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="border-t pt-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Tổng tiền:</span>
              <span class="text-xl font-bold text-red-500">
                {{ formatVNDWithComma(selectedOrder.totalAmount) }}đ
              </span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-gray-600">Trạng thái:</span>
              <span 
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="getStatusClass(selectedOrder.status)"
              >
                {{ getStatusLabel(selectedOrder.status) }}
              </span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-gray-600">Ngày đặt:</span>
              <span class="text-gray-800">{{ formatDate(selectedOrder.createdAt) }}</span>
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

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const authStore = useAuthStore()
const route = useRoute()

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
  user: {
    id: number
    email: string
    fullName: string | null
  } | null
  items: OrderItem[]
}

const loading = ref(true)
const orders = ref<Order[]>([])
const allOrders = ref<Order[]>([])
const selectedOrder = ref<Order | null>(null)
const activeStatus = ref('ALL')

const pagination = ref({
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
})

const statusTabs = [
  { label: 'Tất cả', value: 'ALL' },
  { label: 'Chờ xác nhận', value: 'PENDING' },
  { label: 'Đã xác nhận', value: 'CONFIRMED' },
  { label: 'Đang giao', value: 'SHIPPING' },
  { label: 'Hoàn thành', value: 'COMPLETED' },
  { label: 'Đã hủy', value: 'CANCELLED' },
]

function getOrderCountByStatus(status: string) {
  if (status === 'ALL') return allOrders.value.length
  return allOrders.value.filter(o => o.status === status).length
}

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

function getStatusSelectClass(status: string) {
  const classes: Record<string, string> = {
    PENDING: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    CONFIRMED: 'bg-blue-50 text-blue-800 border-blue-200',
    SHIPPING: 'bg-purple-50 text-purple-800 border-purple-200',
    COMPLETED: 'bg-green-50 text-green-800 border-green-200',
    CANCELLED: 'bg-red-50 text-red-800 border-red-200',
  }
  return classes[status] || ''
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
  loading.value = true
  try {
    const params = new URLSearchParams()
    params.append('page', String(pagination.value.page))
    params.append('limit', String(pagination.value.limit))
    if (activeStatus.value !== 'ALL') {
      params.append('status', activeStatus.value)
    }

    const response = await clientAPI().get(`/admin/orders?${params.toString()}`, {
      headers: authStore.getAuthHeaders(),
    })
    
    orders.value = response.data.orders || []
    
    if (response.data.pagination) {
      pagination.value = response.data.pagination
    }

    // Fetch all for counts (first time only)
    if (allOrders.value.length === 0) {
      const allRes = await clientAPI().get('/admin/orders?limit=1000', {
        headers: authStore.getAuthHeaders(),
      })
      allOrders.value = allRes.data.orders || []
    }
  } catch (err) {
    console.error('Fetch orders error:', err)
  } finally {
    loading.value = false
  }
}

function filterByStatus(status: string) {
  activeStatus.value = status
  pagination.value.page = 1
  fetchOrders()
}

async function updateStatus(order: Order, newStatus: string) {
  try {
    await clientAPI().put(`/admin/orders/${order.id}`, {
      status: newStatus,
    }, {
      headers: authStore.getAuthHeaders(),
    })
    
    order.status = newStatus
    
    // Update in allOrders too
    const idx = allOrders.value.findIndex(o => o.id === order.id)
    if (idx !== -1) {
      allOrders.value[idx].status = newStatus
    }
  } catch (err: any) {
    alert(err.response?.data?.error || 'Lỗi cập nhật trạng thái')
  }
}

function viewOrder(order: Order) {
  selectedOrder.value = order
}

function goToPage(page: number) {
  pagination.value.page = page
  fetchOrders()
}

onMounted(() => {
  // Check URL param for status filter
  const statusParam = route.query.status as string
  if (statusParam) {
    activeStatus.value = statusParam
  }
  fetchOrders()
})
</script>
