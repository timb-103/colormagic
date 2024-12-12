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
      :sort-by="sortBy"
    />
  </div>
</template>

<script setup lang="ts">
import { PaletteSortBy } from '~/layers/palette/types';

const { t } = useI18n();
const { query } = useRoute();

const sortBy = query?.sort as PaletteSortBy ?? PaletteSortBy.POPULAR;

const { title, description } = useExploreSeo({
  title: t('explore.title'),
  description: t('explore.seoDescription'),
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/img/og.png`
});
</script>
