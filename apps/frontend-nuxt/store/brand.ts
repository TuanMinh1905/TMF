import { defineStore } from 'pinia'

import clientAPI from '../services/_AxiosConfig'

export const useBrandStorage = defineStore('brandStorage', {
  state: () => ({
    brands: [],
    loading: false,
    error: null,
  }),
  actions: {
    async getBrand() {
      let brands = []
      let loading = true
      this.$patch({ loading: loading })

      try {
        const response = await clientAPI().get(
          `/brands`,
        )
        brands = response.data ?? []
      }
      finally {
        loading = false
        this.$patch({ brands: brands, loading: loading })
      }
    },
  },
})

// Hot Module Replacement (HMR) - Cho phép cập nhật store mà không cần reload trình duyệt khi đang dev
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBrandStorage, import.meta.hot))
}
