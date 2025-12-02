import { defineStore } from 'pinia'
import clientAPI from '../services/_AxiosConfig'
import { useAuthStore } from './auth'

interface CartProduct {
  id: number
  name: string
  price: number
  compareAtPrice: number | null
  imageUrl: string | null
  stock: number | null
}

interface CartItem {
  id: number
  productId: number
  quantity: number
  product: CartProduct
}

interface Cart {
  id: number
  items: CartItem[]
  totalItems: number
  totalAmount: number
}

interface CartState {
  cart: Cart | null
  loading: boolean
  error: string | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    cart: null,
    loading: false,
    error: null,
  }),

  getters: {
    // Tổng số sản phẩm trong giỏ
    totalItems: (state) => state.cart?.totalItems ?? 0,
    
    // Tổng tiền
    totalAmount: (state) => state.cart?.totalAmount ?? 0,
    
    // Danh sách items
    items: (state) => state.cart?.items ?? [],
    
    // Kiểm tra giỏ hàng trống
    isEmpty: (state) => !state.cart || state.cart.items.length === 0,
  },

  actions: {
    // Lấy giỏ hàng từ server
    async fetchCart() {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        this.cart = null
        return
      }

      this.loading = true
      try {
        const response = await clientAPI().get('/cart', {
          headers: authStore.getAuthHeaders(),
        })
        this.cart = response.data.cart
      } catch (err: any) {
        console.error('Fetch cart error:', err)
        this.error = err.response?.data?.error || 'Lỗi tải giỏ hàng'
      } finally {
        this.loading = false
      }
    },

    // Thêm sản phẩm vào giỏ hàng
    async addToCart(productId: number, quantity: number = 1) {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        return { success: false, error: 'Vui lòng đăng nhập để thêm vào giỏ hàng' }
      }

      this.loading = true
      try {
        const response = await clientAPI().post(
          '/cart',
          { productId, quantity },
          { headers: authStore.getAuthHeaders() }
        )
        
        // Refresh giỏ hàng sau khi thêm
        await this.fetchCart()
        
        return { success: true, message: response.data.message }
      } catch (err: any) {
        const error = err.response?.data?.error || 'Lỗi thêm vào giỏ hàng'
        this.error = error
        return { success: false, error }
      } finally {
        this.loading = false
      }
    },

    // Cập nhật số lượng sản phẩm
    async updateQuantity(itemId: number, quantity: number) {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) return { success: false }

      this.loading = true
      try {
        await clientAPI().put(
          '/cart',
          { itemId, quantity },
          { headers: authStore.getAuthHeaders() }
        )
        
        await this.fetchCart()
        return { success: true }
      } catch (err: any) {
        this.error = err.response?.data?.error || 'Lỗi cập nhật giỏ hàng'
        return { success: false }
      } finally {
        this.loading = false
      }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    async removeItem(itemId: number) {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) return { success: false }

      this.loading = true
      try {
        await clientAPI().delete(`/cart?itemId=${itemId}`, {
          headers: authStore.getAuthHeaders(),
        })
        
        await this.fetchCart()
        return { success: true }
      } catch (err: any) {
        this.error = err.response?.data?.error || 'Lỗi xóa sản phẩm'
        return { success: false }
      } finally {
        this.loading = false
      }
    },

    // Xóa toàn bộ giỏ hàng (local)
    clearCart() {
      this.cart = null
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
