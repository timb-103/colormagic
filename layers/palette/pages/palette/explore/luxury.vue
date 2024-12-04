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
const tags = ['luxury'];
const palette = ['#B8860B', '#DAA520', '#FFD700', '#F4A460', '#DEB887'];

const { title, description } = useExploreSeo({ tags });
</script>
