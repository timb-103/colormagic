<template>
  <div>
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

const localePath = useLocalePath();

export interface Props {
  tags: string[]
}

const props = defineProps<Props>();

const sortBy = ref<PaletteSortBy>(props.tags.length === 0 ? PaletteSortBy.TRENDING : PaletteSortBy.POPULAR);
const listFilter = computed<ListPaletteFilterParams | undefined>(() => ({
  tags: props.tags.length > 0 ? props.tags : undefined,
  sortBy: sortBy.value
}));

const { data: user } = useUser();
const { data: list, isFetching, hasNextPage, fetchNextPage, suspense } = useListPalettes(50, listFilter);
const paletteFilterOptions = usePaletteFilterOptions(props.tags);

await suspense();

const palettes = computed(() => list.value?.pages.flatMap((items) => items.items) ?? []);
</script>
