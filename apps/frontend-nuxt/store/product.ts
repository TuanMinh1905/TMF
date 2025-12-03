import { defineStore } from 'pinia'
import clientAPI from '../services/_AxiosConfig'

interface ProductFilters {
  categoryId?: number | null
  brandId?: number | null
  page?: number
  pageSize?: number
}

// Interface đúng với Prisma schema
interface Product {
  id: number
  name: string
  title?: string | null
  alias: string
  sku: string
  price: number
  compareAtPrice?: number | null
  description?: string | null
  imageUrl?: string | null
  rating?: number | null
  reviewCount?: number | null
  stock?: number | null
  isActive: boolean
  categoryId: number
  brandId: number
  createdAt?: string
  updatedAt?: string
  category?: any
  brand?: any
  images?: { id: number; url: string; productId: number }[]
  relatedProducts?: Product[]
}

export const useProductStorage = defineStore('productStorage', {
  state: () => ({
    products: [] as Product[],
    // Chi tiết sản phẩm
    currentProduct: null as Product | null,
    relatedProducts: [] as Product[],
    loadingDetail: false,
    // List
    loading: false,
    error: null as string | null,
    total: 0,
    page: 1,
    pageSize: 20,
  }),
  actions: {
    // Lấy chi tiết sản phẩm theo id hoặc slug (alias)
    async getProductDetail(idOrSlug: string | number) {
      this.loadingDetail = true
      this.currentProduct = null
      this.relatedProducts = []
      
      try {
        const response = await clientAPI().get(`/products/${idOrSlug}`)
        const data = response.data
        
        this.currentProduct = data
        this.relatedProducts = data.relatedProducts || []
      } catch (err: any) {
        this.error = err.message
        console.error('Error fetching product detail:', err)
      } finally {
        this.loadingDetail = false
      }
    },

    async getProducts(filters: ProductFilters = {}) {
      this.loading = true
      try {
        // Build query params
        const params = new URLSearchParams()

        if (filters.categoryId) {
          params.append('categoryId', String(filters.categoryId))
        }
        if (filters.brandId) {
          params.append('brandId', String(filters.brandId))
        }
        if (filters.page) {
          params.append('page', String(filters.page))
        }
        if (filters.pageSize) {
          params.append('pageSize', String(filters.pageSize))
        }

        const queryString = params.toString()
        const url = queryString ? `/products?${queryString}` : '/products'

        const response = await clientAPI().get(url)
        // API trả về { page, pageSize, total, items }
        const data = response.data
        const items = data?.items ?? data ?? []

        this.total = data?.total ?? items.length
        this.page = data?.page ?? 1
        this.pageSize = data?.pageSize ?? 20

        // Map imageUrl thành images cho component Product.vue
        this.products = items.map((p: any) => ({
          ...p,
          images: p.imageUrl || p.images,
          compare_at_price: p.compareAtPrice,
        }))
      } catch (err: any) {
        this.error = err.message
        console.error('Error fetching products:', err)
      } finally {
        this.loading = false
      }
    },

    // Helper methods để gọi nhanh
    async getProductsByCategory(categoryId: number) {
      return this.getProducts({ categoryId })
    },

    async getProductsByBrand(brandId: number) {
      return this.getProducts({ brandId })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStorage, import.meta.hot))
}
