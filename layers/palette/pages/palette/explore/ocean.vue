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
const tags = ['ocean'];
const palette = ['#4682B4', '#87CEFA', '#00CED1', '#5F9EA0', '#000080'];

const { title, description } = useExploreSeo({ tags });
</script>
