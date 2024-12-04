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
const tags = ['sunset'];
const palette = ['#FF4500', '#FF6347', '#FFD700', '#FF7F50', '#FFA500'];

const { title, description } = useExploreSeo({ tags });
</script>
