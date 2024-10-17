<template>
  <div class="flex">
    <UButtonGroup>
      <USelectMenu
        v-model="selected"
        size="sm"
        by="id"
        :placeholder="$t('explore.color')"
        searchable
        :options="colorLinks"
        :popper="{
          placement: 'bottom-start'
        }"
        :ui-menu="{container: 'min-w-36'}"
        @change="value => navigateTo(value.to)"
      />
      <UButton
        v-if="tag"
        icon="i-heroicons-x-mark"
        :to="localePath('/palette/explore')"
      />
    </UButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { type PaletteFilter } from '~/layers/palette/utils/palette-filters.util';

export interface Props {
  tag?: string
  filter?: PaletteFilter
}

const props = defineProps<Props>();

const localePath = useLocalePath();
const { locale, t } = useI18n();

const colorLinks = computed(() => [
  /** @description stupid hack for nuxt ui bug */
  {
    label: t('explore.color'),
    id: '',
    to: localePath('/palette/explore')
  },
  ...getPaletteColorFilter().map(v => ({
    label: v.label[getLocale(locale.value)],
    id: v.id,
    to: localePath(`/palette/explore/${v.id}`)
  }))
]);

const selected = ref({
  ...props.filter,
  label: props.filter?.label[getLocale(locale.value)]
});
</script>
