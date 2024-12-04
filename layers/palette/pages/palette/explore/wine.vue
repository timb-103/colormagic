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
const tags = ['wine'];
const palette = ['#722F37', '#800000', '#8B0000', '#A52A2A', '#B22222'];

const { title, description } = useExploreSeo({ tags });
</script>
