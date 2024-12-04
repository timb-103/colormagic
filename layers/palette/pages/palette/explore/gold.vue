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
const tags = ['gold'];
const palette = ['#FFD700', '#FFC700', '#FFB800', '#FFA700', '#FF9600'];

const { title, description } = useExploreSeo({ tags });
</script>
