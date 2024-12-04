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
const tags = ['deep', 'autumn'];
const palette = ['#59181d', '#741b23', '#913b4b', '#9e6179', '#a47f9f'];

const { title, description } = useExploreSeo({ tags });
</script>
