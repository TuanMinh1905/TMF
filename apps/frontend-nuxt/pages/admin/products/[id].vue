<template>
  <div>
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink
        to="/admin/products"
        class="p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </NuxtLink>
      <h1 class="text-2xl font-bold text-gray-800">Chỉnh sửa sản phẩm</h1>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <svg class="animate-spin h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <div v-else class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="handleSubmit">
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tên sản phẩm <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Mã SKU <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.sku"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Alias (URL) <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.alias"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Giá bán <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.price"
                  type="number"
                  min="0"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Giá gốc (sale)
                </label>
                <input
                  v-model.number="form.compareAtPrice"
                  type="number"
                  min="0"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Danh mục <span class="text-red-500">*</span>
              </label>
              <select
                v-model.number="form.categoryId"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Chọn danh mục</option>
                <optgroup v-for="parent in parentCategories" :key="parent.id" :label="parent.name">
                  <option v-for="child in getChildren(parent.id)" :key="child.id" :value="child.id">
                    {{ child.name }}
                  </option>
                </optgroup>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Thương hiệu <span class="text-red-500">*</span>
              </label>
              <select
                v-model.number="form.brandId"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Chọn thương hiệu</option>
                <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                  {{ brand.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                URL Ảnh sản phẩm
              </label>
              <input
                v-model="form.imageUrl"
                type="url"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <div v-if="form.imageUrl" class="mt-2">
                <img 
                  :src="form.imageUrl" 
                  alt="Preview" 
                  class="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Mô tả sản phẩm
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Số lượng tồn kho
              </label>
              <input
                v-model.number="form.stock"
                type="number"
                min="0"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="form.isActive"
                    type="radio"
                    :value="true"
                    class="w-4 h-4 text-yellow-500 focus:ring-yellow-400"
                  />
                  <span class="text-gray-700">Đang bán</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="form.isActive"
                    type="radio"
                    :value="false"
                    class="w-4 h-4 text-yellow-500 focus:ring-yellow-400"
                  />
                  <span class="text-gray-700">Ngừng bán</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {{ error }}
        </div>

        <div class="mt-8 flex justify-end gap-4">
          <NuxtLink
            to="/admin/products"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            Hủy
          </NuxtLink>
          <button
            type="submit"
            :disabled="submitting"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
          >
            {{ submitting ? 'Đang lưu...' : 'Cập nhật' }}
          </button>
        </div>
      </form>
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

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const config = useRuntimeConfig()

const productId = computed(() => Number(route.params.id))

interface Category {
  id: number
  name: string
  parentId: number | null
}

interface Brand {
  id: number
  name: string
}

const loading = ref(true)
const categories = ref<Category[]>([])
const brands = ref<Brand[]>([])
const submitting = ref(false)
const error = ref('')

const form = reactive({
  name: '',
  sku: '',
  alias: '',
  price: 0,
  compareAtPrice: null as number | null,
  description: '',
  imageUrl: '',
  stock: 0,
  isActive: true,
  categoryId: 0,
  brandId: 0,
})

const parentCategories = computed(() => {
  return categories.value.filter(c => !c.parentId)
})

function getChildren(parentId: number) {
  return categories.value.filter(c => c.parentId === parentId)
}

async function fetchData() {
  loading.value = true
  try {
    const [cats, brs, productRes] = await Promise.all([
      $fetch<Category[]>(`${config.public.apiBase}/categories`),
      $fetch<Brand[]>(`${config.public.apiBase}/brands`),
      clientAPI().get(`/products/${productId.value}`),
    ])
    
    categories.value = cats
    brands.value = brs
    
    const product = productRes.data
    form.name = product.name
    form.sku = product.sku
    form.alias = product.alias
    form.price = product.price
    form.compareAtPrice = product.compareAtPrice
    form.description = product.description || ''
    form.imageUrl = product.imageUrl || ''
    form.stock = product.stock || 0
    form.isActive = product.isActive
    form.categoryId = product.categoryId
    form.brandId = product.brandId
  } catch (err) {
    console.error('Fetch data error:', err)
    error.value = 'Không tìm thấy sản phẩm'
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  error.value = ''
  submitting.value = true

  try {
    await clientAPI().put(`/products/${productId.value}`, {
      name: form.name,
      sku: form.sku,
      alias: form.alias,
      price: form.price,
      compareAtPrice: form.compareAtPrice || null,
      description: form.description || null,
      imageUrl: form.imageUrl || null,
      stock: form.stock || 0,
      isActive: form.isActive,
      categoryId: form.categoryId,
      brandId: form.brandId,
    }, {
      headers: authStore.getAuthHeaders(),
    })

    router.push('/admin/products')
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Lỗi cập nhật sản phẩm'
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>
