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
const tags = ['mountain'];
const palette = ['#2E8B57', '#006400', '#228B22', '#556B2F', '#8B4513'];

const { title, description } = useExploreSeo({ tags });
</script>
