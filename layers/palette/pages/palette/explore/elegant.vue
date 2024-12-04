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
const tags = ['elegant'];
const palette = ['#DAA520', '#B8860B', '#FFD700', '#D2B48C', '#F4A460'];

const { title, description } = useExploreSeo({ tags });
</script>
