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
const tags = ['moon'];
const palette = ['#F8F8FF', '#F0F8FF', '#E6E6FA', '#ADD8E6', '#708090'];

const { title, description } = useExploreSeo({ tags });
</script>
