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
const tags = ['coastal'];
const palette = ['#B0C4DE', '#ADD8E6', '#4682B4', '#5F9EA0', '#87CEFA'];

const { title, description } = useExploreSeo({ tags });
</script>
