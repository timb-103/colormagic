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
const tags = ['plum'];
const relatedTags = ['indigo', 'lilac', 'crimson', 'wine', 'red', 'amber', 'apricot'];
const relatedShades = ['light-red'];

const shades = [
  '#DDA0DD',
  '#E6A8E6',
  '#D1A3D1',
  '#C8A2C8',
  '#E0B3E0',
  '#C5A3C5',
  '#B58DB5',
  '#BF9ABF',
  '#A77AA7',
  '#B480B4',
  '#AA6CAA',
  '#966996',
  '#884F88',
  '#7D487D',
  '#6B3A6B',
  '#5A305A',
  '#783878',
  '#8F4B8F',
  '#985498',
  '#A565A5'
];

const { title, description, tagsTranslated } = useShadesSeo({ tags });
</script>
