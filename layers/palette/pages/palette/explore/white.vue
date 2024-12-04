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
const tags = ['white'];
const palette = ['#FFFFFF', '#F8F8FF', '#F5F5F5', '#F0F0F0', '#FAFAFA'];

const { title, description } = useExploreSeo({ tags });
</script>
