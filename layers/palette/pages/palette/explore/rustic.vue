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
const tags = ['rustic'];
const palette = ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#D2B48C'];

const { title, description } = useExploreSeo({ tags });
</script>
