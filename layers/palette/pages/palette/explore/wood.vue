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
const tags = ['wood'];
const palette = ['#8B4513', '#A0522D', '#D2691E', '#DEB887', '#F4A460'];

const { title, description } = useExploreSeo({ tags });
</script>
