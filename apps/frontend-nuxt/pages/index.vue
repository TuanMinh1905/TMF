
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="max-w-4xl mx-auto px-6 py-16">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Fashion Store</h1>
        <p class="text-gray-600 mb-8">Chào mừng bạn đến với cửa hàng thời trang của chúng tôi!</p>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <!-- Customer Section -->
          <div class="border-2 border-blue-200 rounded-lg p-6 hover:border-blue-600 transition">
            <h2 class="text-2xl font-bold text-blue-600 mb-2">👥 Khách hàng</h2>
            <p class="text-gray-600 mb-4">Duyệt các sản phẩm thời trang tuyệt vời của chúng tôi</p>
            <NuxtLink to="/shop" class="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Xem cửa hàng →
            </NuxtLink>
          </div>

          <!-- Admin Section -->
          <div class="border-2 border-red-200 rounded-lg p-6 hover:border-red-600 transition">
            <h2 class="text-2xl font-bold text-red-600 mb-2">⚙️ Quản lý</h2>
            <p class="text-gray-600 mb-4">Quản lý sản phẩm, danh mục và thương hiệu</p>
            <NuxtLink to="/admin/products" class="inline-block px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
              Vào trang admin →
            </NuxtLink>
          </div>
        </div>

        <div class="bg-gray-50 rounded p-4">
          <h3 class="font-semibold text-gray-800 mb-2">📋 Chức năng:</h3>
          <ul class="text-gray-700 space-y-1">
            <li>✓ Khách hàng: Xem sản phẩm, lọc theo danh mục & thương hiệu, thêm vào giỏ</li>
            <li>✓ Admin: Tạo, chỉnh sửa, xóa sản phẩm</li>
            <li>✓ Quản lý danh mục và thương hiệu</li>
            <li>✓ Hệ thống giá tiền rõ ràng</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
