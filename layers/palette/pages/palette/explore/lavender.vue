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
const tags = ['lavender'];
const palette = ['#E6E6FA', '#D8BFD8', '#DDA0DD', '#EE82EE', '#BA55D3'];

const { title, description } = useExploreSeo({ tags });
</script>
