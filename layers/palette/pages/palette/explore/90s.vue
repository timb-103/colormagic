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
const tags = ['90s'];
const palette = ['#32CD32', '#00FA9A', '#ADFF2F', '#FFD700', '#FF4500'];

const { title, description } = useExploreSeo({ tags });
</script>
