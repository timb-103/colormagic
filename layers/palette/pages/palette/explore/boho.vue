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
const tags = ['boho'];
const palette = ['#D2B48C', '#F4A460', '#DEB887', '#FFE4C4', '#D2691E'];

const { title, description } = useExploreSeo({ tags });
</script>
