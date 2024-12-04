<template>
  <div>
    <!-- header-->
    <ExploreTagHeader
      :title="title"
      :description="description"
      :tags="tags"
      :palette="palette"
    />

    <!-- palettes -->
    <ExplorePalettes
      :tags="tags"
    />
  </div>
</template>

<script setup lang="ts">
const tags = ['royal'];
const palette = ['#4169E1', '#4682B4', '#000080', '#6A5ACD', '#B0C4DE'];

const { title, description } = useExploreSeo({ tags });
</script>
