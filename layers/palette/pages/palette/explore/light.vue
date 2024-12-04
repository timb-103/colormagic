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
const tags = ['light'];
const palette = ['#F5F5DC', '#FAFAD2', '#FFFACD', '#FFFAF0', '#F8F8FF'];

const { title, description } = useExploreSeo({ tags });
</script>
