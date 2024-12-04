<template>
  <div class="space-y-4">
    <PaletteTagLinks :links="paletteFilterOptions.color.value" />
    <PaletteTagLinks :links="paletteFilterOptions.style.value" />
    <PaletteTagLinks :links="paletteFilterOptions.tone.value" />
    <PaletteTagLinks :links="paletteFilterOptions.season.value" />
  </div>
</template>

<script setup lang="ts">
const paletteFilterOptions = usePaletteFilterOptions([]);
</script>
