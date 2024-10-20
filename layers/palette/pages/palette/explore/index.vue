<template>
  <div>
    <!-- header-->
    <div class="mb-8">
      <!-- title -->
      <h1>
        {{ $t('explore.title') }}
      </h1>

      <!-- description-->
      <p class="text-xl font-medium mb-4 max-w-xl">
        {{ $t('explore.seoDescription') }}
      </p>

      <!-- count of palettes generated -->
      <p class="italic text-sm">
        {{ count.toLocaleString() }} public color palettes generated
      </p>
    </div>

    <!-- loading skeletons -->
    <div v-if="!palettes">
      <ul class="grid sm:grid-cols-3 gap-4">
        <li
          v-for="index in 6"
          :key="index"
        >
          <USkeleton class="w-full h-24" />
        </li>
      </ul>
    </div>

    <!-- palettes -->
    <div v-if="palettes">
      <!-- filters -->
      <div class="mb-4">
        <PaletteFilters :tag="tag" />
      </div>

      <ul class="grid sm:grid-cols-3 gap-4">
        <li
          v-for="(item, index) in palettes"
          :key="index"
        >
          <ColorPaletteButton
            :colors="item.colors"
            :name="item.text"
            :to="localePath(`/palette/${item.id}`)"
          />
        </li>
      </ul>

      <!-- load more button -->
      <div class="mt-8 text-center">
        <UButton
          v-if="palettes.length"
          :label="hasNextPage ? 'Load more...' : 'No more results'"
          :disabled="!hasNextPage"
          :loading="isFetching"
          @click="fetchNextPage"
        />
      </div>
    </div>

    <!-- tag links -->
    <p class="font-semibold mt-8 mb-4">
      {{ $t('explore.byTag') }}
    </p>
    <PaletteTagLinks :links="paletteTagLinks" />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();

const { data: list, isFetching, hasNextPage, fetchNextPage, suspense } = useListPalettes(100);

await suspense();

const { params } = useRoute();
const tag = ref(typeof params.tag === 'string' ? params.tag : undefined);

const palettes = computed(() => list.value?.pages.flatMap((items) => items.items));
const count = computed(() => list.value?.pages[0].count ?? 0);

useSeoMeta({
  title: t('explore.seoTitle'),
  description: t('explore.seoDescription'),
  ogTitle: t('explore.seoTitle'),
  ogDescription: t('explore.seoDescription'),
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/img/og.png`
});

const paletteTagLinks = getPaletteColorFilter().map(v => ({
  label: v.label[getLocale(locale.value)],
  id: v.id,
  to: localePath(`/palette/explore/${v.id}`)
}));
</script>
