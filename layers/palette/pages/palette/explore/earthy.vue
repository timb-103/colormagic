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
const tags = ['earthy'];
const palette = ['#8B4513', '#A0522D', '#6B4226', '#D2B48C', '#C19A6B'];

const { title, description } = useExploreSeo({ tags });
</script>
