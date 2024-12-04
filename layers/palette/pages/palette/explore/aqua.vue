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
const tags = ['aqua'];
const palette = ['#00FFFF', '#00E5EE', '#00CED1', '#20B2AA', '#008B8B'];

const { title, description } = useExploreSeo({ tags });
</script>
