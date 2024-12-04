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
const tags = ['red'];
const palette = ['#FF0000', '#DC143C', '#B22222', '#CD5C5C', '#E9967A'];

const { title, description } = useExploreSeo({ tags });
</script>
