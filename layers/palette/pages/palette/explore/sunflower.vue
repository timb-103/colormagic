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
const tags = ['sunflower'];
const palette = ['#FFD700', '#FFA500', '#FF6347', '#FF8C00', '#DAA520'];

const { title, description } = useExploreSeo({ tags });
</script>
