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
const tags = ['spring'];
const palette = ['#00FF7F', '#FFD700', '#FFB6C1', '#FF69B4', '#ADFF2F'];

const { title, description } = useExploreSeo({ tags });
</script>
