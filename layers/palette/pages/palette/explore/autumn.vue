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
const tags = ['autumn'];
const palette = ['#FF8C00', '#D2691E', '#CD853F', '#A0522D', '#8B4513'];

const { title, description } = useExploreSeo({ tags });
</script>
