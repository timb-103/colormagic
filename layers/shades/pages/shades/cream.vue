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
const tags = ['cream'];
const relatedTags = ['beige', 'ivory', 'peach', 'skin', 'yellow', 'tan'];
const relatedShades = ['light-yellow', 'yellow'];

const shades = [
  '#FFFDD0',
  '#FAF3E0',
  '#F5F5DC',
  '#FFF8E7',
  '#FFFBF0',
  '#FDF5E6',
  '#FFFAF0',
  '#FFF5E1',
  '#FAF0E6',
  '#F8F0E3',
  '#FDFBF1',
  '#FFF9E3',
  '#FDF6E4',
  '#FFFDE6',
  '#FFF8DC',
  '#FFF4E0',
  '#FFFAE8',
  '#FEF7E5',
  '#FFFCEA',
  '#FFF8E1'
];

const { title, description, tagsTranslated } = useShadesSeo({ tags });
</script>
