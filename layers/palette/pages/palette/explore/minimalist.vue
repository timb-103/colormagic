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
const tags = ['minimalist'];
const palette = ['#F5F5F5', '#D3D3D3', '#A9A9A9', '#808080', '#F8F8F8'];

const { title, description } = useExploreSeo({ tags });
</script>
