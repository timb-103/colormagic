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
const tags = ['indigo'];
const relatedTags = ['lilac', 'deep', 'crimson', 'fuschia', 'lavendar', 'lilac', 'midnight'];
const relatedShades = ['bright-blue', 'royal-blue'];

const shades = [
  '#3730A3',
  '#333FFF',
  '#4C5AFF',
  '#4338CA',
  '#C7D2FE',
  '#808FFF',
  '#0000CC',
  '#0000E6',
  '#6675FF',
  '#E0E7FF',
  '#4F46E5',
  '#818CF8',
  '#A5B4FC',
  '#6366F1',
  '#312E81',
  '#99A8FF',
  '#1E1B4B',
  '#1A24FF',
  '#000AFF',
  '#B2BFFF'
];

const { title, description, tagsTranslated } = useShadesSeo({ tags });
</script>
