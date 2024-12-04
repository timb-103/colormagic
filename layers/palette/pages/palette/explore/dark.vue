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
const tags = ['dark'];
const palette = ['#000000', '#2F4F4F', '#4B0082', '#1C1C1C', '#696969'];

const { title, description } = useExploreSeo({ tags });
</script>
