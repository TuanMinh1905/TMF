<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-800">TMF</NuxtLink>
          <span class="text-gray-300">|</span>
          <h1 class="text-xl text-gray-600">Giỏ hàng</h1>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Chưa đăng nhập -->
      <div v-if="!authStore.isLoggedIn" class="bg-white rounded-lg shadow p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p class="text-gray-500 mb-4">Vui lòng đăng nhập để xem giỏ hàng</p>
        <NuxtLink
          to="/login"
          class="inline-block px-6 py-3 bg-primary hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition"
        >
          Đăng nhập
        </NuxtLink>
      </div>

      <!-- Giỏ hàng trống -->
      <div v-else-if="cartStore.isEmpty" class="bg-white rounded-lg shadow p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p class="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
        <NuxtLink
          to="/category/ao"
          class="inline-block px-6 py-3 bg-primary hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition"
        >
          Tiếp tục mua sắm
        </NuxtLink>
      </div>

      <!-- Có sản phẩm trong giỏ -->
      <div v-else class="grid lg:grid-cols-3 gap-6">
        <!-- Danh sách sản phẩm -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <!-- Header -->
            <div class="border-b p-4">
              <div class="grid grid-cols-12 gap-4 text-sm text-gray-500 font-medium">
                <div class="col-span-6">Sản phẩm</div>
                <div class="col-span-2 text-center">Đơn giá</div>
                <div class="col-span-2 text-center">Số lượng</div>
                <div class="col-span-2 text-right">Thành tiền</div>
              </div>
            </div>

            <!-- Items -->
            <div class="divide-y">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="p-4 grid grid-cols-12 gap-4 items-center"
              >
                <!-- Sản phẩm -->
                <div class="col-span-6 flex gap-4">
                  <img
                    :src="item.product.imageUrl || '/placeholder.png'"
                    :alt="item.product.name"
                    class="w-20 h-20 object-cover rounded-lg border"
                  >
                  <div class="flex-1">
                    <h3 class="font-medium text-gray-800 line-clamp-2">{{ item.product.name }}</h3>
                    <button
                      class="text-sm text-red-500 hover:text-red-600 mt-2"
                      @click="removeItem(item.id)"
                    >
                      Xóa
                    </button>
                  </div>
                </div>

                <!-- Đơn giá -->
                <div class="col-span-2 text-center">
                  <p class="font-medium text-gray-800">
                    {{ formatVNDWithComma(item.product.price) }}đ
                  </p>
                  <p v-if="item.product.compareAtPrice" class="text-sm text-gray-400 line-through">
                    {{ formatVNDWithComma(item.product.compareAtPrice) }}đ
                  </p>
                </div>

                <!-- Số lượng -->
                <div class="col-span-2">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      class="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                      @click="updateQuantity(item.id, item.quantity - 1)"
                    >
                      -
                    </button>
                    <span class="w-10 text-center">{{ item.quantity }}</span>
                    <button
                      class="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                      @click="updateQuantity(item.id, item.quantity + 1)"
                    >
                      +
                    </button>
                  </div>
                </div>

                <!-- Thành tiền -->
                <div class="col-span-2 text-right">
                  <p class="font-bold text-red-500">
                    {{ formatVNDWithComma(item.product.price * item.quantity) }}đ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tổng tiền & Thanh toán -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 class="text-lg font-bold text-gray-800 mb-4">Tổng đơn hàng</h2>

            <div class="space-y-3 border-b pb-4 mb-4">
              <div class="flex justify-between text-gray-600">
                <span>Tạm tính ({{ cartStore.totalItems }} sản phẩm)</span>
                <span>{{ formatVNDWithComma(cartStore.totalAmount) }}đ</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span class="text-green-600">Miễn phí</span>
              </div>
            </div>

            <div class="flex justify-between text-lg font-bold text-gray-800 mb-6">
              <span>Tổng cộng</span>
              <span class="text-red-500">{{ formatVNDWithComma(cartStore.totalAmount) }}đ</span>
            </div>

            <button
              class="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition"
              @click="showCheckout = true"
            >
              Mua hàng ({{ cartStore.totalItems }})
            </button>

            <NuxtLink
              to="/category/ao"
              class="block w-full py-3 mt-3 text-center text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition"
            >
              Tiếp tục mua sắm
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Checkout Modal -->
    <div
      v-if="showCheckout"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showCheckout = false"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Thông tin giao hàng</h2>

        <form @submit.prevent="handleCheckout">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
              <input
                v-model="checkoutForm.fullName"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                v-model="checkoutForm.phone"
                type="tel"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng</label>
              <textarea
                v-model="checkoutForm.shippingAddress"
                rows="3"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ghi chú (tùy chọn)</label>
              <textarea
                v-model="checkoutForm.note"
                rows="2"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>
          </div>

          <div class="border-t mt-6 pt-4">
            <div class="flex justify-between text-lg font-bold mb-4">
              <span>Tổng thanh toán:</span>
              <span class="text-red-500">{{ formatVNDWithComma(cartStore.totalAmount) }}đ</span>
            </div>

            <div class="flex gap-3">
              <button
                type="button"
                class="flex-1 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition"
                @click="showCheckout = false"
              >
                Hủy
              </button>
              <button
                type="submit"
                :disabled="checkoutLoading"
                class="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition disabled:opacity-50"
              >
                {{ checkoutLoading ? 'Đang xử lý...' : 'Đặt hàng' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="orderSuccess"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-8 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h2>
        <p class="text-gray-600 mb-6">Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ sớm nhất.</p>
        <NuxtLink
          to="/"
          class="inline-block px-6 py-3 bg-primary hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition"
        >
          Về trang chủ
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'
import { useAuthStore } from '~/store/auth'
import clientAPI from '~/services/_AxiosConfig'

const cartStore = useCartStore()
const authStore = useAuthStore()

const showCheckout = ref(false)
const checkoutLoading = ref(false)
const orderSuccess = ref(false)

const checkoutForm = reactive({
  fullName: authStore.user?.fullName || '',
  phone: '',
  shippingAddress: '',
  note: '',
})

// Fetch cart khi vào trang
onMounted(() => {
  if (authStore.isLoggedIn) {
    cartStore.fetchCart()
  }
})

async function updateQuantity(itemId: number, quantity: number) {
  if (quantity < 1) {
    // Xác nhận xóa
    if (confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      await cartStore.removeItem(itemId)
    }
    return
  }
  await cartStore.updateQuantity(itemId, quantity)
}

async function removeItem(itemId: number) {
  if (confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) {
    await cartStore.removeItem(itemId)
  }
}

async function handleCheckout() {
  checkoutLoading.value = true

  try {
    await clientAPI().post(
      '/orders',
      {
        shippingAddress: checkoutForm.shippingAddress,
        phone: checkoutForm.phone,
        note: checkoutForm.note,
      },
      { headers: authStore.getAuthHeaders() }
    )

    showCheckout.value = false
    orderSuccess.value = true
    cartStore.clearCart()
  } catch (err: any) {
    alert(err.response?.data?.error || 'Lỗi đặt hàng')
  } finally {
    checkoutLoading.value = false
  }
}
</script>
