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
const tags = ['vintage'];
const palette = ['#C0C0C0', '#A9A9A9', '#808080', '#696969', '#D3D3D3'];

const { title, description } = useExploreSeo({ tags });
</script>
