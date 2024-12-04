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
const tags = ['soft', 'summer'];
const palette = ['#f2b75a', '#f7d3a1', '#f8e1af', '#f3baa0', '#f28978'];

const { title, description } = useExploreSeo({ tags });
</script>
