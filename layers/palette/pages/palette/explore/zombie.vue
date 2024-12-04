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
const tags = ['zombie'];
const palette = ['#708090', '#A9A9A9', '#808080', '#696969', '#2F4F4F'];

const { title, description } = useExploreSeo({ tags });
</script>
