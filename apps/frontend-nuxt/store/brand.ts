import { defineStore } from 'pinia'

import clientAPI from '../services/_AxiosConfig'

interface Brand {
  id: number
  name: string
  slug: string
  logoUrl: string | null
  description: string | null
  products?: any[]
}

export const useBrandStorage = defineStore('brandStorage', {
  state: () => ({
    brands: [] as Brand[],
    currentBrand: null as Brand | null,
    brandProducts: [] as any[],
    loading: false,
    loadingDetail: false,
    error: null as string | null,
  }),
  actions: {
    // Lấy danh sách tất cả brands
    async getBrand() {
      this.loading = true
      try {
        const response = await clientAPI().get('/brands')
        this.brands = response.data ?? []
      } catch (err: any) {
        this.error = err.message
        console.error('Error fetching brands:', err)
      } finally {
        this.loading = false
      }
    },

    // Lấy brand detail theo id hoặc slug (bao gồm products)
    async getBrandDetail(idOrSlug: string | number) {
      this.loadingDetail = true
      this.currentBrand = null
      this.brandProducts = []
      
      try {
        const response = await clientAPI().get(`/brands/${idOrSlug}`)
        const data = response.data
        
        this.currentBrand = data
        // Products của brand từ API
        this.brandProducts = (data.products || []).map((p: any) => ({
          ...p,
          images: p.imageUrl,
          compare_at_price: p.compareAtPrice,
        }))
      } catch (err: any) {
        this.error = err.message
        console.error('Error fetching brand detail:', err)
      } finally {
        this.loadingDetail = false
      }
    },

    // Tìm brand theo slug từ danh sách đã load
    getBrandBySlug(slug: string) {
      return this.brands.find(b => b.slug === slug) || null
    },
  },
})

// Hot Module Replacement (HMR)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBrandStorage, import.meta.hot))
}
