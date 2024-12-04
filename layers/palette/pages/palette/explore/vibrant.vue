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
const tags = ['vibrant'];
const palette = ['#FF1493', '#FF4500', '#FF69B4', '#FF6347', '#FF7F50'];

const { title, description } = useExploreSeo({ tags });
</script>
