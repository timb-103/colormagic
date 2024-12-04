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
const tags = ['black'];
const palette = ['#000000', '#0A0A0A', '#141414', '#1F1F1F', '#2A2A2A'];

const { title, description } = useExploreSeo({ tags });
</script>
