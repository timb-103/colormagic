<template>
  <div>
    <!-- header-->
    <div class="mb-8 flex flex-col sm:flex-row gap-8">
      <img
        v-if="palette !== undefined"
        :src="thumbnailUrl"
        width="150px"
        height="150px"
        class="max-w-20 sm:max-w-full rounded-xl"
      >

      <div>
        <!-- title -->
        <h1 class="capitalize">
          {{ title }}
        </h1>

        <!-- description-->
        <p class="text-xl font-medium mb-4 max-w-xl">
          {{ description }}
        </p>
      </div>
    </div>

    <!-- ads -->
    <div class="mb-4">
      <CarbonAds />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  title: string
  description: string
  tags?: string[]
}

const props = defineProps<Props>();

const tagsString = props.tags?.join('-');
const palette = getAllPaletteFilters().find(v => tagsString?.includes(v.id))?.palette;

const colorsHexFormatted = palette?.join(':').replace(/#/g, '');

const thumbnailBaseUrl = `${useRuntimeConfig().public.siteUrl}/api/og/thumbnail.png`;
const thumbnailUrl = `${thumbnailBaseUrl}?colors=${colorsHexFormatted}`;
</script>
