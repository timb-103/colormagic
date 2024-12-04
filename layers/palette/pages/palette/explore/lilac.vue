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
const tags = ['lilac'];
const palette = ['#C8A2C8', '#D1B2D1', '#DAAEDC', '#E5BBE8', '#F2C6F3'];

const { title, description } = useExploreSeo({ tags });
</script>
