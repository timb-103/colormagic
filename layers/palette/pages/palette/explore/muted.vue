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
const tags = ['muted'];
const palette = ['#696969', '#708090', '#778899', '#2F4F4F', '#A9A9A9'];

const { title, description } = useExploreSeo({ tags });
</script>
