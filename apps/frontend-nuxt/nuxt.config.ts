export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
  ],

  ssr: false, // tắt đi để build web tĩnh, build ssr tốn xiền :v

  components: [
    { path: "~/components", pathPrefix: false },
    { path: "~/components/base", pathPrefix: false },
    { path: "~/components/layout", prefix: "Layout", pathPrefix: false },
    {
      path: "~/components/banner",
      prefix: "Banner",
      pathPrefix: false,
      global: true,
    },
    {
      path: "~/components/banner/item",
      prefix: "BannerItem",
      pathPrefix: false,
      global: true,
    },
    { path: "~/components/filter", prefix: "Filter", pathPrefix: false },
    { path: "~/components/brand", prefix: "Brand", pathPrefix: false },
    { path: "~/components/introduce", prefix: "Introduce", pathPrefix: false },
  ],

  imports: {
    dirs: ["siuFolder", "utils", "composables"],
  },

  devtools: { enabled: true },

  app: {
    baseURL: "/",
    head: {
      title: "TMF",
      htmlAttrs: {
        lang: "vi",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
    },
  },

  css: ["~/assets/font.css", "~/assets/tailwind.css"],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3000/api",
    },
  },

  routeRules: {
    // Nuxt cache HTML/response của route đó. Trong 300s tiếp theo,
    // mọi request sẽ nhận bản cache ngay. Khi hết 300s,
    // request kế tiếp vẫn nhận bản cũ (stale) nhưng Nuxt tái tạo trang ở hậu trường; các request sau đó sẽ nhận bản mới
    // ['/']: { swr: 300 }, // Đây là cơ chế ISR kiểu Nuxt

    // SSG - các trang tĩnh, chỉ build 1 lần rồi dùng mãi mãi
    "/p/**": { swr: 300 },

    "/blog/**": { swr: 300 },
  },

  // nitro: {
  //   preset: 'firebase',
  //   firebase: {
  //     gen: 2,
  //     httpsOptions: {
  //       region: 'asia-southeast1',
  //       maxInstances: 1,
  //       emulatorPort:
  //         process.env.NUXT_ENV_FUNCTIONS === 'local' ? 5001 : undefined,
  //     },
  //   },
  //   output: {
  //     dir: '.output',
  //   },
  // },

  baseURL: "/",

  i18n: {
    defaultLocale: "vi",
    strategy: "prefix_except_default", // /path (vi), /en/path (en)
    lazy: true, // tách gói, tải động file ngôn ngữ
    langDir: "locales", // thư mục chứa JSON
    detectBrowserLanguage: {
      cookieKey: "i18n_redirected",
      useCookie: true,
      redirectOn: "root", // chỉ redirect ở trang root
      alwaysRedirect: false,
    },

    locales: [
      { code: "vi", iso: "vi-VN", file: "vi.json", name: "Tiếng Việt" },
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
    ],
  },

  // devServer thì là đổi port chạy ở local. Còn để server thì là
  server: {
    port: 3100,
  },

  compatibilityDate: "2025-11-13",

  siu: {}, // siu sẽ không có tác dụng gì vì nó không nằm trong các thuộc tính của NuxtConFig
});
