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
const tags = ['yellow'];
const relatedTags = ['yellow', 'gold', 'orange', 'autumn', 'amber', 'warm'];

const shades = [
  '#FFFF00',
  '#FFEE00',
  '#FFF700',
  '#FFFA66',
  '#FFFF66',
  '#FFFF99',
  '#FFFFB3',
  '#FFFFCC',
  '#FFFFE0',
  '#FFFACD',
  '#FDFD96',
  '#F6E05E',
  '#F5DE42',
  '#FFE135',
  '#FFD700',
  '#FFED47',
  '#F3E151',
  '#FAFAD2',
  '#FFFB7D',
  '#FFFFE6'
];

const { title, description, tagsTranslated } = useShadesSeo({ tags });
</script>
