import { defineStore } from 'pinia'
import clientAPI from '../services/_AxiosConfig'

interface User {
  id: number
  email: string
  fullName: string | null
  role: 'ADMIN' | 'CUSTOMER'
}

interface AuthState {
  user: User | null
  accessToken: string | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    accessToken: null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user && !!state.accessToken,
    isAdmin: (state) => state.user?.role === 'ADMIN',
    isCustomer: (state) => state.user?.role === 'CUSTOMER',
  },

  actions: {
    // Khởi tạo từ localStorage khi app load
    init() {
      if (import.meta.client) {
        const token = localStorage.getItem('accessToken')
        if (token) {
          this.accessToken = token
          this.fetchMe()
        }
      }
    },

    // Login
    async login(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const response = await clientAPI().post('/auth/login', { email, password })
        const { accessToken, user } = response.data

        this.accessToken = accessToken
        this.user = user

        // Lưu vào localStorage
        if (import.meta.client) {
          localStorage.setItem('accessToken', accessToken)
        }

        return { success: true, user }
      } catch (err: any) {
        const message = err.response?.data?.error || 'Đăng nhập thất bại'
        this.error = message
        return { success: false, error: message }
      } finally {
        this.loading = false
      }
    },

    // Lấy thông tin user hiện tại từ token
    async fetchMe() {
      if (!this.accessToken) return null

      try {
        const response = await clientAPI().get('/auth/me', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        this.user = response.data.user
        return this.user
      } catch (err: any) {
        // Token hết hạn hoặc không hợp lệ
        this.logout()
        return null
      }
    },

    // Logout
    logout() {
      this.user = null
      this.accessToken = null
      this.error = null

      if (import.meta.client) {
        localStorage.removeItem('accessToken')
      }
    },

    // Helper: Lấy axios config với token
    getAuthHeaders() {
      return this.accessToken
        ? { Authorization: `Bearer ${this.accessToken}` }
        : {}
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
