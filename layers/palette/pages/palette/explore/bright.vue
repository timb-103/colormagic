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
const tags = ['bright'];
const palette = ['#FFD700', '#FFAE42', '#FFA500', '#FF6347', '#FFD700'];

const { title, description } = useExploreSeo({ tags });
</script>
