<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-800">TMF</NuxtLink>
          <span class="text-gray-300">|</span>
          <h1 class="text-xl text-gray-600">Tài khoản của tôi</h1>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Chưa đăng nhập -->
      <div v-if="!authStore.isLoggedIn" class="bg-white rounded-lg shadow p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <p class="text-gray-500 mb-4">Vui lòng đăng nhập để xem thông tin tài khoản</p>
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
                :class="{ 'bg-yellow-50 text-yellow-700': activeTab === 'profile' }"
                @click="activeTab = 'profile'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Thông tin cá nhân
              </NuxtLink>

              <NuxtLink
                to="/account/orders"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                :class="{ 'bg-yellow-50 text-yellow-700': activeTab === 'orders' }"
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
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h2>

            <!-- Profile info display -->
            <div class="space-y-6">
              <!-- Avatar & Status -->
              <div class="flex items-center gap-4 pb-6 border-b">
                <div class="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <span class="text-3xl font-bold text-gray-800">
                    {{ userInitial }}
                  </span>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-800">{{ authStore.user?.fullName || 'Chưa cập nhật' }}</h3>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                    Đã đăng nhập
                  </span>
                </div>
              </div>

              <!-- Info grid -->
              <div class="grid md:grid-cols-2 gap-6">
                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p class="text-gray-800">{{ authStore.user?.email }}</p>
                  </div>
                </div>

                <!-- Họ tên -->
                <div>
                  <label class="block text-sm font-medium text-gray-500 mb-1">Họ và tên</label>
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p class="text-gray-800">{{ authStore.user?.fullName || 'Chưa cập nhật' }}</p>
                  </div>
                </div>

                <!-- Vai trò -->
                <div>
                  <label class="block text-sm font-medium text-gray-500 mb-1">Loại tài khoản</label>
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="authStore.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'"
                    >
                      {{ authStore.isAdmin ? 'Quản trị viên' : 'Khách hàng' }}
                    </span>
                  </div>
                </div>

                <!-- Ngày tham gia (placeholder) -->
                <div>
                  <label class="block text-sm font-medium text-gray-500 mb-1">Trạng thái</label>
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-green-600 font-medium">Hoạt động</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="mt-8 pt-6 border-t">
              <h3 class="font-medium text-gray-800 mb-4">Thao tác nhanh</h3>
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink
                  to="/account/orders"
                  class="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">Đơn hàng</p>
                    <p class="text-sm text-gray-500">Xem lịch sử mua hàng</p>
                  </div>
                </NuxtLink>

                <NuxtLink
                  to="/cart"
                  class="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">Giỏ hàng</p>
                    <p class="text-sm text-gray-500">Xem sản phẩm đã chọn</p>
                  </div>
                </NuxtLink>

                <NuxtLink
                  to="/category/ao"
                  class="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">Mua sắm</p>
                    <p class="text-sm text-gray-500">Tiếp tục shopping</p>
                  </div>
                </NuxtLink>
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

const authStore = useAuthStore()
const router = useRouter()

const activeTab = ref('profile')

const userInitial = computed(() => {
  const name = authStore.user?.fullName || authStore.user?.email || 'U'
  return name.charAt(0).toUpperCase()
})

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>
