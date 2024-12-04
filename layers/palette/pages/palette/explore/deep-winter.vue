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
const tags = ['deep', 'winter'];
const palette = ['#1b1f3b', '#2b2d54', '#3b3d72', '#4c4f94', '#5c5ea3'];

const { title, description } = useExploreSeo({ tags });
</script>
