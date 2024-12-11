<template>
  <div>
    <h2 class="font-semibold text-lg">
      {{ $t('shade.similarPalette') }}
    </h2>

    <!-- palettes -->
    <div class="mt-4">
      <ul class="grid sm:grid-cols-3 gap-4 mb-4">
        <li
          v-for="(item, index) in links"
          :key="index"
        >
          <ColorPaletteButton
            :colors="item.palette"
            :name="$t(`colors.${item.id}`)"
            :to="localePath(`/palette/explore/${item.id}`)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  tags: string[]
}

const props = defineProps<Props>();

const localePath = useLocalePath();

const links = getAllPaletteFilters().filter(v => props.tags.some(y => v.id === y));
</script>
