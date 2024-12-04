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
const tags = ['beige'];
const palette = ['#F5F5DC', '#ECE8D0', '#E5DFC7', '#DED5BC', '#D7CCB3'];

const { title, description } = useExploreSeo({ tags });
</script>
