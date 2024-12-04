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
const tags = ['japanese'];
const palette = ['#DC143C', '#FF4500', '#FF6347', '#FFD700', '#8B0000'];

const { title, description } = useExploreSeo({ tags });
</script>
