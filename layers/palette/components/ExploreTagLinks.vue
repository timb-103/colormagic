<template>
  <div class="space-y-4">
    <PaletteTagLinks :links="colorLinks" />
    <PaletteTagLinks :links="comboLinks" />
  </div>
</template>

<script setup lang="ts">
import { type PaletteFilter } from '~/layers/palette/utils/palette-filters.util';

interface Link {
  label: string
  id: string
  to: string
}

const { t } = useI18n();
const localePath = useLocalePath();

const colorLinks = formatLinks(getAllPaletteFilters());
const comboLinks = formatComboLinks(getPaletteCombos());

function formatComboLinks(links: string[][]): Link[] {
  return links.map(tags => ({
    label: tags.map(v => t(`colors.${v}`)).join(' '),
    to: localePath(`/palette/explore/${tags.join('-')}`),
    id: tags.join('-')
  }));
}

function formatLinks(links: PaletteFilter[]): Link[] {
  return links.map(v => ({
    label: t(`colors.${v.id}`),
    to: localePath(`/palette/explore/${v.id}`),
    id: v.id
  }));
}
</script>
