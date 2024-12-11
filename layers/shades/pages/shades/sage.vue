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
const tags = ['sage'];
const relatedTags = ['green', 'forest', 'garden', 'mint', 'mountain', 'teal'];

const shades = [
  '#9CAF88',
  '#A3B2A4',
  '#B2C2B0',
  '#BCCBB8',
  '#C3D0BF',
  '#CBD6C6',
  '#D1DCCB',
  '#D8E2D2',
  '#DEE8D8',
  '#E4EEDC',
  '#E9F1E0',
  '#EEF5E4',
  '#F2F8E9',
  '#F6FAED',
  '#FAFDF2',
  '#FDFEF6',
  '#E3E8E1',
  '#D5DBD3',
  '#C9D0C7',
  '#BEC6BC'
];

const { title, description, tagsTranslated } = useShadesSeo({ tags });
</script>
