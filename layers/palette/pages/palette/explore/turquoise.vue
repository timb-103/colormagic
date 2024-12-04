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
const tags = ['turquoise'];
const palette = ['#40E0D0', '#48D1CC', '#00CED1', '#20B2AA', '#5F9EA0'];

const { title, description } = useExploreSeo({ tags });
</script>
