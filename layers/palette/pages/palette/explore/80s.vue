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
const tags = ['80s'];
const palette = ['#FF69B4', '#FF1493', '#9400D3', '#00FFFF', '#FFD700'];

const { title, description } = useExploreSeo({ tags });
</script>
