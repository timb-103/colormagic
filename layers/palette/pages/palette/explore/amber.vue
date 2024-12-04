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
const tags = ['amber'];
const palette = ['#FFBF00', '#FFB300', '#FF8C00', '#FF6600', '#FF4500'];

const { title, description } = useExploreSeo({ tags });
</script>
