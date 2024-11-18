<template>
  <!-- add padding at bottom for floating button -->
  <div class="pb-44">
    <NuxtLoadingIndicator color="#5576ff" />

    <div
      id="carbonad"
      class="fixed bottom-4 right-4 z-10"
    />

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
  meta: [...(head.value.meta ?? [])]
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

  if (process.client && window?._carbonads?.init !== undefined) {
    window._carbonads.init(document.getElementById('carbonad'));
  }
});
</script>

<style>
@media (max-width: 768px) {
  .carbon-responsive-wrap {
    display: flex;
    flex-wrap: nowrap !important;
    gap: 4px;
    max-width: 80%;
    margin-left: auto !important;
  }
}
</style>
