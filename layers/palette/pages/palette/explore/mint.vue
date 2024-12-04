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
const tags = ['mint'];
const palette = ['#98FF98', '#90EE90', '#8FBC8F', '#98FB98', '#66CDAA'];

const { title, description } = useExploreSeo({ tags });
</script>
