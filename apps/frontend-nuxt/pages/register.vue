<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-4xl font-bold text-gray-800">TMF</NuxtLink>
        <h2 class="mt-4 text-2xl font-bold text-gray-800">Đăng ký tài khoản</h2>
        <p class="mt-2 text-gray-600">Tạo tài khoản để mua sắm dễ dàng hơn</p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <form @submit.prevent="handleRegister">
          <!-- Họ tên -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.fullName"
              type="text"
              placeholder="Nguyễn Văn A"
              class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="email@example.com"
              class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
          </div>

          <!-- Số điện thoại -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <input
              v-model="form.phone"
              type="tel"
              placeholder="0912345678"
              class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          <!-- Mật khẩu -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Ít nhất 6 ký tự"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent pr-12"
                required
                minlength="6"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                @click="showPassword = !showPassword"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Xác nhận mật khẩu -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Xác nhận mật khẩu <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Nhập lại mật khẩu"
              class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
            <p v-if="passwordMismatch" class="text-red-500 text-sm mt-1">
              Mật khẩu xác nhận không khớp
            </p>
          </div>

          <!-- Error message -->
          <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-600 text-sm">{{ error }}</p>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            :disabled="loading || passwordMismatch"
            class="w-full py-3 bg-primary hover:bg-yellow-500 text-gray-800 font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang xử lý...
            </span>
            <span v-else>Đăng ký</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-gray-300"></div>
          <span class="px-4 text-sm text-gray-500">hoặc</span>
          <div class="flex-1 border-t border-gray-300"></div>
        </div>

        <!-- Link to login -->
        <p class="text-center text-gray-600">
          Đã có tài khoản?
          <NuxtLink to="/login" class="text-blue-600 hover:underline font-medium">
            Đăng nhập ngay
          </NuxtLink>
        </p>
      </div>

      <!-- Back to home -->
      <div class="text-center mt-6">
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-700 text-sm">
          ← Quay về trang chủ
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const passwordMismatch = computed(() => {
  return form.confirmPassword.length > 0 && form.password !== form.confirmPassword
})

// Redirect nếu đã login
onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push('/account')
  }
})

async function handleRegister() {
  if (form.password !== form.confirmPassword) {
    error.value = 'Mật khẩu xác nhận không khớp'
    return
  }

  loading.value = true
  error.value = ''

  const result = await authStore.register(
    form.email,
    form.password,
    form.fullName,
    form.phone
  )

  loading.value = false

  if (result.success) {
    // Redirect to account page
    router.push('/account')
  } else {
    error.value = result.error || 'Đăng ký thất bại'
  }
}
</script>
