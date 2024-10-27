<template>
  <div class="flex gap-2 flex-wrap">
    <!-- colors -->
    <UButtonGroup>
      <USelectMenu
        v-model="selectedColor"
        size="sm"
        by="id"
        :placeholder="$t('explore.color')"
        searchable
        :options="colorLinks"
        :popper="{
          placement: 'bottom-start'
        }"
        :ui-menu="{container: 'min-w-36'}"
        @change="value => navigateTo(value.to)"
      />
      <UButton
        v-if="selectedColor && selectedColor.id !== ''"
        icon="i-heroicons-x-mark"
        :to="localePath(mapRemovePath(selectedColor.id))"
      />
    </UButtonGroup>

    <!-- tones -->
    <UButtonGroup>
      <USelectMenu
        v-model="selectedTone"
        size="sm"
        by="id"
        :placeholder="t('explore.tone')"
        searchable
        :options="toneLinks"
        :popper="{
          placement: 'bottom-start'
        }"
        :ui-menu="{container: 'min-w-36'}"
        @change="value => navigateTo(value.to)"
      />
      <UButton
        v-if="selectedTone && selectedTone.id !== ''"
        icon="i-heroicons-x-mark"
        :to="localePath(mapRemovePath(selectedTone.id))"
      />
    </UButtonGroup>

    <!-- style -->
    <UButtonGroup>
      <USelectMenu
        v-model="selectedStyle"
        size="sm"
        by="id"
        :placeholder="t('explore.style')"
        searchable
        :options="styleLinks"
        :popper="{
          placement: 'bottom-start'
        }"
        :ui-menu="{container: 'min-w-36'}"
        @change="value => navigateTo(value.to)"
      />
      <UButton
        v-if="selectedStyle && selectedStyle.id !== ''"
        icon="i-heroicons-x-mark"
        :to="localePath(mapRemovePath(selectedStyle.id))"
      />
    </UButtonGroup>

    <!-- season -->
    <UButtonGroup>
      <USelectMenu
        v-model="selectedSeason"
        size="sm"
        by="id"
        :placeholder="t('explore.season')"
        searchable
        :options="seasonLinks"
        :popper="{
          placement: 'bottom-start'
        }"
        :ui-menu="{container: 'min-w-36'}"
        @change="value => navigateTo(value.to)"
      />
      <UButton
        v-if="selectedSeason && selectedSeason.id !== ''"
        icon="i-heroicons-x-mark"
        :to="localePath(mapRemovePath(selectedSeason.id))"
      />
    </UButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { type PaletteFilter } from '~/layers/palette/utils/palette-filters.util';

export interface Props {
  filters?: PaletteFilter[]
}

export interface FilterLink {
  label: string
  id: string
  to: string
}

const props = defineProps<Props>();

const { params } = useRoute();
const tag = computed(() => typeof params.tag === 'string' ? params.tag : undefined);

const tags = computed<string[]>(() => {
  return tag.value?.split('-') ?? [];
});

const localePath = useLocalePath();
const { locale, t } = useI18n();

const colorFilters = getPaletteColorFilter();
const toneFilters = getPaletteToneFilter();
const styleFilters = getPaletteStyleFilter();
const seasonFilters = getPaletteSeasonFilter();

const colorLinks = computed(() => [
  /** @description stupid hack for nuxt ui bug */
  {
    label: t('explore.color'),
    id: '',
    to: localePath('/palette/explore')
  },
  ...colorFilters.map(v => ({
    label: v.label[getLocale(locale.value)],
    id: v.id,
    to: mapToPath(v.id, tags.value, colorFilters)
  }))
]);

const toneLinks = computed(() => [
  /** @description stupid hack for nuxt ui bug */
  {
    label: t('explore.tone'),
    id: '',
    to: localePath('/palette/explore')
  },
  ...toneFilters.map(v => ({
    label: v.label[getLocale(locale.value)],
    id: v.id,
    to: mapToPath(v.id, tags.value, toneFilters)
  }))
]);

const styleLinks = computed(() => [
  /** @description stupid hack for nuxt ui bug */
  {
    label: t('explore.style'),
    id: '',
    to: localePath('/palette/explore')
  },
  ...styleFilters.map(v => ({
    label: v.label[getLocale(locale.value)],
    id: v.id,
    to: mapToPath(v.id, tags.value, styleFilters)
  }))
]);

const seasonLinks = computed(() => [
  /** @description stupid hack for nuxt ui bug */
  {
    label: t('explore.season'),
    id: '',
    to: localePath('/palette/explore')
  },
  ...seasonFilters.map(v => ({
    label: v.label[getLocale(locale.value)],
    id: v.id,
    to: mapToPath(v.id, tags.value, seasonFilters)
  }))
]);

const selectedColor = ref(findFilter(colorLinks.value));
const selectedStyle = ref(findFilter(styleLinks.value));
const selectedTone = ref(findFilter(toneLinks.value));
const selectedSeason = ref(findFilter(seasonLinks.value));

function mapToPath(id: string, tags: string[], filters: PaletteFilter[]): string {
  const pathTags = [...tags];
  const existingTagIndex = pathTags.findIndex(tag => filters.some(filter => filter.id === tag));

  if (existingTagIndex >= 0) {
    pathTags[existingTagIndex] = id;
  } else {
    pathTags.push(id);
  }

  const tagPath = localePath(`/palette/explore/${pathTags.join('-')}`);

  return tagPath;
}

function mapRemovePath(id?: string): string {
  if (id === undefined) {
    return `/palette/explore/${tags.value.join('-')}`;
  }

  const tagsNew = tags.value.filter(v => v !== id);
  if (tags.value.length === 0 || tagsNew.length === 0) {
    return '/palette/explore';
  }

  return `/palette/explore/${tagsNew.join('-')}`;
}

function findFilter(links: FilterLink[]): FilterLink | undefined {
  const index = links.findIndex(v => props.filters?.some(x => x.id === v.id));

  if (index >= 0) {
    return {
      ...links[index],
      label: links[index].label
    };
  }
}
</script>
