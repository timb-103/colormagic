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
const tags = ['nature'];
const palette = ['#6B8E23', '#228B22', '#556B2F', '#8B4513', '#006400'];

const { title, description } = useExploreSeo({ tags });
</script>
