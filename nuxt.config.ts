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
        { name: 'googlebot', content: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'bingbot', content: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { property: 'og:site_name', content: 'ColorMagic' }
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
  modules: ['@nuxtjs/google-fonts', '@nuxt/ui', '@nuxtjs/i18n', 'nuxt-gtag', '@nuxtjs/plausible', '@nuxtjs/sitemap'],
  site: {
    url: 'https://colormagic.app.com',
    name: 'ColorMagic'
  },
  gtag: {
    id: 'G-HPJXMCVC3V'
  },
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
      nodeEnv: process.env.NODE_ENV,
      siteUrl: process.env.SITE_URL ?? 'http://localhost:3000',
      apiUrl: process.env.SITE_URL !== undefined
        ? `${process.env.SITE_URL}/api`
        : 'http://localhost:3000/api',
      carbonAdsScriptUrl: process.env.CARBONADS_SCRIPT ?? ''
    }
  },
  routeRules: {
    /** @description add cache time for images to make pagespeed insights happy */
    '/_nuxt/**': { headers: { 'cache-control': 'max-age=31536000' } },
    '/img/**': { headers: { 'cache-control': 'max-age=31536000' } },
    '/favorites': { redirect: { to: '/palette/liked', statusCode: 301 } },
    '/history': { redirect: { to: '/palette/liked', statusCode: 301 } }
  },
  compatibilityDate: '2024-09-23',
  i18n: {
    lazy: true,
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    baseUrl: process.env.SITE_URL ?? 'http://localhost:3000',
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        flag: '🇬🇧',
        file: 'i18n/locales/en-US.ts'
      },
      {
        code: 'ja',
        language: 'ja-JP',
        name: 'Japanese',
        flag: '🇯🇵',
        file: 'i18n/locales/ja-JP.ts'
      },
      {
        code: 'it',
        language: 'it-IT',
        name: 'Italian',
        flag: '🇮🇹',
        file: 'i18n/locales/it-IT.ts'
      }
    ]
  }
});
