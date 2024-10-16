<template>
  <USelectMenu
    v-model="selected"
    size="sm"
    :options="options"
  />
</template>

<script setup lang="ts">
const { locales, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const options = locales.value.map(v => v.code);
const selected = ref(locale.value);

watch(locale, (newValue) => {
  selected.value = newValue;
});

watch(selected, async (newValue) => {
  await navigateTo(switchLocalePath(newValue));
});
</script>
