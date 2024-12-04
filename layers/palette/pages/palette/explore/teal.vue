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
const tags = ['teal'];
const palette = ['#008080', '#009688', '#20B2AA', '#48D1CC', '#40E0D0'];

const { title, description } = useExploreSeo({ tags });
</script>
