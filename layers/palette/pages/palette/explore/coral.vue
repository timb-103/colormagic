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
const tags = ['coral'];
const palette = ['#FF7F50', '#FF6347', '#FF4500', '#FF7256', '#FFA07A'];

const { title, description } = useExploreSeo({ tags });
</script>
