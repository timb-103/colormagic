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
const tags = ['light', 'red'];
const relatedTags = ['red', 'crimson', 'plum', 'amber', 'orange', 'sun', 'warm'];
const relatedShades = ['plum'];

const shades = [
  '#FFC1C1',
  '#FFB6C1',
  '#FFA07A',
  '#FFD1D1',
  '#FFE4E1',
  '#FF9999',
  '#FF7F7F',
  '#FF6F61',
  '#FF8C69',
  '#FF6961',
  '#FFA07C',
  '#FFA6A6',
  '#FFCCCC',
  '#FFB2B2',
  '#FF9999',
  '#FFABAB',
  '#FF7373',
  '#FFA8A8',
  '#FF9898',
  '#FF9A9A'
];

const { title, description, tagsTranslated } = useShadesSeo({ tags });
</script>
