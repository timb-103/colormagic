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
const tags = ['skin'];
const palette = ['#FFE4C4', '#F5DEB3', '#D2B48C', '#C19A6B', '#DEB887'];

const { title, description } = useExploreSeo({ tags });
</script>
