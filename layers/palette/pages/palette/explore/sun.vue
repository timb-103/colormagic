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
const tags = ['sun'];
const palette = ['#FFD700', '#FF8C00', '#FFA500', '#FF4500', '#FFD700'];

const { title, description } = useExploreSeo({ tags });
</script>
