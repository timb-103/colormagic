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
const tags = ['hippie'];
const palette = ['#FF4500', '#FFD700', '#FF6347', '#FF69B4', '#00FF7F'];

const { title, description } = useExploreSeo({ tags });
</script>
