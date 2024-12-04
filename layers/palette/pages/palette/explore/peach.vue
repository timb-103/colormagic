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
const tags = ['peach'];
const palette = ['#FFDAB9', '#FFE4B5', '#FFDEAD', '#F5DEB3', '#FAF0E6'];

const { title, description } = useExploreSeo({ tags });
</script>
