<template>
  <!-- add padding at bottom for floating button -->
  <div>
    <NuxtLoadingIndicator color="#5576ff" />

    <!-- floating bottom ad -->
    <!-- <div
      class="fixed bottom-4 left-4 z-10"
    >
      <CarbonAds />
    </div> -->

    <!-- <a
      href="https://colormagic.canny.io/feature-requests"
      target="_blank"
      class="w-full flex justify-center sticky top-0 z-10 border-b border-gray-200 px-4 py-2 bg-gray-50 hover:bg-gray-100"
    >
      <p class="text-sm">
        ❤️ ColorMagic? <span class="text-blue-400">Suggest a feature</span>
      </p>
    </a> -->

    <!-- header banner ad (codefast) -->
    <!-- <div
      class="w-full flex justify-center sm:sticky top-0 z-10"
    >
      <HeaderAd
        logo-url="/img/ads/codefast.png"
        name="CodeFast"
        text="Learn to code in weeks, not months. 50% off sale ends soon."
        cta="Get instant access"
        to="https://codefa.st/?via=colormagic"
      />
    </div> -->

    <!-- sticky bottom center banner ad (codefast) -->
    <!-- <div
      class="fixed bottom-8 z-10 w-full flex justify-center pointer-events-none px-4"
    >
      <div class="pointer-events-auto">
        <BannerAd
          logo-url="/img/ads/codefast.png"
          name="CodeFast"
          text="Learn to code in weeks, not months. 50% off sale ends soon."
          cta="Get instant access"
          to="https://codefa.st/?via=colormagic"
        />
      </div>
    </div> -->

    <!-- nav -->
    <CommonNav />

    <!-- content -->
    <main>
      <div class="max-w-3xl mx-auto px-4 pt-8">
        <slot />
      </div>
    </main>

    <!-- footer -->
    <CommonFooter />

    <!-- <CarbonAdsFlexBar /> -->

    <div class="hidden sm:flex">
      <CarbonAdsStickyBar />
    </div>

    <!-- global notifications -->
    <UNotifications>
      <template #description="{ description }">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="description" />
      </template>
    </UNotifications>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';

const { siteUrl } = useRuntimeConfig().public;
const { path } = useRoute();

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
});

useHead({
  htmlAttrs: {
    lang: head.value.htmlAttrs.lang
  },
  link: [...(head.value.link ?? [])],
  meta: [...(head.value.meta ?? [])],
  script: [
    // { 'data-grow-initializer': '', children: '!(function(){window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));var e=document.createElement("script");(e.type="text/javascript"),(e.src="https://faves.grow.me/main.js"),(e.defer=!0),e.setAttribute("data-grow-faves-site-id","U2l0ZTplMzFkMDUxNC0zOWE2LTRjZDMtOTE3NS0xNDEzMDBiNDRkMmU=");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();' }
    // { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6330271543159498', crossorigin: 'anonymous', async: true }
  ]
});

useServerSeoMeta({
  ogUrl: `${siteUrl}${path}`,
  ogType: 'website'
});

onMounted(() => {
  /** @description hack to always set to light mode until we add dark mode properly */
  const colorMode = useLocalStorage('nuxt-color-mode', 'light');
  colorMode.value = 'light';
  document.documentElement.classList.remove('dark');
});
</script>

<style>
#grow-me-root {
  display: none;
}
</style>
