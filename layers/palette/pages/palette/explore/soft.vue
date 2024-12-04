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
const tags = ['soft'];
const palette = ['#FFE4E1', '#FFDEAD', '#FDF5E6', '#FAF0E6', '#FFEFD5'];

const { title, description } = useExploreSeo({ tags });
</script>
