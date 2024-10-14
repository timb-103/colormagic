export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/img/icon.svg' },
        { rel: 'apple-touch-icon', href: '/img/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ],
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'bingbot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { property: 'og:site_name', content: 'ColorMagic' },
        { property: 'og:image', content: '/img/og.png' }
      ]
    }
  },
  css: [
    '@/assets/css/global.css'
  ],
  colorMode: {
    preference: 'light'
  },
  modules: [
    '@nuxtjs/google-fonts',
    'nuxt-og-image',
    '@nuxt/ui'
  ],
  tailwindcss: {
    viewer: false
  },
  site: {
    url: 'https://colormagic.app'
  },
  nitro: {
    compressPublicAssets: true
  },
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700, 800, 900]
    },
    display: 'swap'
  },
  typescript: {
    typeCheck: 'build'
  },
  runtimeConfig: {
    nodeEnv: process.env.NODE_ENV,
    logLevel: process.env.LOG_LEVEL ?? 'debug'
  },
  routeRules: {

  },
  compatibilityDate: '2024-09-23'
});
