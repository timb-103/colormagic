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
const tags = ['y2k'];
const palette = ['#ADD8E6', '#00CED1', '#4682B4', '#87CEFA', '#5F9EA0'];

const { title, description } = useExploreSeo({ tags });
</script>
