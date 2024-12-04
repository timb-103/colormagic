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
const tags = ['gray'];
const palette = ['#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC'];

const { title, description } = useExploreSeo({ tags });
</script>
