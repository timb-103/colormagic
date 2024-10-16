<template>
  <div class="">
    <NuxtLoadingIndicator color="#5576ff" />

    <!-- donate button -->
    <UButton
      block
      class="rounded-none border-b"
      variant="soft"
      color="primary"
      :label="$t('bannerLabel')"
      @click="donateClicked()"
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

    <!-- floating donate button -->
    <CommonFloatingButton />

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
import { PlausibleEventName } from '~/layers/plausible/types';

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

function donateClicked(): void {
  void navigateTo(useRuntimeConfig().public.stripeDonatePaymentUrl, { external: true });
  sendPlausibleEvent(PlausibleEventName.DONATE_BUTTON_BANNER_CLICKED);
}

onMounted(() => {
  /** @description hack to always set to light mode until we add dark mode properly */
  const colorMode = useLocalStorage('nuxt-color-mode', 'light');
  colorMode.value = 'light';
  document.documentElement.classList.remove('dark');
});
</script>
