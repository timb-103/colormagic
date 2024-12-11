<template>
  <div>
    <!-- header-->
    <div class="mb-8">
      <!-- title -->
      <h1>
        {{ $t('shades.title') }}
      </h1>

      <!-- description-->
      <p class="text-xl font-medium mb-4 max-w-xl">
        {{ description }}
      </p>
    </div>

    <ul class="flex flex-col gap-2">
      <li
        v-for="(item, index) in tags"
        :key="index"
      >
        <NuxtLinkLocale
          :to="`/shades/${item}`"
          class="text-blue-400 underline"
        >
          {{ $t('shade.title', { color: item.split('-').map(v => t(`colors.${v}`)).join(' ') }) }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const title = t('shades.seoTitle');
const description = t('shades.seoDescription');

const tags = [
  'yellow',
  'light-yellow',
  'sage',
  'cream'
];

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/img/og.png`
});
</script>
