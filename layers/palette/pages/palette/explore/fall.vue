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
const tags = ['fall'];
const palette = ['#D2691E', '#A0522D', '#CD853F', '#8B4513', '#FF8C00'];

const { title, description } = useExploreSeo({ tags });
</script>
