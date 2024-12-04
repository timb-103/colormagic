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
const tags = ['winter'];
const palette = ['#00BFFF', '#4682B4', '#191970', '#F8F8FF', '#DCDCDC'];

const { title, description } = useExploreSeo({ tags });
</script>
