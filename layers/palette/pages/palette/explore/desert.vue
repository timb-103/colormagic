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
const tags = ['desert'];
const palette = ['#EDC9AF', '#F4A460', '#DEB887', '#D2B48C', '#C19A6B'];

const { title, description } = useExploreSeo({ tags });
</script>
