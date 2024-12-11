<template>
  <div>
    <h2 class="font-semibold text-lg">
      {{ $t('shade.palettes', { color: tagsTranslated.join(' ').toLowerCase() }) }}
    </h2>

    <ExplorePalettes
      :tags="tags"
      :limit="6"
      is-filters-hidden
      is-pagination-hidden
    />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  tagsTranslated: string[]
  tags: string[]
}

defineProps<Props>();
</script>
