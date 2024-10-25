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
          {{ count.toLocaleString() }} {{ tag }} color palettes generated
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
      <div class="mb-4">
        <PaletteFilters
          :tag="tag"
          :filter="filter"
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
    <PaletteTagLinks :links="paletteTagLinks" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const { locale } = useI18n();
const { params } = useRoute();
const tag = ref(typeof params.tag === 'string' ? params.tag : undefined);

const listFilter = tag.value !== undefined
  ? { tag: tag.value }
  : undefined;

const { data: user } = useUser();

const { data: list, isFetching, hasNextPage, fetchNextPage, suspense } = useListPalettes(100, listFilter);

await suspense();

const palettes = computed(() => list.value?.pages.flatMap((items) => items.items) ?? []);
const count = computed(() => list.value?.pages[0].count ?? 0);

const filter = getAllPaletteFilters().find(v => v.id === tag.value);

if (filter === undefined) {
  throw createError({ statusCode: 404, statusMessage: 'Tag not found.' });
}

const title = computed(() => `${filter?.label[getLocale(locale.value)] ?? 'Loading...'} ${t('explore.colorPalettes')}`);
const seoTitle = computed(() => `${filter?.label[getLocale(locale.value)] ?? 'Loading...'} ${t('explore.colorPalettes')}`);
const seoDescription = computed(() => `${filter?.label[getLocale(locale.value)] ?? 'Loading...'} - ${t('explore.seoDescription')}`);

const thumbnailUrl = `${useRuntimeConfig().public.siteUrl}/api/og/thumbnail?colors=${filter.palette.join(':').replace(/#/g, '')}`;

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/api/og/tag?tag=${filter?.id}&text=${filter?.label[getLocale(locale.value)]}`
});

const paletteTagLinks = getPaletteColorFilter().map(v => ({
  label: v.label[getLocale(locale.value)],
  id: v.id,
  to: localePath(`/palette/explore/${v.id}`)
}));
</script>
