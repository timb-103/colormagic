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
const tags = ['warm', 'spring'];
const palette = ['#ff8b6b', '#ffb580', '#ffcdad', '#fadfcc', '#f6c5ac'];

const { title, description } = useExploreSeo({ tags });
</script>
