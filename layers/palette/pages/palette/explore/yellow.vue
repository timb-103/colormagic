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
const tags = ['yellow'];
const palette = ['#FFFF00', '#FFD700', '#FFA500', '#FFAE42', '#FFE135'];

const { title, description } = useExploreSeo({ tags });
</script>
