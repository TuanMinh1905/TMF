<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <!-- Logo -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">TMF</h1>
        <p class="text-gray-500 mt-2">Đăng nhập vào tài khoản</p>
      </div>

      <!-- Error Alert -->
      <div
        v-if="error"
        class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
      >
        {{ error }}
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2" for="email">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="your@email.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-medium mb-2" for="password">
            Mật khẩu
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Đang đăng nhập...</span>
          <span v-else>Đăng nhập</span>
        </button>
      </form>

      <!-- Back to Home -->
      <div class="mt-6 text-center">
        <NuxtLink
          to="/"
          class="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Quay lại trang chủ
        </NuxtLink>
      </div>

      <!-- Demo Credentials (dev only) -->
      <div class="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p class="font-medium mb-2">Tài khoản demo:</p>
        <p>Email: <code class="bg-gray-200 px-1 rounded">admin@tmfashion.com</code></p>
        <p>Password: <code class="bg-gray-200 px-1 rounded">123456</code></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = computed(() => authStore.loading)

// Nếu đã login rồi, redirect
onMounted(() => {
  if (authStore.isLoggedIn) {
    if (authStore.isAdmin) {
      router.push('/admin')
    } else {
      router.push('/')
    }
  }
})

async function handleLogin() {
  error.value = ''

  const result = await authStore.login(email.value, password.value)

  if (result.success) {
    // Redirect dựa vào role
    if (authStore.isAdmin) {
      router.push('/admin')
    } else {
      router.push('/')
    }
  } else {
    error.value = result.error || 'Đăng nhập thất bại'
  }
}
</script>
