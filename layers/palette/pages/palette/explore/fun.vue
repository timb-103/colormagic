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
const tags = ['fun'];
const palette = ['#FFD700', '#FF4500', '#FF6347', '#FF1493', '#32CD32'];

const { title, description } = useExploreSeo({ tags });
</script>
