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
const tags = ['cream'];
const palette = ['#FFFDD0', '#FFFACD', '#FAF0E6', '#F5DEB3', '#FFE4B5'];

const { title, description } = useExploreSeo({ tags });
</script>
