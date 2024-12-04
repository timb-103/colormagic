<template>
  <div>
    <!-- header-->
    <div class="mb-8">
      <!-- title -->
      <h1>
        {{ $t('exploreTags.title') }}
      </h1>

      <!-- description-->
      <p class="text-xl font-medium mb-4 max-w-xl">
        {{ $t('exploreTags.seoDescription') }}
      </p>
    </div>

    <!-- tag links -->
    <ExploreTagLinks />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: t('exploreTags.seoTitle'),
  description: t('exploreTags.seoDescription'),
  ogTitle: t('exploreTags.seoTitle'),
  ogDescription: t('exploreTags.seoDescription'),
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/img/og.png`
});
</script>
