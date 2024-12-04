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
const tags = ['apricot'];
const palette = ['#FBCEB1', '#FBC0A3', '#F8B293', '#F7A283', '#F69373'];

const { title, description } = useExploreSeo({ tags });
</script>
