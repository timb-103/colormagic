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
const tags = ['brown'];
const palette = ['#964B00', '#8B4513', '#A52A2A', '#7B3F00', '#603311'];

const { title, description } = useExploreSeo({ tags });
</script>
