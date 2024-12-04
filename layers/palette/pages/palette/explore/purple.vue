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
const tags = ['purple'];
const palette = ['#800080', '#6A0DAD', '#9400D3', '#8A2BE2', '#9370DB'];

const { title, description } = useExploreSeo({ tags });
</script>
