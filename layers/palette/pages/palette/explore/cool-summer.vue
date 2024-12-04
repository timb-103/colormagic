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
const tags = ['cool', 'summer'];
const palette = ['#a9e0d5', '#76d5c8', '#4dc7b8', '#1eb3a6', '#009e8c'];

const { title, description } = useExploreSeo({ tags });
</script>
