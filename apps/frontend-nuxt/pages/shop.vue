<script setup lang="ts">
const config = useRuntimeConfig();
const api = config.public.apiBase as string;

type Category = { id:number; name:string };
type Brand = { id:number; name:string };
type Product = {
  id:number; name:string; sku:string; price:number;
  categoryId:number; brandId:number;
  category?: Category; brand?: Brand;
};

const categories = ref<Category[]>([]);
const brands = ref<Brand[]>([]);
const products = ref<Product[]>([]);
const loading = ref(false);
const selectedCategory = ref<number | null>(null);
const selectedBrand = ref<number | null>(null);
const cart = ref<Map<number, number>>(new Map());

async function fetchRefs() {
  const [cats, brs] = await Promise.all([
    $fetch<Category[]>(`${api}/categories`),
    $fetch<Brand[]>(`${api}/brands`),
  ]);
  categories.value = cats;
  brands.value = brs;
}

async function fetchProducts() {
  loading.value = true;
  const res = await $fetch<{items:Product[]}>(`${api}/products`);
  products.value = res.items;
  loading.value = false;
}

function getFilteredProducts() {
  return products.value.filter(p => {
    const matchCategory = !selectedCategory.value || p.categoryId === selectedCategory.value;
    const matchBrand = !selectedBrand.value || p.brandId === selectedBrand.value;
    return matchCategory && matchBrand;
  });
}

function addToCart(product: Product) {
  const qty = cart.value.get(product.id) || 0;
  cart.value.set(product.id, qty + 1);
}

function removeFromCart(productId: number) {
  cart.value.delete(productId);
}

function getCartTotal() {
  let total = 0;
  cart.value.forEach((qty, productId) => {
    const product = products.value.find(p => p.id === productId);
    if (product) total += Number(product.price) * qty;
  });
  return total;
}

