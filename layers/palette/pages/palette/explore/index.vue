<template>
  <div>
    <!-- header-->
    <ExploreTagHeader
      :title="title"
      :description="description"
    />

    <!-- palettes -->
    <ExplorePalettes
      :tags="[]"
    />

    <!-- tag links -->
    <p class="font-semibold mt-8 mb-4">
      {{ $t('explore.byTag') }}
    </p>
    <div class="space-y-4">
      <PaletteTagLinks :links="paletteFilterOptions.color.value" />
      <PaletteTagLinks :links="paletteFilterOptions.style.value" />
      <PaletteTagLinks :links="paletteFilterOptions.tone.value" />
      <PaletteTagLinks :links="paletteFilterOptions.season.value" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const paletteFilterOptions = usePaletteFilterOptions([]);

const { title, description } = useExploreSeo({
  title: t('explore.title'),
  description: t('explore.seoDescription'),
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/img/og.png`
});
</script>
