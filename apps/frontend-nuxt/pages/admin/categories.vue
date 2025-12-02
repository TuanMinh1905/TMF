<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Quản lý danh mục</h1>
      <button
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
        @click="openCreateModal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Thêm danh mục
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <svg class="animate-spin h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Categories Tree -->
    <div v-else class="bg-white rounded-lg shadow">
      <div class="p-6">
        <!-- Parent Categories -->
        <div
          v-for="parent in parentCategories"
          :key="parent.id"
          class="mb-6 last:mb-0"
        >
          <!-- Parent Row -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <button
                class="p-1 hover:bg-gray-200 rounded transition"
                @click="toggleExpand(parent.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-600 transition-transform"
                  :class="{ 'rotate-90': expandedCategories.includes(parent.id) }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div>
                <p class="font-semibold text-gray-800">{{ parent.name }}</p>
                <p class="text-sm text-gray-500">
                  {{ getChildren(parent.id).length }} danh mục con
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span 
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="parent.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              >
                {{ parent.isActive ? 'Hoạt động' : 'Ẩn' }}
              </span>
              <button
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                title="Chỉnh sửa"
                @click="openEditModal(parent)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                title="Thêm danh mục con"
                @click="openCreateModal(parent.id)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Children -->
          <div
            v-if="expandedCategories.includes(parent.id)"
            class="mt-2 ml-8 space-y-2"
          >
            <div
              v-for="child in getChildren(parent.id)"
              :key="child.id"
              class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <div class="flex items-center gap-3">
                <span class="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">
                  {{ child.sortOrder || '-' }}
                </span>
                <p class="text-gray-800">{{ child.name }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="child.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ child.isActive ? 'Hoạt động' : 'Ẩn' }}
                </span>
                <button
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  @click="openEditModal(child)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  @click="deleteCategory(child)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div v-if="getChildren(parent.id).length === 0" class="text-center text-gray-500 py-4">
              Chưa có danh mục con
            </div>
          </div>
        </div>

        <div v-if="parentCategories.length === 0" class="text-center text-gray-500 py-8">
          Chưa có danh mục nào
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">
          {{ editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới' }}
        </h2>

        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Tên danh mục <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Slug (URL)
              </label>
              <input
                v-model="form.slug"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="ao-thun"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Danh mục cha
              </label>
              <select
                v-model="form.parentId"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option :value="null">Không có (Cấp 1)</option>
                <option v-for="parent in parentCategories" :key="parent.id" :value="parent.id">
                  {{ parent.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Thứ tự hiển thị
              </label>
              <input
                v-model.number="form.sortOrder"
                type="number"
                min="0"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="form.isActive"
                  type="checkbox"
                  class="w-4 h-4 text-yellow-500 focus:ring-yellow-400 rounded"
                />
                <span class="text-gray-700">Hiển thị danh mục</span>
              </label>
            </div>
          </div>

          <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {{ error }}
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button
              type="button"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              @click="closeModal"
            >
              Hủy
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
            >
              {{ submitting ? 'Đang lưu...' : (editingCategory ? 'Cập nhật' : 'Thêm mới') }}
            </button>
          </div>
        </form>
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

interface Category {
  id: number
  name: string
  slug: string | null
  parentId: number | null
  sortOrder: number | null
  isActive: boolean
}

const loading = ref(true)
const categories = ref<Category[]>([])
const expandedCategories = ref<number[]>([])
const showModal = ref(false)
const editingCategory = ref<Category | null>(null)
const submitting = ref(false)
const error = ref('')

const form = reactive({
  name: '',
  slug: '',
  parentId: null as number | null,
  sortOrder: 0,
  isActive: true,
})

const parentCategories = computed(() => {
  return categories.value.filter(c => !c.parentId)
})

function getChildren(parentId: number) {
  return categories.value.filter(c => c.parentId === parentId).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
}

function toggleExpand(id: number) {
  const index = expandedCategories.value.indexOf(id)
  if (index === -1) {
    expandedCategories.value.push(id)
  } else {
    expandedCategories.value.splice(index, 1)
  }
}

function openCreateModal(parentId?: number) {
  editingCategory.value = null
  form.name = ''
  form.slug = ''
  form.parentId = parentId || null
  form.sortOrder = 0
  form.isActive = true
  error.value = ''
  showModal.value = true
}

function openEditModal(category: Category) {
  editingCategory.value = category
  form.name = category.name
  form.slug = category.slug || ''
  form.parentId = category.parentId
  form.sortOrder = category.sortOrder || 0
  form.isActive = category.isActive
  error.value = ''
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingCategory.value = null
}

async function fetchCategories() {
  loading.value = true
  try {
    const response = await $fetch<Category[]>(`${config.public.apiBase}/categories`)
    categories.value = response
    // Expand all parent categories by default
    expandedCategories.value = parentCategories.value.map(c => c.id)
  } catch (err) {
    console.error('Fetch categories error:', err)
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  error.value = ''
  submitting.value = true

  try {
    if (editingCategory.value) {
      // Update
      await clientAPI().put(`/categories/${editingCategory.value.id}`, {
        name: form.name,
        slug: form.slug || null,
        parentId: form.parentId,
        sortOrder: form.sortOrder,
        isActive: form.isActive,
      }, {
        headers: authStore.getAuthHeaders(),
      })
    } else {
      // Create
      await clientAPI().post('/categories', {
        name: form.name,
        slug: form.slug || null,
        parentId: form.parentId,
        sortOrder: form.sortOrder,
        isActive: form.isActive,
      }, {
        headers: authStore.getAuthHeaders(),
      })
    }

    closeModal()
    fetchCategories()
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Lỗi lưu danh mục'
  } finally {
    submitting.value = false
  }
}

async function deleteCategory(category: Category) {
  if (!confirm(`Bạn có chắc muốn xóa danh mục "${category.name}"?`)) return

  try {
    await clientAPI().delete(`/categories/${category.id}`, {
      headers: authStore.getAuthHeaders(),
    })
    fetchCategories()
  } catch (err: any) {
    alert(err.response?.data?.error || 'Lỗi xóa danh mục')
  }
}

// Auto generate slug from name
watch(() => form.name, (name) => {
  if (!editingCategory.value && !form.slug) {
    form.slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
})

onMounted(() => {
  fetchCategories()
})
</script>
