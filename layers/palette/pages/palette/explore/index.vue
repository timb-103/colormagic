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
      <div class="mb-4 flex justify-between gap-4 items-center flex-wrap">
        <PaletteFilters
          :tags="[]"
          :color-options="paletteFilterOptions.color.value"
          :style-options="paletteFilterOptions.style.value"
          :tone-options="paletteFilterOptions.tone.value"
          :season-options="paletteFilterOptions.season.value"
        />

        <PaletteSortSelectMenu
          :initial-sort-by="sortBy"
          @change="value => sortBy = value"
        />
      </div>

      <ul class="grid sm:grid-cols-3 gap-4">
        <li
          v-for="(item, index) in palettes"
          :key="index"
        >
          <ColorPaletteButton
            :palette-id="item.id"
            :is-liked="item.isLiked ?? false"
            :likes-count="item.likesCount"
            :colors="item.colors"
            :name="item.text"
            :can-like="user?.id !== undefined"
            :to="localePath(`/palette/${item.id}`)"
            no-follow
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
    <div class="space-y-4">
      <PaletteTagLinks :links="paletteFilterOptions.color.value" />
      <PaletteTagLinks :links="paletteFilterOptions.style.value" />
      <PaletteTagLinks :links="paletteFilterOptions.tone.value" />
      <PaletteTagLinks :links="paletteFilterOptions.season.value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PaletteSortBy } from '~/layers/palette/types';

const { t } = useI18n();
const localePath = useLocalePath();

const sortBy = ref<PaletteSortBy>(PaletteSortBy.POPULAR);
const listFilter = computed(() => ({
  sortBy: sortBy.value
}));

const { data: user } = useUser();
const { data: list, isFetching, hasNextPage, fetchNextPage, suspense } = useListPalettes(50, listFilter);
const paletteFilterOptions = usePaletteFilterOptions([]);

await suspense();

const palettes = computed(() => list.value?.pages.flatMap((items) => items.items) ?? []);
const count = computed(() => list.value?.pages[0].count ?? 0);

useSeoMeta({
  title: t('explore.seoTitle'),
  description: t('explore.seoDescription'),
  ogTitle: t('explore.seoTitle'),
  ogDescription: t('explore.seoDescription'),
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/img/og.png`
});
</script>
