<template>
  <div>
    <!-- header-->
    <div class="mb-8 flex flex-col sm:flex-row gap-8">
      <img
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
          {{ $t('explore.seoDescription') }}
        </p>

        <!-- count of palettes generated -->
        <p class="italic text-sm">
          {{ count.toLocaleString() }} {{ tags.join(' ').replace(/-/g, ' ') }} color palettes generated
        </p>
      </div>
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
          :tags="tags"
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
  </div>
</template>

<script setup lang="ts">
import { PaletteSortBy } from '~/layers/palette/types';
import { type ListPaletteFilterParams } from '~/layers/palette/composables/palette.composable';

const { t } = useI18n();
const localePath = useLocalePath();
const { locale } = useI18n();
const { params } = useRoute();

const tag = ref(typeof params.tag === 'string' ? params.tag : undefined);

/** @description filters must be sorted in same order as tags for titles and links to work properly */
const filters = getAllPaletteFilters()
  .filter(v => tag.value?.includes(v.id))
  .sort((a, b) => {
    const indexA = tag.value?.indexOf(a.id) ?? -1;
    const indexB = tag.value?.indexOf(b.id) ?? -1;
    return indexA - indexB;
  });

const tags = computed<string[]>(() => filters.map(v => v.id));
const sortBy = ref<PaletteSortBy>(PaletteSortBy.POPULAR);
const listFilter = computed<ListPaletteFilterParams | undefined>(() =>
  tag.value !== undefined
    ? {
        tags: tags.value,
        sortBy: sortBy.value
      }
    : undefined
);

const { data: user } = useUser();
const { data: list, isFetching, hasNextPage, fetchNextPage, suspense } = useListPalettes(50, listFilter);
const paletteFilterOptions = usePaletteFilterOptions(tags.value);

await suspense();

const palettes = computed(() => list.value?.pages.flatMap((items) => items.items) ?? []);
const count = computed(() => list.value?.pages[0].count ?? 0);

if (filters.length === 0) {
  throw createError({ statusCode: 404, statusMessage: 'Tag not found.' });
}

const title = computed(() => `${filters.map(v => v.label[getLocale(locale.value)]).join(' ')} ${t('explore.colorPalettes')}`);
const seoTitle = computed(() => `${title.value} - ColorMagic`);
const seoDescription = computed(() => `${title.value} ${t('explore.seoDescription')}`);

const thumbnailUrl = `${useRuntimeConfig().public.siteUrl}/api/og/thumbnail?colors=${filters[0].palette.join(':').replace(/#/g, '')}`;

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/api/og/tag?tag=${filters[0]?.id}&text=${title.value}`,
  robots: {
    noindex: tags.value.length > 2,
    nofollow: tags.value.length > 2
  }
});
</script>