onMounted(async () => {
  await fetchRefs();
  await fetchProducts();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold">Fashion Store</h1>
            <NuxtLink to="/" class="text-blue-600 underline text-sm">← Quay lại trang chủ</NuxtLink>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-600">Giỏ hàng: <span class="font-bold">{{ cart.size }}</span> sản phẩm</div>
            <div class="text-lg font-bold">{{ getCartTotal().toLocaleString('vi-VN') }} đ</div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Sidebar Filters -->
        <aside class="bg-white rounded shadow p-4 h-fit">
          <h3 class="font-semibold text-lg mb-4">Bộ lọc</h3>

          <div class="mb-6">
            <h4 class="font-semibold text-sm mb-2">Danh mục</h4>
            <button
              @click="selectedCategory = null"
              :class="!selectedCategory ? 'bg-blue-600 text-white' : 'bg-gray-100'"
              class="w-full text-left px-3 py-2 rounded mb-2 text-sm"
            >
              Tất cả
            </button>
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="selectedCategory = cat.id"
              :class="selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-100'"
              class="w-full text-left px-3 py-2 rounded mb-2 text-sm"
            >
              {{ cat.name }}
            </button>
          </div>

          <div class="mb-6">
            <h4 class="font-semibold text-sm mb-2">Thương hiệu</h4>
            <button
              @click="selectedBrand = null"
              :class="!selectedBrand ? 'bg-blue-600 text-white' : 'bg-gray-100'"
              class="w-full text-left px-3 py-2 rounded mb-2 text-sm"
            >
              Tất cả
            </button>
            <button
              v-for="brand in brands"
              :key="brand.id"
              @click="selectedBrand = brand.id"
              :class="selectedBrand === brand.id ? 'bg-blue-600 text-white' : 'bg-gray-100'"
              class="w-full text-left px-3 py-2 rounded mb-2 text-sm"
            >
              {{ brand.name }}
            </button>
          </div>
        </aside>

        <!-- Products Grid -->
        <div class="md:col-span-3">
          <div class="mb-4 flex justify-between items-center">
            <h2 class="text-2xl font-bold">Sản phẩm</h2>
            <span v-if="loading" class="text-gray-500">Đang tải...</span>
            <span v-else class="text-gray-600 text-sm">{{ getFilteredProducts().length }} sản phẩm</span>
          </div>

          <div v-if="getFilteredProducts().length === 0" class="bg-white rounded shadow p-8 text-center">
            <p class="text-gray-600">Không có sản phẩm nào phù hợp với bộ lọc của bạn.</p>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="product in getFilteredProducts()" :key="product.id" class="bg-white rounded shadow hover:shadow-lg transition">
              <div class="bg-gray-200 h-48 flex items-center justify-center">
                <span class="text-gray-500">Ảnh sản phẩm</span>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-lg mb-1">{{ product.name }}</h3>
                <p class="text-sm text-gray-600 mb-2">SKU: {{ product.sku }}</p>
                <p class="text-sm text-gray-500 mb-3">
                  <span class="inline-block mr-2">{{ product.category?.name }}</span>
                  <span class="text-blue-600">{{ product.brand?.name }}</span>
                </p>
                <div class="flex justify-between items-center">
                  <span class="text-2xl font-bold text-blue-600">{{ Number(product.price).toLocaleString('vi-VN') }} đ</span>
                  <button
                    @click="addToCart(product)"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
                <button
                  v-if="cart.has(product.id)"
                  @click="removeFromCart(product.id)"
                  class="w-full mt-2 px-2 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
                >
                  Bỏ khỏi giỏ ({{ cart.get(product.id) }})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* { box-sizing: border-box; }
.min-h-screen { min-height: 100vh; }
.bg-gray-50 { background: #f9fafb; }
.bg-gray-100 { background: #f3f4f6; }
.bg-gray-200 { background: #e5e7eb; }
.bg-gray-500 { color: #6b7280; }
.bg-gray-600 { color: #4b5563; }
.bg-white { background: white; }
.shadow { box-shadow: 0 1px 3px rgba(0,0,0,.1); }
.hover\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1); }
.transition { transition: all 0.3s; }
.rounded { border-radius: .5rem; }
.px-2 { padding-left: .5rem; padding-right: .5rem; }
.px-3 { padding-left: .75rem; padding-right: .75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-1 { padding-top: .25rem; padding-bottom: .25rem; }
.py-2 { padding-top: .5rem; padding-bottom: .5rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.p-4 { padding: 1rem; }
.mb-1 { margin-bottom: .25rem; }
.mb-2 { margin-bottom: .5rem; }
.mb-3 { margin-bottom: .75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mt-2 { margin-top: .5rem; }
.flex { display: flex; }
.grid { display: grid; }
.justify-between { justify-content: space-between; }
.items-center { align-items: center; }
.h-fit { height: fit-content; }
.h-48 { height: 12rem; }
.max-w-7xl { max-width: 80rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.gap-6 { gap: 1.5rem; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 640px) {
  .sm\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 768px) {
  .md\:col-span-3 { grid-column: span 3 / span 3; }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@media (min-width: 1024px) {
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.text-sm { font-size: .875rem; }
.text-lg { font-size: 1.125rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.text-blue-600 { color: #2563eb; }
.text-blue-700 { color: #1d4ed8; }
.text-gray-500 { color: #6b7280; }
.text-gray-600 { color: #4b5563; }
.text-red-600 { color: #dc2626; }
.text-white { color: white; }
.bg-blue-600 { background: #2563eb; }
.bg-blue-700 { background: #1d4ed8; }
.hover\:bg-blue-700:hover { background: #1d4ed8; }
.hover\:bg-red-50:hover { background: #fef2f2; }
.border { border: 1px solid #e5e7eb; }
.border-red-300 { border-color: #fca5a5; }
.underline { text-decoration: underline; }
.inline-block { display: inline-block; }
.mr-2 { margin-right: .5rem; }
.w-full { width: 100%; }
</style>
