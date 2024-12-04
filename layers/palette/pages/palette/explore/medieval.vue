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
const tags = ['medieval'];
const palette = ['#A52A2A', '#8B4513', '#DAA520', '#DEB887', '#CD853F'];

const { title, description } = useExploreSeo({ tags });
</script>
