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
const tags = ['royal', 'blue'];
const relatedTags = ['blue', 'royal', 'space', 'indigo', 'winter'];
const relatedShades = ['bright-blue'];

const shades = [
  '#4169E1',
  '#27408B',
  '#2B60DE',
  '#3A5FCD',
  '#2C2F8C',
  '#2447D8',
  '#1F45FC',
  '#4876FF',
  '#4267B2',
  '#3B52DA',
  '#365FDC',
  '#2548A8',
  '#1034A6',
  '#273BE2',
  '#355EBA',
  '#1C39BB',
  '#4166F5',
  '#3759C7',
  '#4C69FF',
  '#2A57EB'
];

const { title, description, tagsTranslated } = useShadesSeo({ tags });
</script>
