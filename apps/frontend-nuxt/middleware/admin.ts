// Middleware bảo vệ route admin - chỉ cho ADMIN vào
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Chỉ chạy ở client
  if (import.meta.server) return

  const { useAuthStore } = await import('~/store/auth')
  const authStore = useAuthStore()

  // Nếu chưa có user trong store nhưng có token, fetch user
  if (!authStore.user && authStore.accessToken) {
    await authStore.fetchMe()
  }

  // Nếu chưa login
  if (!authStore.isLoggedIn) {
    return navigateTo('/login')
  }

  // Nếu đã login nhưng không phải ADMIN
  if (!authStore.isAdmin) {
    return navigateTo('/')
  }

  // Cho phép vào
})
