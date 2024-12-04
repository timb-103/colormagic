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
const tags = ['green'];
const palette = ['#008000', '#006400', '#32CD32', '#228B22', '#2E8B57'];

const { title, description } = useExploreSeo({ tags });
</script>
