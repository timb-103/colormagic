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
const tags = ['monochromatic'];
const palette = ['#2F4F4F', '#696969', '#808080', '#A9A9A9', '#C0C0C0'];

const { title, description } = useExploreSeo({ tags });
</script>
