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
const tags = ['orange'];
const palette = ['#FFA500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500'];

const { title, description } = useExploreSeo({ tags });
</script>
