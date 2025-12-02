<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-800">TMF</NuxtLink>
          <span class="text-gray-300">|</span>
          <h1 class="text-xl text-gray-600">Giỏ hàng</h1>
          <span class="text-sm text-gray-400">({{ cartStore.totalItems }} sản phẩm)</span>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Chưa đăng nhập -->
      <div v-if="!authStore.isLoggedIn" class="bg-white rounded-lg shadow p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Vui lòng đăng nhập</h2>
        <p class="text-gray-500 mb-6">Đăng nhập để xem giỏ hàng và đặt hàng</p>
        <NuxtLink
          to="/login"
          class="inline-block px-8 py-3 bg-primary hover:bg-yellow-500 text-gray-800 font-semibold rounded-lg transition"
        >
          Đăng nhập ngay
        </NuxtLink>
      </div>

      <!-- Giỏ hàng trống -->
      <div v-else-if="cartStore.isEmpty && !loading" class="bg-white rounded-lg shadow p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h2>
        <p class="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng</p>
        <NuxtLink
          to="/category/ao"
          class="inline-block px-8 py-3 bg-primary hover:bg-yellow-500 text-gray-800 font-semibold rounded-lg transition"
        >
          Mua sắm ngay
        </NuxtLink>
      </div>

      <!-- Loading -->
      <div v-else-if="loading" class="bg-white rounded-lg shadow p-8 text-center">
        <div class="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-500">Đang tải giỏ hàng...</p>
      </div>

      <!-- Có sản phẩm trong giỏ -->
      <div v-else class="grid lg:grid-cols-3 gap-6">
        <!-- Danh sách sản phẩm (2/3) -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Header chọn tất cả -->
          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center gap-4">
              <input
                type="checkbox"
                :checked="allSelected"
                class="w-5 h-5 accent-primary"
                @change="toggleSelectAll"
              >
              <span class="font-medium text-gray-700">Chọn tất cả ({{ cartStore.items.length }} sản phẩm)</span>
              <button
                v-if="selectedItems.length > 0"
                class="ml-auto text-red-500 hover:text-red-600 text-sm"
                @click="removeSelectedItems"
              >
                Xóa đã chọn ({{ selectedItems.length }})
              </button>
            </div>
          </div>

          <!-- Danh sách items -->
          <div class="bg-white rounded-lg shadow divide-y">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="p-4 hover:bg-gray-50 transition"
            >
              <div class="flex gap-4">
                <!-- Checkbox -->
                <input
                  type="checkbox"
                  :checked="selectedItems.includes(item.id)"
                  class="w-5 h-5 accent-primary mt-6"
                  @change="toggleSelectItem(item.id)"
                >

                <!-- Ảnh sản phẩm -->
                <img
                  :src="item.product.imageUrl || '/placeholder.png'"
                  :alt="item.product.name"
                  class="w-24 h-24 object-cover rounded-lg border flex-shrink-0"
                >

                <!-- Thông tin sản phẩm -->
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-gray-800 line-clamp-2 mb-1">
                    {{ item.product.name }}
                  </h3>
                  
                  <!-- Giá -->
                  <div class="flex items-center gap-2 mb-3">
                    <span class="text-lg font-bold text-red-500">
                      {{ formatVNDWithComma(item.product.price) }}đ
                    </span>
                    <span v-if="item.product.compareAtPrice" class="text-sm text-gray-400 line-through">
                      {{ formatVNDWithComma(item.product.compareAtPrice) }}đ
                    </span>
                    <span
                      v-if="item.product.compareAtPrice"
                      class="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded"
                    >
                      -{{ Math.round((1 - item.product.price / item.product.compareAtPrice) * 100) }}%
                    </span>
                  </div>

                  <!-- Số lượng & Actions -->
                  <div class="flex items-center justify-between">
                    <!-- Số lượng -->
                    <div class="flex items-center border rounded-lg">
                      <button
                        class="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition text-lg"
                        :disabled="item.quantity <= 1"
                        @click="updateQuantity(item.id, item.quantity - 1)"
                      >
                        −
                      </button>
                      <input
                        :value="item.quantity"
                        type="number"
                        min="1"
                        class="w-14 h-9 text-center border-x focus:outline-none"
                        @change="(e) => updateQuantity(item.id, parseInt((e.target as HTMLInputElement).value) || 1)"
                      >
                      <button
                        class="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition text-lg"
                        @click="updateQuantity(item.id, item.quantity + 1)"
                      >
                        +
                      </button>
                    </div>

                    <!-- Thành tiền -->
                    <div class="text-right">
                      <p class="text-sm text-gray-500">Thành tiền:</p>
                      <p class="text-lg font-bold text-red-500">
                        {{ formatVNDWithComma(item.product.price * item.quantity) }}đ
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Nút xóa -->
                <button
                  class="self-start p-2 text-gray-400 hover:text-red-500 transition"
                  @click="removeItem(item.id)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel thanh toán (1/3) -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6 sticky top-24">
            <!-- Thông tin đơn hàng -->
            <h2 class="text-lg font-bold text-gray-800 mb-4 pb-4 border-b">
              Thông tin đơn hàng
            </h2>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Tạm tính ({{ selectedItems.length }} sản phẩm)</span>
                <span class="font-medium">{{ formatVNDWithComma(selectedTotal) }}đ</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Giảm giá</span>
                <span class="text-green-600">-{{ formatVNDWithComma(discount) }}đ</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Phí vận chuyển</span>
                <span v-if="shippingFee === 0" class="text-green-600">Miễn phí</span>
                <span v-else class="font-medium">{{ formatVNDWithComma(shippingFee) }}đ</span>
              </div>
            </div>

            <!-- Voucher -->
            <div class="mt-4 pt-4 border-t">
              <div class="flex gap-2">
                <input
                  v-model="voucherCode"
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  class="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                <button
                  class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition"
                  @click="applyVoucher"
                >
                  Áp dụng
                </button>
              </div>
            </div>

            <!-- Tổng cộng -->
            <div class="mt-4 pt-4 border-t">
              <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-bold text-gray-800">Tổng cộng</span>
                <span class="text-2xl font-bold text-red-500">{{ formatVNDWithComma(grandTotal) }}đ</span>
              </div>
              <p class="text-xs text-gray-500 mb-4">(Đã bao gồm VAT nếu có)</p>
            </div>

            <!-- Nút thanh toán -->
            <button
              :disabled="selectedItems.length === 0"
              class="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              @click="goToCheckout"
            >
              Mua hàng ({{ selectedItems.length }})
            </button>

            <NuxtLink
              to="/category/ao"
              class="block w-full py-3 mt-3 text-center text-gray-600 hover:text-gray-800 text-sm"
            >
              ← Tiếp tục mua sắm
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Checkout Modal -->
    <Teleport to="body">
      <div
        v-if="showCheckout"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto py-8"
        @click.self="showCheckout = false"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 my-auto">
          <!-- Header -->
          <div class="p-6 border-b flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-800">Thanh toán đơn hàng</h2>
            <button
              class="p-2 hover:bg-gray-100 rounded-full transition"
              @click="showCheckout = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleCheckout" class="p-6">
            <!-- Thông tin người nhận -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Thông tin người nhận
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Họ tên <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="checkoutForm.fullName"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="checkoutForm.phone"
                    type="tel"
                    placeholder="0901234567"
                    class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                </div>
              </div>
            </div>

            <!-- Địa chỉ giao hàng -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Địa chỉ giao hàng
              </h3>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ chi tiết <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="checkoutForm.shippingAddress"
                  rows="3"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                ></textarea>
              </div>
            </div>

            <!-- Phương thức vận chuyển -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                Phương thức vận chuyển
              </h3>
              <div class="space-y-3">
                <label
                  v-for="method in shippingMethods"
                  :key="method.id"
                  class="flex items-center p-4 border rounded-lg cursor-pointer transition"
                  :class="checkoutForm.shippingMethod === method.id ? 'border-primary bg-yellow-50' : 'hover:border-gray-300'"
                >
                  <input
                    v-model="checkoutForm.shippingMethod"
                    type="radio"
                    :value="method.id"
                    class="w-5 h-5 accent-primary"
                  >
                  <div class="ml-4 flex-1">
                    <p class="font-medium text-gray-800">{{ method.name }}</p>
                    <p class="text-sm text-gray-500">{{ method.description }}</p>
                  </div>
                  <span class="font-semibold" :class="method.price === 0 ? 'text-green-600' : 'text-gray-800'">
                    {{ method.price === 0 ? 'Miễn phí' : formatVNDWithComma(method.price) + 'đ' }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Phương thức thanh toán -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Phương thức thanh toán
              </h3>
              <div class="space-y-3">
                <label
                  v-for="method in paymentMethods"
                  :key="method.id"
                  class="flex items-center p-4 border rounded-lg cursor-pointer transition"
                  :class="checkoutForm.paymentMethod === method.id ? 'border-primary bg-yellow-50' : 'hover:border-gray-300'"
                >
                  <input
                    v-model="checkoutForm.paymentMethod"
                    type="radio"
                    :value="method.id"
                    class="w-5 h-5 accent-primary"
                  >
                  <div class="ml-4 flex-1">
                    <p class="font-medium text-gray-800">{{ method.name }}</p>
                    <p class="text-sm text-gray-500">{{ method.description }}</p>
                  </div>
                  <span class="text-2xl">{{ method.icon }}</span>
                </label>
              </div>
            </div>

            <!-- Ghi chú -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Ghi chú đơn hàng
              </h3>
              <textarea
                v-model="checkoutForm.note"
                rows="2"
                placeholder="Ghi chú cho người bán (ví dụ: màu sắc, size...)"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <!-- Tóm tắt đơn hàng -->
            <div class="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 class="font-semibold text-gray-800 mb-3">Tóm tắt đơn hàng</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Tạm tính ({{ selectedItems.length }} sản phẩm)</span>
                  <span>{{ formatVNDWithComma(selectedTotal) }}đ</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Giảm giá</span>
                  <span class="text-green-600">-{{ formatVNDWithComma(discount) }}đ</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Phí vận chuyển</span>
                  <span>{{ currentShippingFee === 0 ? 'Miễn phí' : formatVNDWithComma(currentShippingFee) + 'đ' }}</span>
                </div>
                <div class="flex justify-between pt-2 border-t font-bold text-lg">
                  <span>Tổng thanh toán</span>
                  <span class="text-red-500">{{ formatVNDWithComma(checkoutTotal) }}đ</span>
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex gap-4">
              <button
                type="button"
                class="flex-1 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition"
                @click="showCheckout = false"
              >
                Quay lại
              </button>
              <button
                type="submit"
                :disabled="checkoutLoading"
                class="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition disabled:opacity-50"
              >
                {{ checkoutLoading ? 'Đang xử lý...' : 'Xác nhận đặt hàng' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Order Success Modal -->
    <Teleport to="body">
      <div
        v-if="orderSuccess"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-8 text-center">
          <!-- Success Icon -->
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 class="text-2xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h2>
          <p class="text-gray-600 mb-4">Cảm ơn bạn đã mua hàng tại TMF</p>

          <!-- Mã đơn hàng -->
          <div class="bg-gray-100 rounded-lg p-4 mb-6">
            <p class="text-sm text-gray-500 mb-1">Mã đơn hàng của bạn</p>
            <p class="text-2xl font-bold text-primary">{{ orderCode }}</p>
          </div>

          <p class="text-sm text-gray-500 mb-6">
            Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
          </p>

          <div class="flex gap-4">
            <NuxtLink
              to="/category/ao"
              class="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition text-center"
            >
              Tiếp tục mua sắm
            </NuxtLink>
            <NuxtLink
              to="/"
              class="flex-1 py-3 bg-primary hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition text-center"
            >
              Về trang chủ
            </NuxtLink>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'
import { useAuthStore } from '~/store/auth'
import clientAPI from '~/services/_AxiosConfig'

const cartStore = useCartStore()
const authStore = useAuthStore()

// States
const loading = ref(true)
const showCheckout = ref(false)
const checkoutLoading = ref(false)
const orderSuccess = ref(false)
const orderCode = ref('')
const voucherCode = ref('')
const discount = ref(0)
const selectedItems = ref<number[]>([])

// Shipping methods
const shippingMethods = [
  { id: 'standard', name: 'Giao hàng tiêu chuẩn', description: 'Nhận hàng trong 3-5 ngày', price: 30000 },
  { id: 'fast', name: 'Giao hàng nhanh', description: 'Nhận hàng trong 1-2 ngày', price: 50000 },
  { id: 'express', name: 'Giao hàng hỏa tốc', description: 'Nhận hàng trong 2-4 giờ (nội thành)', price: 80000 },
]

// Payment methods
const paymentMethods = [
  { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', description: 'Thanh toán bằng tiền mặt khi nhận hàng', icon: '💵' },
  { id: 'bank', name: 'Chuyển khoản ngân hàng', description: 'Chuyển khoản trước khi giao hàng', icon: '🏦' },
  { id: 'momo', name: 'Ví MoMo', description: 'Thanh toán qua ví điện tử MoMo', icon: '📱' },
  { id: 'vnpay', name: 'VNPay', description: 'Thanh toán qua cổng VNPay', icon: '💳' },
]

// Checkout form
const checkoutForm = reactive({
  fullName: '',
  phone: '',
  shippingAddress: '',
  shippingMethod: 'standard',
  paymentMethod: 'cod',
  note: '',
})

// Computed
const allSelected = computed(() => {
  return cartStore.items.length > 0 && selectedItems.value.length === cartStore.items.length
})

const selectedTotal = computed(() => {
  return cartStore.items
    .filter(item => selectedItems.value.includes(item.id))
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
})

const shippingFee = computed(() => {
  // Miễn phí ship cho đơn trên 500k
  if (selectedTotal.value >= 500000) return 0
  return shippingMethods.find(m => m.id === 'standard')?.price || 30000
})

const currentShippingFee = computed(() => {
  if (selectedTotal.value >= 500000) return 0
  return shippingMethods.find(m => m.id === checkoutForm.shippingMethod)?.price || 30000
})

const grandTotal = computed(() => {
  return selectedTotal.value - discount.value + shippingFee.value
})

const checkoutTotal = computed(() => {
  return selectedTotal.value - discount.value + currentShippingFee.value
})

// Methods
onMounted(async () => {
  if (authStore.isLoggedIn) {
    await cartStore.fetchCart()
    // Mặc định chọn tất cả
    selectedItems.value = cartStore.items.map(item => item.id)
    // Fill form với thông tin user
    checkoutForm.fullName = authStore.user?.fullName || ''
  }
  loading.value = false
})

function toggleSelectAll() {
  if (allSelected.value) {
    selectedItems.value = []
  } else {
    selectedItems.value = cartStore.items.map(item => item.id)
  }
}

function toggleSelectItem(itemId: number) {
  const index = selectedItems.value.indexOf(itemId)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(itemId)
  }
}

async function updateQuantity(itemId: number, quantity: number) {
  if (quantity < 1) return
  await cartStore.updateQuantity(itemId, quantity)
}

async function removeItem(itemId: number) {
  if (confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) {
    await cartStore.removeItem(itemId)
    selectedItems.value = selectedItems.value.filter(id => id !== itemId)
  }
}

async function removeSelectedItems() {
  if (confirm(`Bạn có muốn xóa ${selectedItems.value.length} sản phẩm đã chọn?`)) {
    for (const itemId of selectedItems.value) {
      await cartStore.removeItem(itemId)
    }
    selectedItems.value = []
  }
}

function applyVoucher() {
  // Demo voucher
  if (voucherCode.value.toUpperCase() === 'TMF50') {
    discount.value = Math.min(50000, selectedTotal.value * 0.1)
    alert('Áp dụng mã giảm giá thành công! Giảm ' + formatVNDWithComma(discount.value) + 'đ')
  } else if (voucherCode.value.toUpperCase() === 'FREESHIP') {
    alert('Áp dụng mã FREESHIP thành công!')
  } else if (voucherCode.value) {
    alert('Mã giảm giá không hợp lệ')
  }
}

function goToCheckout() {
  if (selectedItems.value.length === 0) {
    alert('Vui lòng chọn ít nhất 1 sản phẩm')
    return
  }
  showCheckout.value = true
}

async function handleCheckout() {
  if (!checkoutForm.fullName || !checkoutForm.phone || !checkoutForm.shippingAddress) {
    alert('Vui lòng điền đầy đủ thông tin')
    return
  }

  checkoutLoading.value = true

  try {
    const response = await clientAPI().post(
      '/orders',
      {
        shippingAddress: checkoutForm.shippingAddress,
        phone: checkoutForm.phone,
        note: `[${checkoutForm.paymentMethod.toUpperCase()}] [${checkoutForm.shippingMethod}] ${checkoutForm.note}`,
      },
      { headers: authStore.getAuthHeaders() }
    )

    // Tạo mã đơn hàng
    const orderId = response.data.order?.id || Math.floor(Math.random() * 1000000)
    orderCode.value = `TMF${String(orderId).padStart(8, '0')}`

    showCheckout.value = false
    orderSuccess.value = true
    cartStore.clearCart()
    selectedItems.value = []
  } catch (err: any) {
    alert(err.response?.data?.error || 'Lỗi đặt hàng. Vui lòng thử lại.')
  } finally {
    checkoutLoading.value = false
  }
}
</script>
