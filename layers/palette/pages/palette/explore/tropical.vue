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
const tags = ['tropical'];
const palette = ['#FF7F50', '#FFA07A', '#FFD700', '#ADFF2F', '#00FF7F'];

const { title, description } = useExploreSeo({ tags });
</script>
