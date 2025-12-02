<template>
  <div class="max-w-screen mx-auto w-full overflow-x-hidden">
    <!-- Thanh loading lúc chuyển trang á -->
    <NuxtLoadingIndicator
      :height="4"
      color="white"
      :throttle="120"
      :duration="2500"
      :continuous="true"
    />

    <!-- Splash cho toàn trang -->
    <div
      v-if="!ready"
      class="grid min-h-screen place-items-center"
    >
      <h1 class="font-Longreach text-[100px] font-normal leading-[160%] animate-pulse text-grayTMF">
        TMF
      </h1>
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const ready = ref(false)
onMounted(() => { ready.value = true }) // khi JS mount xong mới render page
</script>
