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
const tags = ['auburn'];
const palette = ['#A52A2A', '#8B0000', '#7E1E1E', '#6A1616', '#551212'];

const { title, description } = useExploreSeo({ tags });
</script>
