import { defineStore } from 'pinia'
import clientAPI from '../services/_AxiosConfig'

export const useCategoryStorage = defineStore('categoryStorage', {
  state: () => ({
    category: [],
    loading: false,
    error: null,
  }),
  actions: {
    async getCategory() {
      let category = [] as []
      let loading = true
      this.$patch({ loading: loading })

      try {
        const response = await clientAPI().get('/categories')
        category = response.data ?? []
      } finally {
        loading = false
        this.$patch({ category: category, loading: loading })
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStorage, import.meta.hot))
}
