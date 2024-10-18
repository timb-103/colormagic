<template>
  <div>
    <!-- header-->
    <div class="mb-8">
      <!-- title -->
      <h1>
        {{ $t('api.title') }}
      </h1>

      <!-- description-->
      <p class="text-xl font-medium mb-4 max-w-xl">
        {{ description }}
      </p>
    </div>

    <!-- get color palette -->
    <div class="mb-4 space-y-2">
      <p class="font-semibold">
        [GET] color palette:
      </p>
      <pre class="border bg-gray-50 rounded-sm px-1">{{ getPaletteUrl }}</pre>
    </div>

    <!-- list color palettes -->
    <div class="mb-4 space-y-2">
      <p class="font-semibold">
        [POST] list color palettes:
      </p>
      <pre class="border bg-gray-50 rounded-sm px-1">{{ listPalettesUrl }}</pre>
      <pre class="border bg-gray-50 rounded-sm px-1 text-sm">body: { "page": number, "size": number }</pre>
    </div>

    <!-- create color palette -->
    <div class="mb-4 space-y-2">
      <p class="font-semibold">
        [POST] create color palette:
      </p>
      <pre class="border bg-gray-50 rounded-sm px-1">{{ createPaletteUrl }}</pre>
      <pre class="border bg-gray-50 rounded-sm px-1 text-sm">body: { "prompt": string }</pre>
    </div>

    <UAlert
      class="mt-8"
      color="yellow"
      variant="subtle"
      title="Disclaimer"
      :description="$t('api.disclaimer')"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const title = t('api.seoTitle');
const description = t('api.seoDescription');

const { apiUrl } = useRuntimeConfig().public;
const getPaletteUrl = `${apiUrl}/palette/{paletteId}`;
const listPalettesUrl = `${apiUrl}/palette/list`;
const createPaletteUrl = `${apiUrl}/palette/create`;

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/img/og.png`
});
</script>
