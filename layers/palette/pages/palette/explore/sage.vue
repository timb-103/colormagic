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
const tags = ['sage'];
const palette = ['#BCB88A', '#B2AC75', '#A9A26B', '#9F9760', '#8E8B4E'];

const { title, description } = useExploreSeo({ tags });
</script>
