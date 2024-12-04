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
const tags = ['cool'];
const palette = ['#4682B4', '#5F9EA0', '#6495ED', '#00CED1', '#20B2AA'];

const { title, description } = useExploreSeo({ tags });
</script>
