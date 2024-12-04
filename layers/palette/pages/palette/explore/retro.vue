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
const tags = ['retro'];
const palette = ['#F08080', '#FF4500', '#FFD700', '#8B0000', '#00CED1'];

const { title, description } = useExploreSeo({ tags });
</script>
