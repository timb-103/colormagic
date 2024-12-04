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
const tags = ['burgundy'];
const palette = ['#800020', '#66001E', '#4D001A', '#330015', '#1A000F'];

const { title, description } = useExploreSeo({ tags });
</script>
