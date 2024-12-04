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
const tags = ['garden'];
const palette = ['#228B22', '#32CD32', '#006400', '#556B2F', '#8B4513'];

const { title, description } = useExploreSeo({ tags });
</script>
