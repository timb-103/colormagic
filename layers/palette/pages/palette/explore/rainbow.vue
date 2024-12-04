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
const tags = ['rainbow'];
const palette = ['#FF4500', '#FFD700', '#00FF00', '#1E90FF', '#800080'];

const { title, description } = useExploreSeo({ tags });
</script>
