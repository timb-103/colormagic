<template>
  <div class="flex flex-wrap gap-2">
    <!-- languages -->
    <NuxtLink
      v-for="item in colorLinks"
      :key="item.id"
      :to="item.to"
      class="font-medium text-sm hover:text-primary text-gray-400"
    >
      {{ item.label }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const { locale } = useI18n();

const colorLinks = getPaletteColorFilter().map(v => ({
  label: v.label[getLocale(locale.value)],
  id: v.id,
  to: localePath(`/palette/explore/${v.id}`)
}));
</script>
