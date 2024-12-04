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
const tags = ['summer'];
const palette = ['#FFD700', '#FFA07A', '#00BFFF', '#4682B4', '#87CEEB'];

const { title, description } = useExploreSeo({ tags });
</script>
