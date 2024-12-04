<template>
  <div>
    <!-- header-->
    <ExploreTagHeader
      :title="title"
      :description="description"
      :palette="palette"
    />

    <!-- palettes -->
    <ExplorePalettes
      :tags="tags ?? []"
    />
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute();

const filters = getAllPaletteFilters();

const tag = ref(typeof params.tag === 'string' ? params.tag : undefined);
const tags = filters.filter(v => tag.value?.includes(v.id)).map(v => v.id);

const palette = filters.find(v => v.id === tags[0])?.palette ?? undefined;

const { title, description } = useExploreSeo({ tags });
</script>
