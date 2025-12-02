// Plugin khởi tạo auth state từ localStorage khi app load
export default defineNuxtPlugin(async () => {
  // Chỉ chạy ở client
  if (import.meta.server) return

  const { useAuthStore } = await import('~/store/auth')
  const authStore = useAuthStore()

  // Khởi tạo từ localStorage
  authStore.init()
})
