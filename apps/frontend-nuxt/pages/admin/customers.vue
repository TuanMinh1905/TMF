<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Quản lý khách hàng</h1>
    </div>

    <!-- Search & Filter -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm theo tên, email, SĐT..."
              class="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              @input="debouncedSearch"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div class="flex gap-2">
          <select
            v-model="sortBy"
            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            @change="fetchCustomers"
          >
            <option value="createdAt">Mới nhất</option>
            <option value="orderCount">Đơn hàng nhiều nhất</option>
            <option value="totalSpent">Chi tiêu nhiều nhất</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Customers Table -->
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
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">Khách hàng</th>
            <th class="text-center px-6 py-4 text-sm font-semibold text-gray-600">Vai trò</th>
            <th class="text-center px-6 py-4 text-sm font-semibold text-gray-600">Đơn hàng</th>
            <th class="text-right px-6 py-4 text-sm font-semibold text-gray-600">Chi tiêu</th>
            <th class="text-center px-6 py-4 text-sm font-semibold text-gray-600">Ngày tham gia</th>
            <th class="text-center px-6 py-4 text-sm font-semibold text-gray-600">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="customer in customers" :key="customer.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span class="text-yellow-600 font-semibold">
                    {{ getInitials(customer.fullName || customer.email) }}
                  </span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ customer.fullName || 'Chưa cập nhật' }}</p>
                  <p class="text-sm text-gray-500">{{ customer.email }}</p>
                  <p v-if="customer.phone" class="text-sm text-gray-500">{{ customer.phone }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-center">
              <span
                class="px-2 py-1 text-xs rounded-full font-medium"
                :class="customer.role === 'ADMIN' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-700'"
              >
                {{ customer.role === 'ADMIN' ? 'Admin' : 'Khách hàng' }}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
              <span class="font-semibold text-blue-600">{{ customer.orderCount || 0 }}</span>
            </td>
            <td class="px-6 py-4 text-right">
              <span class="font-bold text-green-600">
                {{ formatVNDWithComma(customer.totalSpent || 0) }}đ
              </span>
            </td>
            <td class="px-6 py-4 text-center text-gray-600">
              {{ formatDate(customer.createdAt) }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-center gap-2">
                <button
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Xem chi tiết"
                  @click="viewCustomer(customer)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <NuxtLink
                  :to="`/admin/orders?userId=${customer.id}`"
                  class="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                  title="Xem đơn hàng"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </NuxtLink>
              </div>
            </td>
          </tr>
          <tr v-if="customers.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-gray-500">
              Không tìm thấy khách hàng
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="px-6 py-4 border-t flex items-center justify-between">
        <p class="text-sm text-gray-600">
          Hiển thị {{ (pagination.page - 1) * pagination.limit + 1 }} - 
          {{ Math.min(pagination.page * pagination.limit, pagination.total) }} 
          trong {{ pagination.total }} khách hàng
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

    <!-- Customer Detail Modal -->
    <div
      v-if="selectedCustomer"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="selectedCustomer = null"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b sticky top-0 bg-white">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-800">Chi tiết khách hàng</h2>
            <button
              class="p-2 hover:bg-gray-100 rounded-lg transition"
              @click="selectedCustomer = null"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div v-if="loadingDetail" class="flex items-center justify-center py-12">
          <svg class="animate-spin h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>

        <div v-else class="p-6">
          <!-- Customer Info -->
          <div class="flex items-start gap-6 mb-6">
            <div class="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-2xl text-yellow-600 font-bold">
                {{ getInitials(customerDetail?.fullName || customerDetail?.email || '') }}
              </span>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-800">
                {{ customerDetail?.fullName || 'Chưa cập nhật' }}
              </h3>
              <p class="text-gray-500">{{ customerDetail?.email }}</p>
              <p v-if="customerDetail?.phone" class="text-gray-500">{{ customerDetail?.phone }}</p>
              <p v-if="customerDetail?.address" class="text-gray-500 mt-1">
                {{ customerDetail?.address }}
              </p>
              <div class="flex gap-4 mt-3">
                <span
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="customerDetail?.role === 'ADMIN' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-700'"
                >
                  {{ customerDetail?.role === 'ADMIN' ? 'Admin' : 'Khách hàng' }}
                </span>
                <span class="text-gray-500 text-sm">
                  Tham gia: {{ formatDate(customerDetail?.createdAt) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="bg-blue-50 rounded-lg p-4 text-center">
              <p class="text-2xl font-bold text-blue-600">{{ customerDetail?.orderCount || 0 }}</p>
              <p class="text-sm text-blue-600">Đơn hàng</p>
            </div>
            <div class="bg-green-50 rounded-lg p-4 text-center">
              <p class="text-xl font-bold text-green-600">
                {{ formatVNDWithComma(customerDetail?.totalSpent || 0) }}đ
              </p>
              <p class="text-sm text-green-600">Tổng chi tiêu</p>
            </div>
            <div class="bg-yellow-50 rounded-lg p-4 text-center">
              <p class="text-2xl font-bold text-yellow-600">
                {{ customerDetail?.completedOrders || 0 }}
              </p>
              <p class="text-sm text-yellow-600">Đơn hoàn thành</p>
            </div>
          </div>

          <!-- Order History -->
          <div>
            <h3 class="font-semibold text-gray-800 mb-3">Lịch sử đơn hàng</h3>
            <div v-if="customerDetail?.orders?.length" class="space-y-3">
              <div
                v-for="order in customerDetail.orders"
                :key="order.id"
                class="border rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div class="flex items-center justify-between mb-2">
                  <div>
                    <p class="font-medium text-gray-800">
                      #TMF{{ String(order.id).padStart(8, '0') }}
                    </p>
                    <p class="text-sm text-gray-500">{{ formatDate(order.createdAt) }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-red-500">
                      {{ formatVNDWithComma(order.totalAmount) }}đ
                    </p>
                    <span
                      class="px-2 py-1 text-xs rounded-full font-medium"
                      :class="getStatusClass(order.status)"
                    >
                      {{ getStatusLabel(order.status) }}
                    </span>
                  </div>
                </div>
                <div class="text-sm text-gray-500">
                  {{ order.items?.length || 0 }} sản phẩm
                </div>
              </div>
            </div>
            <div v-else class="text-center py-6 text-gray-500">
              Khách hàng chưa có đơn hàng nào
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

interface Customer {
  id: number
  email: string
  fullName: string | null
  phone: string | null
  address: string | null
  role: string
  createdAt: string
  orderCount?: number
  totalSpent?: number
  completedOrders?: number
  orders?: any[]
}

const loading = ref(true)
const loadingDetail = ref(false)
const customers = ref<Customer[]>([])
const selectedCustomer = ref<Customer | null>(null)
const customerDetail = ref<Customer | null>(null)
const searchQuery = ref('')
const sortBy = ref('createdAt')

const pagination = ref({
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
})

let searchTimeout: ReturnType<typeof setTimeout>

function debouncedSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    fetchCustomers()
  }, 300)
}

function getInitials(name: string) {
  if (!name) return '?'
  const parts = name.split(' ').filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
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

function formatDate(dateString: string) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

async function fetchCustomers() {
  loading.value = true
  try {
    const params = new URLSearchParams()
    params.append('page', String(pagination.value.page))
    params.append('limit', String(pagination.value.limit))
    if (searchQuery.value) {
      params.append('search', searchQuery.value)
    }
    params.append('sortBy', sortBy.value)

    const response = await clientAPI().get(`/admin/customers?${params.toString()}`, {
      headers: authStore.getAuthHeaders(),
    })
    
    customers.value = response.data.customers || []
    
    if (response.data.pagination) {
      pagination.value = response.data.pagination
    }
  } catch (err) {
    console.error('Fetch customers error:', err)
  } finally {
    loading.value = false
  }
}

async function viewCustomer(customer: Customer) {
  selectedCustomer.value = customer
  loadingDetail.value = true
  
  try {
    const response = await clientAPI().get(`/admin/customers/${customer.id}`, {
      headers: authStore.getAuthHeaders(),
    })
    customerDetail.value = response.data.customer || null
  } catch (err) {
    console.error('Fetch customer detail error:', err)
    customerDetail.value = null
  } finally {
    loadingDetail.value = false
  }
}

function goToPage(page: number) {
  pagination.value.page = page
  fetchCustomers()
}

onMounted(() => {
  fetchCustomers()
})
</script>
