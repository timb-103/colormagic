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
const tags = ['beach'];
const palette = ['#87CEFA', '#00CED1', '#4682B4', '#ADD8E6', '#5F9EA0'];

const { title, description } = useExploreSeo({ tags });
</script>
