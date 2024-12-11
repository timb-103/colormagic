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
const tags = ['light', 'yellow'];
const relatedTags = ['light', 'yellow', 'gold', 'orange', 'autumn', 'amber', 'warm'];
const relatedShades = ['yellow', 'cream'];

const shades = [
  '#FFFFE0',
  '#FFFACD',
  '#FFF8DC',
  '#FAFAD2',
  '#FFFBF0',
  '#FFF9E3',
  '#FFFFF0',
  '#FFF5E1',
  '#FFFDE6',
  '#FFFAF0',
  '#FFFFF5',
  '#FFFCE8',
  '#FFF9D9',
  '#FFFADF',
  '#FFFEE0',
  '#FFFDEA',
  '#FFFFF2',
  '#FFFCEC',
  '#FFFFF7',
  '#FFF8E1'
];

const { title, description, tagsTranslated } = useShadesSeo({ tags });
</script>
