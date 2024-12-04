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
const tags = ['cool', 'winter'];
const palette = ['#a3c6e0', '#d8e9ee', '#e0b3ff', '#ffc2cf', '#ff6e61'];

const { title, description } = useExploreSeo({ tags });
</script>
