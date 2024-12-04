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
const tags = ['60s'];
const palette = ['#FF6347', '#FFD700', '#00FF00', '#4682B4', '#9400D3'];

const { title, description } = useExploreSeo({ tags });
</script>
