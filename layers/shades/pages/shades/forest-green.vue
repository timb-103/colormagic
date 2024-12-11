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
const tags = ['forest', 'green'];
const relatedTags = ['green', 'forest', 'garden', 'mint', 'nature', 'mountain'];
const relatedShades = ['sage'];

const shades = [
  '#228B22',
  '#006400',
  '#2E8B57',
  '#556B2F',
  '#6B8E23',
  '#3C6B48',
  '#4F7942',
  '#355E3B',
  '#2F4F4F',
  '#5A7058',
  '#8F9779',
  '#4A7023',
  '#567D46',
  '#0B6623',
  '#1B4D3E',
  '#2C5F2D',
  '#738678',
  '#355E3B',
  '#6A866C',
  '#9BB58A'
];

const { title, description, tagsTranslated } = useShadesSeo({ tags });
</script>
