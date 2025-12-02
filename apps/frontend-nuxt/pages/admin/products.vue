<script setup lang="ts">
// Áp dụng middleware admin
definePageMeta({
  middleware: 'admin',
})

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
const items = ref<Product[]>([]);
const loading = ref(false);
const editing = ref<Product|null>(null);

const form = reactive({ name:'', sku:'', price:0, categoryId:0, brandId:0 });

async function fetchRefs() {
  const [cats, brs] = await Promise.all([
    $fetch<Category[]>(`${api}/categories`),
    $fetch<Brand[]>(`${api}/brands`),
  ]);
  categories.value = cats; brands.value = brs;
  if (cats.length && !form.categoryId) form.categoryId = cats[0].id;
  if (brs.length && !form.brandId) form.brandId = brs[0].id;
}

async function fetchProducts() {
  loading.value = true;
  const res = await $fetch<{items:Product[]}>(`${api}/products`);
  items.value = res.items; loading.value = false;
}

function resetForm() {
  form.name=''; form.sku=''; form.price=0;
  form.categoryId = categories.value[0]?.id || 0;
  form.brandId = brands.value[0]?.id || 0;
  editing.value = null;
}

async function createProduct() {
  await $fetch(`${api}/products`, { method:'POST', body:{ ...form, price:Number(form.price) } });
  resetForm(); fetchProducts();
}

function editRow(p: Product) {
  editing.value = p;
  form.name = p.name; form.sku = p.sku; form.price = p.price;
  form.categoryId = p.categoryId; form.brandId = p.brandId;
}

async function updateProduct() {
  if (!editing.value) return;
  await $fetch(`${api}/products/${editing.value.id}`, { method:'PUT', body:{ ...form, price:Number(form.price) } });
  resetForm(); fetchProducts();
}

async function removeProduct(id:number) {
  if (!confirm('Delete this product?')) return;
  await $fetch(`${api}/products/${id}`, { method:'DELETE' });
  fetchProducts();
}

onMounted(async () => { await fetchRefs(); await fetchProducts(); });
</script>

<template>
  <div class="p-6 font-sans max-w-5xl mx-auto">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Admin - Quản lý Sản phẩm</h1>
      <NuxtLink to="/" class="text-blue-600 underline mt-2 inline-block">← Quay lại trang chủ</NuxtLink>
    </div>

    <div class="border rounded p-4 mb-6 bg-white shadow">
      <h2 class="text-lg font-semibold mb-2">{{ editing ? 'Chỉnh sửa Sản phẩm' : 'Tạo Sản phẩm mới' }}</h2>
      <div class="grid md:grid-cols-2 gap-3">
        <label class="flex flex-col gap-1">
          <span>Tên sản phẩm</span>
          <input v-model="form.name" class="border rounded px-3 py-2" placeholder="Nhập tên sản phẩm" />
        </label>
        <label class="flex flex-col gap-1">
          <span>SKU</span>
          <input v-model="form.sku" class="border rounded px-3 py-2" placeholder="Nhập SKU" />
        </label>
        <label class="flex flex-col gap-1">
          <span>Giá</span>
          <input v-model.number="form.price" type="number" min="0" step="0.01" class="border rounded px-3 py-2" />
        </label>
        <label class="flex flex-col gap-1">
          <span>Danh mục</span>
          <select v-model.number="form.categoryId" class="border rounded px-3 py-2">
            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
        </label>
        <label class="flex flex-col gap-1">
          <span>Thương hiệu</span>
          <select v-model.number="form.brandId" class="border rounded px-3 py-2">
            <option v-for="b in brands" :key="b.id" :value="b.id">{{ b.name }}</option>
          </select>
        </label>
      </div>

      <div class="mt-3 flex gap-3">
        <button v-if="!editing" @click="createProduct" class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Tạo mới</button>
        <button v-else @click="updateProduct" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Cập nhật</button>
        <button v-if="editing" @click="resetForm" class="px-4 py-2 rounded border hover:bg-gray-100">Hủy</button>
      </div>
    </div>

    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-lg font-semibold">Danh sách Sản phẩm</h2>
        <span v-if="loading" class="text-gray-500">Đang tải...</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2 text-left">ID</th>
              <th class="border p-2 text-left">Tên sản phẩm</th>
              <th class="border p-2 text-left">SKU</th>
              <th class="border p-2 text-left">Giá</th>
              <th class="border p-2 text-left">Danh mục</th>
              <th class="border p-2 text-left">Thương hiệu</th>
              <th class="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in items" :key="p.id" class="hover:bg-gray-50">
              <td class="border p-2">{{ p.id }}</td>
              <td class="border p-2">{{ p.name }}</td>
              <td class="border p-2">{{ p.sku }}</td>
              <td class="border p-2">{{ Number(p.price).toLocaleString('vi-VN') }} đ</td>
              <td class="border p-2">{{ p.category?.name }}</td>
              <td class="border p-2">{{ p.brand?.name }}</td>
              <td class="border p-2 text-center">
                <button @click="editRow(p)" class="px-3 py-1 border rounded mr-2 hover:bg-blue-50">Sửa</button>
                <button @click="removeProduct(p.id)" class="px-3 py-1 border rounded border-red-300 text-red-600 hover:bg-red-50">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
* { box-sizing: border-box; }
.bg-gray-100 { background: #f3f4f6; }
.bg-gray-50 { background: #f9fafb; }
.border { border: 1px solid #e5e7eb; }
.rounded { border-radius: .5rem; }
.shadow { box-shadow: 0 1px 3px rgba(0,0,0,.1); }
.p-2 { padding: .5rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.mb-2 { margin-bottom: .5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mt-2 { margin-top: .5rem; }
.mt-3 { margin-top: .75rem; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.text-3xl { font-size: 1.875rem; }
.text-lg { font-size: 1.125rem; }
.grid { display: grid; }
.gap-1 { gap: .25rem; }
.gap-3 { gap: .75rem; }
.md\:grid-cols-2 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
.max-w-5xl { max-width: 64rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.text-blue-600 { color: #2563eb; }
.underline { text-decoration: underline; }
.inline-block { display: inline-block; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.bg-green-600 { background: #16a34a; }
.hover\:bg-green-700:hover { background: #15803d; }
.bg-blue-600 { background: #2563eb; }
.hover\:bg-blue-700:hover { background: #1d4ed8; }
.border-red-300 { border-color: #fca5a5; }
.text-red-600 { color: #dc2626; }
.hover\:bg-red-50:hover { background: #fef2f2; }
.hover\:bg-blue-50:hover { background: #eff6ff; }
.hover\:bg-gray-100:hover { background: #f3f4f6; }
.text-white { color: white; }
.text-gray-500 { color: #6b7280; }
</style>
