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
const tags = ['crimson'];
const palette = ['#DC143C', '#B22222', '#A52A2A', '#8B0000', '#800000'];

const { title, description } = useExploreSeo({ tags });
</script>
