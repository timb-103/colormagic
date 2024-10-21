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
        v-if="selectedColor"
        icon="i-heroicons-x-mark"
        :to="localePath('/palette/explore')"
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
        v-if="selectedTone"
        icon="i-heroicons-x-mark"
        :to="localePath('/palette/explore')"
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
        v-if="selectedStyle"
        icon="i-heroicons-x-mark"
        :to="localePath('/palette/explore')"
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
        v-if="selectedSeason"
        icon="i-heroicons-x-mark"
        :to="localePath('/palette/explore')"
      />
    </UButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { type PaletteFilter } from '~/layers/palette/utils/palette-filters.util';

export interface Props {
  tag?: string
  filter?: PaletteFilter
}

const props = defineProps<Props>();

const localePath = useLocalePath();
const { locale, t } = useI18n();

const colorLinks = computed(() => [
  /** @description stupid hack for nuxt ui bug */
  {
    label: t('explore.color'),
    id: '',
    to: localePath('/palette/explore')
  },
  ...getPaletteColorFilter().map(v => ({
    label: v.label[getLocale(locale.value)],
    id: v.id,
    to: localePath(`/palette/explore/${v.id}`)
  }))
]);

const toneLinks = computed(() => [
  /** @description stupid hack for nuxt ui bug */
  {
    label: t('explore.tone'),
    id: '',
    to: localePath('/palette/explore')
  },
  ...getPaletteToneFilter().map(v => ({
    label: v.label[getLocale(locale.value)],
    id: v.id,
    to: localePath(`/palette/explore/${v.id}`)
  }))
]);

const styleLinks = computed(() => [
  /** @description stupid hack for nuxt ui bug */
  {
    label: t('explore.style'),
    id: '',
    to: localePath('/palette/explore')
  },
  ...getPaletteStyleFilter().map(v => ({
    label: v.label[getLocale(locale.value)],
    id: v.id,
    to: localePath(`/palette/explore/${v.id}`)
  }))
]);

const seasonLinks = computed(() => [
  /** @description stupid hack for nuxt ui bug */
  {
    label: t('explore.season'),
    id: '',
    to: localePath('/palette/explore')
  },
  ...getPaletteSeasonFilter().map(v => ({
    label: v.label[getLocale(locale.value)],
    id: v.id,
    to: localePath(`/palette/explore/${v.id}`)
  }))
]);

const selectedColor = ref(
  colorLinks.value.find(v => v.id === props.filter?.id) !== undefined
    ? { ...props.filter, label: props.filter?.label[getLocale(locale.value)] }
    : undefined);

const selectedStyle = ref(
  styleLinks.value.find(v => v.id === props.filter?.id) !== undefined
    ? { ...props.filter, label: props.filter?.label[getLocale(locale.value)] }
    : undefined);

const selectedTone = ref(
  toneLinks.value.find(v => v.id === props.filter?.id) !== undefined
    ? { ...props.filter, label: props.filter?.label[getLocale(locale.value)] }
    : undefined);

const selectedSeason = ref(
  seasonLinks.value.find(v => v.id === props.filter?.id) !== undefined
    ? { ...props.filter, label: props.filter?.label[getLocale(locale.value)] }
    : undefined);
</script>
