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
const tags = ['violet'];
const palette = ['#EE82EE', '#DA70D6', '#DDA0DD', '#E6E6FA', '#BA55D3'];

const { title, description } = useExploreSeo({ tags });
</script>
