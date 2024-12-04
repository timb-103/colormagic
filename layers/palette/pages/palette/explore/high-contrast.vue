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
const tags = ['high-contrast'];
const palette = ['#FFFFFF', '#000000', '#FFD700', '#FF4500', '#1E90FF'];

const { title, description } = useExploreSeo({ tags });
</script>
