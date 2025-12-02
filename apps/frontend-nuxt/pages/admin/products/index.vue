<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>
      <NuxtLink
        to="/admin/products/create"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Thêm sản phẩm
      </NuxtLink>
    </div>

    <!-- Search & Filter -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <input
            v-model="search"
            type="text"
            placeholder="Tìm theo tên hoặc SKU..."
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            @input="debouncedSearch"
          />
        </div>
        <select
          v-model="filterCategory"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          @change="fetchProducts"
        >
          <option value="">Tất cả danh mục</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
        <select
          v-model="filterStatus"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          @change="fetchProducts"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="true">Đang bán</option>
          <option value="false">Ngừng bán</option>
        </select>
      </div>
    </div>

    <!-- Products Table -->
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
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">Sản phẩm</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">SKU</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">Danh mục</th>
            <th class="text-right px-6 py-4 text-sm font-semibold text-gray-600">Giá</th>
            <th class="text-center px-6 py-4 text-sm font-semibold text-gray-600">Trạng thái</th>
            <th class="text-center px-6 py-4 text-sm font-semibold text-gray-600">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <img
                  :src="product.imageUrl || '/placeholder.png'"
                  :alt="product.name"
                  class="w-12 h-12 object-cover rounded-lg border"
                />
                <div>
                  <p class="font-medium text-gray-800 line-clamp-1">{{ product.name }}</p>
                  <p class="text-sm text-gray-500">{{ product.brand?.name }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ product.sku }}</td>
            <td class="px-6 py-4 text-gray-600">{{ product.category?.name }}</td>
            <td class="px-6 py-4 text-right">
              <p class="font-medium text-gray-800">{{ formatVNDWithComma(product.price) }}đ</p>
              <p v-if="product.compareAtPrice" class="text-sm text-gray-400 line-through">
                {{ formatVNDWithComma(product.compareAtPrice) }}đ
              </p>
            </td>
            <td class="px-6 py-4 text-center">
              <span 
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              >
                {{ product.isActive ? 'Đang bán' : 'Ngừng bán' }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-center gap-2">
                <NuxtLink
                  :to="`/admin/products/${product.id}`"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Chỉnh sửa"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </NuxtLink>
                <button
                  class="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                  :title="product.isActive ? 'Ẩn sản phẩm' : 'Hiện sản phẩm'"
                  @click="toggleStatus(product)"
                >
                  <svg v-if="product.isActive" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Xóa"
                  @click="deleteProduct(product)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-gray-500">
              Không có sản phẩm nào
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="px-6 py-4 border-t flex items-center justify-between">
        <p class="text-sm text-gray-600">
          Hiển thị {{ (pagination.page - 1) * pagination.limit + 1 }} - 
          {{ Math.min(pagination.page * pagination.limit, pagination.total) }} 
          trong {{ pagination.total }} sản phẩm
        </p>
        <div class="flex gap-2">
          <button
            :disabled="pagination.page <= 1"
            class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="goToPage(pagination.page - 1)"
          >
            Trước
          </button>
          <button
            v-for="p in visiblePages"
            :key="p"
            class="px-3 py-1 border rounded"
            :class="p === pagination.page ? 'bg-yellow-500 text-white border-yellow-500' : 'hover:bg-gray-100'"
            @click="goToPage(p)"
          >
            {{ p }}
          </button>
          <button
            :disabled="pagination.page >= pagination.totalPages"
            class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="goToPage(pagination.page + 1)"
          >
            Sau
          </button>
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
const config = useRuntimeConfig()

interface Product {
  id: number
  name: string
  sku: string
  price: number
  compareAtPrice: number | null
  imageUrl: string | null
  isActive: boolean
  category?: { id: number; name: string }
  brand?: { id: number; name: string }
}

interface Category {
  id: number
  name: string
}

const loading = ref(false)
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const search = ref('')
const filterCategory = ref('')
const filterStatus = ref('')
const pagination = ref({
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
})

let searchTimeout: ReturnType<typeof setTimeout> | null = null

const visiblePages = computed(() => {
  const pages: number[] = []
  const current = pagination.value.page
  const total = pagination.value.totalPages
  
  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    pages.push(i)
  }
  return pages
})

function debouncedSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    fetchProducts()
  }, 300)
}

async function fetchCategories() {
  try {
    const response = await $fetch<Category[]>(`${config.public.apiBase}/categories`)
    categories.value = response
  } catch (err) {
    console.error('Fetch categories error:', err)
  }
}

async function fetchProducts() {
  loading.value = true
  try {
    const params = new URLSearchParams()
    params.append('page', String(pagination.value.page))
    params.append('limit', String(pagination.value.limit))
    
    if (search.value) params.append('search', search.value)
    if (filterCategory.value) params.append('categoryId', filterCategory.value)
    if (filterStatus.value) params.append('isActive', filterStatus.value)

    const response = await clientAPI().get(`/products?${params.toString()}`)
    products.value = response.data.items || []
    
    if (response.data.pagination) {
      pagination.value = response.data.pagination
    }
  } catch (err) {
    console.error('Fetch products error:', err)
  } finally {
    loading.value = false
  }
}

async function toggleStatus(product: Product) {
  try {
    await clientAPI().put(
      `/products/${product.id}`,
      { isActive: !product.isActive },
      { headers: authStore.getAuthHeaders() }
    )
    product.isActive = !product.isActive
  } catch (err) {
    console.error('Toggle status error:', err)
    alert('Lỗi cập nhật trạng thái')
  }
}

async function deleteProduct(product: Product) {
  if (!confirm(`Bạn có chắc muốn xóa sản phẩm "${product.name}"?`)) return
  
  try {
    await clientAPI().delete(`/products/${product.id}`, {
      headers: authStore.getAuthHeaders(),
    })
    fetchProducts()
  } catch (err) {
    console.error('Delete product error:', err)
    alert('Lỗi xóa sản phẩm')
  }
}

function goToPage(page: number) {
  pagination.value.page = page
  fetchProducts()
}

onMounted(() => {
  fetchCategories()
  fetchProducts()
})
</script>
