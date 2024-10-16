export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
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
        { property: 'og:site_name', content: 'ColorMagic' }
      ],
      script: [
        { src: 'https://plausible.io/js/plausible.js', defer: true, 'data-domain': 'pallyy.com' }
      ]
    }
  },
  css: [
    '@/assets/css/global.css'
  ],
  colorMode: {
    preference: 'light'
  },
  extends: [
    '@nuxt/ui-pro'
  ],
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/ui',
    '@nuxtjs/plausible',
    '@nuxtjs/i18n'
  ],
  tailwindcss: {
    viewer: false
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
    logLevel: process.env.LOG_LEVEL ?? 'debug',
    public: {
      siteUrl: process.env.SITE_URL ?? 'https://colormagic.app'
    }
  },
  routeRules: {
    /** @description add cache time for images to make pagespeed insights happy */
    '/_nuxt/**': { headers: { 'cache-control': 'max-age=31536000' } },
    '/img/**': { headers: { 'cache-control': 'max-age=31536000' } }
  },
  compatibilityDate: '2024-09-23',
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    baseUrl: process.env.SITE_URL ?? 'https://colormagic.app',
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'en',
        language: 'en-US'
      },
      {
        code: 'ja',
        language: 'ja-JP'
      },
      {
        code: 'it',
        language: 'it-IT'
      }
    ]
  }
});
