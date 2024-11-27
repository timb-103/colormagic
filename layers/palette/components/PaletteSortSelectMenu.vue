<template>
  <USelectMenu
    v-model="sortSelected"
    by="id"
    :options="sortOptions"
    :ui-menu="{container: 'min-w-36'}"
    @change="value => $emit('change', value.id)"
  />
</template>

<script setup lang="ts">
import { PaletteSortBy } from '~/layers/palette/types';

export interface Props {
  initialSortBy: PaletteSortBy
}

const props = defineProps<Props>();

defineEmits<(e: 'change', value: PaletteSortBy) => void>();

const sortOptions: Array<{ label: string, id: PaletteSortBy }> = [
  { label: 'Trending', id: PaletteSortBy.TRENDING },
  { label: 'Popular', id: PaletteSortBy.POPULAR },
  { label: 'Recent', id: PaletteSortBy.RECENT }
];

const sortSelected = ref(sortOptions.find(v => v.id === props.initialSortBy));
</script>
