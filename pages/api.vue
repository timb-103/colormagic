<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Header -->
    <div class="mb-8 space-y-4">
      <!-- Title -->
      <h1 class="text-3xl md:text-4xl font-bold">
        {{ $t("api.title") }}
      </h1>

      <!-- Description -->
      <p class="text-lg md:text-xl font-medium max-w-xl">
        {{ description }}
      </p>
    </div>

    <!-- API Endpoints Section -->
    <div class="space-y-8">
      <!-- GET Color Palette -->
      <div class="space-y-2">
        <p class="font-semibold text-base md:text-lg">
          [GET] color palette:
        </p>
        <pre
          class="border bg-gray-50 rounded-lg p-3 overflow-x-auto text-sm md:text-base"
        >{{ getPaletteUrl }}</pre>
      </div>

      <!-- POST List Color Palettes -->
      <div class="space-y-2">
        <p class="font-semibold text-base md:text-lg">
          [POST] list color palettes:
        </p>
        <pre
          class="border bg-gray-50 rounded-lg p-3 overflow-x-auto text-sm md:text-base"
        >{{ listPalettesUrl }}</pre>
        <pre
          class="border bg-gray-50 rounded-lg p-3 overflow-x-auto text-xs md:text-sm"
        >body: { "page": number, "size": number }</pre>
      </div>

      <!-- POST Create Color Palette -->
      <div class="space-y-2">
        <p class="font-semibold text-base md:text-lg">
          [POST] create color palette:
        </p>
        <pre
          class="border bg-gray-50 rounded-lg p-3 overflow-x-auto text-sm md:text-base"
        >{{ createPaletteUrl }}</pre>
        <pre
          class="border bg-gray-50 rounded-lg p-3 overflow-x-auto text-xs md:text-sm"
        >body: { "prompt": string }</pre>
      </div>
    </div>

    <!-- Disclaimer Alert -->
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
