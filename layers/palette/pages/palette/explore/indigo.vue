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
const tags = ['indigo'];
const palette = ['#4B0082', '#3C006A', '#330057', '#260046', '#1A0033'];

const { title, description } = useExploreSeo({ tags });
</script>
