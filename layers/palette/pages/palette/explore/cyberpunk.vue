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
const tags = ['cyberpunk'];
const palette = ['#9400D3', '#FF00FF', '#8A2BE2', '#7B68EE', '#DA70D6'];

const { title, description } = useExploreSeo({ tags });
</script>
