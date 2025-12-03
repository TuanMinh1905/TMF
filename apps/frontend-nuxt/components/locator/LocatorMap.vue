<template>
  <ClientOnly>
    <section class="w-full rounded-[16px] overflow-hidden border border-gray-200">
      <div class="p-3 flex items-center gap-2">
        <span class="font-bold text-lg">📍 Gần: </span>
        <button
          class="bg-yellowPetpet text-white px-3 py-1 rounded-md hover:opacity-90"
          @click="getUserLocation"
        >
          Vị trí hiện tại của bạn
        </button>
      </div>

      <div v-if="loading" class="p-4 text-center text-gray-500">
        Đang tải vị trí spa gần bạn...
      </div>

      <div v-else id="map" class="w-full h-[500px]"></div>
    </section>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import { useLocatorStorage } from '~/store/locator'

const locatorStore = useLocatorStorage()
const loading = computed(() => locatorStore.loading)
const userLocation = computed(() => locatorStore.userLocation)
const nearestSpas = computed(() => locatorStore.nearestSpas)

// ✅ Lấy API key từ biến môi trường Nuxt
const apiKey = useRuntimeConfig().public.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY

// ============================
// KHỞI TẠO GOOGLE MAP
// ============================
const initMap = async () => {
  if (!userLocation.value) return
  if (!process.client) return

  try {
    const { setOptions, importLibrary } = await import('@googlemaps/js-api-loader')
    setOptions({ apiKey })

    const { Map } = await importLibrary('maps')
    const { Marker } = await importLibrary('marker')

    const map = new Map(document.getElementById('map') as HTMLElement, {
      center: {
        lat: Number(userLocation.value.latitude),
        lng: Number(userLocation.value.longitude),
      },
      zoom: 14,
    })

    // ✅ Marker vị trí người dùng
    new Marker({
      position: {
        lat: Number(userLocation.value.latitude),
        lng: Number(userLocation.value.longitude),
      },
      map,
      icon: { url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png' },
      title: 'Vị trí của bạn',
    })

    // ✅ Marker spa gần nhất
    nearestSpas.value.forEach((spa: any) => {
      if (!spa.latitude || !spa.longitude) return
      new Marker({
        position: { lat: Number(spa.latitude), lng: Number(spa.longitude) },
        map,
        icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' },
        title: `${spa.name} (${spa.distance ?? '?'} km)`,
      })
    })
  } catch (err) {
    console.error('Lỗi khởi tạo bản đồ:', err)
  }
}

// ============================
// LẤY VỊ TRÍ NGƯỜI DÙNG
// ============================
const getUserLocation = () => {
  if (!process.client) return
  if (!navigator.geolocation) {
    alert('Trình duyệt của bạn không hỗ trợ định vị!')
    return
  }

  locatorStore.loading = true
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude
      locatorStore.userLocation = { latitude: lat, longitude: lng }

      await locatorStore.fetchNearestSpas(lat, lng)
      await initMap()
      locatorStore.loading = false
    },
    (err) => {
      console.error('Lỗi định vị:', err)
      alert('Không thể lấy vị trí của bạn!')
      locatorStore.loading = false
    },
  )
}

// ============================
// ONMOUNTED
// ============================
onMounted(async () => {
  if (!process.client) return

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        locatorStore.userLocation = { latitude: lat, longitude: lng }
        await locatorStore.fetchNearestSpas(lat, lng)
        await initMap()
      },
      async (err) => {
        console.warn('Không thể lấy vị trí thật, fallback HCM:', err)
        const { setOptions, importLibrary } = await import('@googlemaps/js-api-loader')
        setOptions({ apiKey })
        const { Map } = await importLibrary('maps')
        new Map(document.getElementById('map') as HTMLElement, {
          center: { lat: 10.7769, lng: 106.7009 },
          zoom: 12,
        })
      },
    )
  }
})

watch(nearestSpas, () => initMap())
</script>

<style scoped>
#map {
  border-radius: 12px;
}
</style>
