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
const tags = ['fire'];
const palette = ['#FF4500', '#FF6347', '#FFD700', '#FFA07A', '#FF8C00'];

const { title, description } = useExploreSeo({ tags });
</script>
