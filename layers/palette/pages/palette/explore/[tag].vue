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
          {{ seoTitle }}
        </h1>

        <!-- description-->
        <p class="text-xl font-medium mb-4 max-w-xl">
          {{ $t('explore.seoDescription') }}
        </p>

        <!-- count of palettes generated -->
        <p class="italic text-sm">
          {{ count.toLocaleString() }} {{ tags.join (' ') }} color palettes generated
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
          :filters="filters"
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
      <PaletteTagLinks :links="paletteColorTagLinks" />
      <PaletteTagLinks :links="paletteStyleTagLinks" />
      <PaletteTagLinks :links="paletteToneTagLinks" />
      <PaletteTagLinks :links="paletteSeasonTagLinks" />
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
const tags = computed<string[]>(() => tag.value?.split('-') ?? []);

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

const { data: list, isFetching, hasNextPage, fetchNextPage, suspense } = useListPalettes(100, listFilter);

await suspense();

const palettes = computed(() => list.value?.pages.flatMap((items) => items.items) ?? []);
const count = computed(() => list.value?.pages[0].count ?? 0);

const paletteFilters = getAllPaletteFilters();

const filters = tags.value
  .map(tag => paletteFilters.find(v => tag === v.id))
  .filter(v => v !== undefined);

if (filters.length === 0) {
  throw createError({ statusCode: 404, statusMessage: 'Tag not found.' });
}

const title = computed(() => filters.map(v => v.label[getLocale(locale.value)]).join(' '));
const seoTitle = computed(() => `${title.value} ${t('explore.colorPalettes')}`);
const seoDescription = computed(() => `${title.value} ${t('explore.seoDescription')}`);

const thumbnailUrl = `${useRuntimeConfig().public.siteUrl}/api/og/thumbnail?colors=${filters[0].palette.join(':').replace(/#/g, '')}`;

useSeoMeta({
  title,
  description: seoDescription,
  ogTitle: title,
  ogDescription: seoDescription,
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/api/og/tag?tag=${filters[0]?.id}&text=${title.value}`
});

const paletteColorTagLinks = getPaletteColorFilter().map(v => ({
  label: v.label[getLocale(locale.value)],
  id: v.id,
  to: localePath(`/palette/explore/${v.id}`)
}));

const paletteStyleTagLinks = getPaletteStyleFilter().map(v => ({
  label: v.label[getLocale(locale.value)],
  id: v.id,
  to: localePath(`/palette/explore/${v.id}`)
}));

const paletteToneTagLinks = getPaletteToneFilter().map(v => ({
  label: v.label[getLocale(locale.value)],
  id: v.id,
  to: localePath(`/palette/explore/${v.id}`)
}));

const paletteSeasonTagLinks = getPaletteSeasonFilter().map(v => ({
  label: v.label[getLocale(locale.value)],
  id: v.id,
  to: localePath(`/palette/explore/${v.id}`)
}));
</script>
