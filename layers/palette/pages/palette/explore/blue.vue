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
const tags = ['blue'];
const palette = ['#0000FF', '#0000CD', '#00008B', '#4169E1', '#4682B4'];

const { title, description } = useExploreSeo({ tags });
</script>
