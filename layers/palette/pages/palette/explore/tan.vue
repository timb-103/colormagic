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
const tags = ['tan'];
const palette = ['#D2B48C', '#D4A017', '#C19A6B', '#C3B091', '#DEB887'];

const { title, description } = useExploreSeo({ tags });
</script>
