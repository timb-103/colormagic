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
const tags = ['hawaii'];
const palette = ['#FF6347', '#FFD700', '#FF7F50', '#00FF7F', '#4682B4'];

const { title, description } = useExploreSeo({ tags });
</script>
