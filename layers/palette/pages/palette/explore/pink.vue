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
const tags = ['pink'];
const palette = ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#FF6EB4'];

const { title, description } = useExploreSeo({ tags });
</script>
