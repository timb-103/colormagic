<template>
  <div>
    <ShadesHeader
      :tags="tags"
      :tags-translated="tagsTranslated"
      :title="title"
      :description="description"
    />

    <ShadesPicker
      :shades="shades"
      :tags-translated="tagsTranslated"
    />

    <div class="mt-8">
      <ShadesLinks
        :tags="relatedShades"
        :tags-translated="tagsTranslated"
      />
    </div>

    <div class="mt-8">
      <ShadesPaletteTagLinks
        :tags="relatedTags"
      />
    </div>

    <div class="mt-8">
      <ShadesColorPalettes
        :tags="tags"
        :tags-translated="tagsTranslated"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const tags = ['bright', 'blue'];
const relatedTags = ['blue', 'aqua', 'coastal', 'midnight', 'night-sky', 'ocean'];
const relatedShades = ['royal-blue', 'indigo'];

const shades = [
  '#0000FF',
  '#1E90FF',
  '#00BFFF',
  '#87CEFA',
  '#4682B4',
  '#5F9EA0',
  '#00CED1',
  '#007FFF',
  '#4169E1',
  '#6495ED',
  '#3F88C5',
  '#0084FF',
  '#4AA3DF',
  '#5CB3FF',
  '#0099FF',
  '#00A2FF',
  '#2894FF',
  '#1CA9FF',
  '#36A2EB',
  '#4BA3E9'
];

const { title, description, tagsTranslated } = useShadesSeo({ tags });
</script>
