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
const tags = ['ivory'];
const palette = ['#FFFFF0', '#FFFFE0', '#FAFAD2', '#FFEFD5', '#FFF5EE'];

const { title, description } = useExploreSeo({ tags });
</script>
