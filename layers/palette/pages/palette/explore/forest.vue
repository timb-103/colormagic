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
const tags = ['forest'];
const palette = ['#228B22', '#006400', '#32CD32', '#556B2F', '#8B4513'];

const { title, description } = useExploreSeo({ tags });
</script>
