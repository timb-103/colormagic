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
const tags = ['feminine'];
const palette = ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FFDAB9', '#F4A460'];

const { title, description } = useExploreSeo({ tags });
</script>
