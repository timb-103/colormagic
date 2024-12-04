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
const tags = ['flower'];
const palette = ['#FF69B4', '#FFC0CB', '#FFD700', '#FFB6C1', '#FFA07A'];

const { title, description } = useExploreSeo({ tags });
</script>
