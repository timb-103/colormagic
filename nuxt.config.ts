import { getPaletteColorFilter } from './layers/palette/utils/palette-filters.util';

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
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap'
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
      siteUrl: process.env.SITE_URL ?? 'http://localhost:3000',
      apiUrl: process.env.SITE_URL !== undefined
        ? `${process.env.SITE_URL}/api`
        : 'http://localhost:3000/api'
    }
  },
  site: {
    url: process.env.SITE_URL ?? 'http://localhost:3000',
    name: process.env.SITE_NAME ?? 'ColorMagic'
  },
  sitemap: {
    /** @description include all translations in sitemap */
    urls: getPaletteColorFilter()
      .map(v => [
        `/palette/explore/${v.id}`,
        `/ja/palette/explore/${v.id}`,
        `/it/palette/explore/${v.id}`
      ])
      .flat()
  },
  nitro: {
    prerender: {
      crawlLinks: true
    }
  },
  routeRules: {
    /** @description add cache time for images to make pagespeed insights happy */
    '/_nuxt/**': { headers: { 'cache-control': 'max-age=31536000' } },
    '/img/**': { headers: { 'cache-control': 'max-age=31536000' } },

    /** @description prerender all pages */
    '/*': { prerender: true },

    /** @description don't prerender because they are dynamically created */
    '/*/palette/**': { prerender: false },
    '/palette/**': { prerender: false }
  },
  compatibilityDate: '2024-09-23',
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    baseUrl: process.env.SITE_URL ?? 'http://localhost:3000',
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        flag: '🇬🇧'
      },
      {
        code: 'ja',
        language: 'ja-JP',
        name: 'Japanese',
        flag: '🇯🇵'
      },
      {
        code: 'it',
        language: 'it-IT',
        name: 'Italian',
        flag: '🇮🇹'
      }
    ]
  }
});
