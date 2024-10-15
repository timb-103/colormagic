<template>
  <div class="">
    <NuxtLoadingIndicator color="#5576ff" />

    <UButton
      block
      class="rounded-none border-b"
      variant="soft"
      color="primary"
      label="ColorMagic is now 100% free! Read more >>"
      @click="openModal()"
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

    <!-- free modal -->
    <UModal v-model="isModalOpen">
      <UCard>
        <template #header>
          <p class="font-semibold">
            ColorMagic is now 100% free to use!
          </p>
        </template>
        <p class="mb-4">
          We've just acquired this tool from the previous owners and have decided to make it 100% free to use.
        </p>
        <p class="mb-4">
          If you were a previous subscriber, we've canceled your subscription so there will be no more payments. If you
          require a prorated refund please reach out to us on <a
            class="text-primary underline"
            href="mailto:hello@colormagic.app"
          >hello@colormagic.app</a>.
        </p>
        <p>
          We're going to be making some improvements over the coming future, as well as adding other
          cool free tools for you to use. If you have any suggestions, we'd love to hear them!
        </p>
        <template #footer>
          <div class="flex justify-end">
            <UButton
              label="Close"
              @click="closeModal()"
            />
          </div>
        </template>
      </UCard>
    </UModal>

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

useServerSeoMeta({
  ogUrl: `${siteUrl}${path}`,
  ogType: 'website'
});

const {
  isOpen: isModalOpen,
  open: openModal,
  close: closeModal
} = useModalV2();

onMounted(() => {
  /** @description hack to always set to light mode until we add dark mode properly */
  const colorMode = useLocalStorage('nuxt-color-mode', 'light');
  colorMode.value = 'light';
  document.documentElement.classList.remove('dark');
});
</script>
