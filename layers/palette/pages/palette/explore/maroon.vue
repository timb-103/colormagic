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
const tags = ['maroon'];
const palette = ['#800000', '#5C0000', '#3C0000', '#4E0505', '#720707'];

const { title, description } = useExploreSeo({ tags });
</script>
