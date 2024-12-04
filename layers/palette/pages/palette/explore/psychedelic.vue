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
const tags = ['psychedelic'];
const palette = ['#FF00FF', '#9400D3', '#FF1493', '#FFD700', '#00FFFF'];

const { title, description } = useExploreSeo({ tags });
</script>
