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
const tags = ['hazel'];
const palette = ['#8E7618', '#9C8542', '#A58E5F', '#B29A7F', '#C2A592'];

const { title, description } = useExploreSeo({ tags });
</script>
