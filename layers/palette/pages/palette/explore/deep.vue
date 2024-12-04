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
const tags = ['deep'];
const palette = ['#4B0082', '#6A0DAD', '#800080', '#8B0000', '#000080'];

const { title, description } = useExploreSeo({ tags });
</script>
