<template>
  <div class="space-y-4">
    <PaletteTagLinks :links="colorLinks" />
    <PaletteTagLinks :links="styleLinks" />
    <PaletteTagLinks :links="toneLinks" />
    <PaletteTagLinks :links="seasonLinks" />
    <!-- <PaletteTagLinks :links="comboLinks" /> -->
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

const colorLinks = formatLinks(getPaletteColorFilter());
const toneLinks = formatLinks(getPaletteToneFilter());
const styleLinks = formatLinks(getPaletteStyleFilter());
const seasonLinks = formatLinks(getPaletteSeasonFilter());
// const comboLinks = formatLinks(getPaletteCombosFilter());

function formatLinks(links: PaletteFilter[]): Link[] {
  return links.map(v => ({
    label: t(`colors.${v.id}`),
    to: localePath(`/palette/explore/${v.id}`),
    id: v.id
  }));
}
</script>
