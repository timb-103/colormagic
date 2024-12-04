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
const tags = ['night-sky'];
const palette = ['#191970', '#000080', '#4682B4', '#2F4F4F', '#6A5ACD'];

const { title, description } = useExploreSeo({ tags });
</script>
