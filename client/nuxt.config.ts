import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Kuningan Sitewell",
      meta: [
        { name: "description", content: "Kuningan Sitewell Monitoring" }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      ]
    }
  },
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [      
      tailwindcss(),    
    ],
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'motion-v/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || '/api',
      telegramGroupLink: process.env.TELEGRAM_GROUP_LINK || ''
    }
  },
})