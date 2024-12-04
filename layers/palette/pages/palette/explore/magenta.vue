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
const tags = ['magenta'];
const palette = ['#FF00FF', '#FF77FF', '#FF44FF', '#FF99FF', '#FF66CC'];

const { title, description } = useExploreSeo({ tags });
</script>
