<template>
  <USelectMenu
    v-model="selected"
    size="sm"
    :options="options"
    :ui-menu="{container: 'w-32'}"
  >
    <!-- label -->
    <template #label>
      <span class="flex items-center gap-2">
        <span>
          {{ locales.find(v => v.code === selected)?.flag }}
        </span>
        <span>
          {{ selected }}
        </span>
      </span>
    </template>

    <!-- option -->
    <template #option="{ option }">
      <span class="truncate">
        {{ locales.find(v => v.code === option)?.name }}
      </span>
    </template>
  </USelectMenu>
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
