<template>
  <div>
    <div class="flex gap-2 flex-wrap">
      <!-- colors -->
      <UButtonGroup>
        <USelectMenu
          v-model="selected"
          size="sm"
          by="id"
          :placeholder="$t('explore.color')"
          searchable
          :options="options"
          :popper="{
            placement: 'bottom-start'
          }"
          multiple
          :ui-menu="{container: 'min-w-36 w-36 max-w-full'}"
        >
          <template #option="{ option }">
            <span
              :style="`background: ${option.color}`"
              class="inline-block h-4 w-4 flex-shrink-0 rounded-full"
              aria-hidden="true"
            />
            <span class="truncate">{{ option.label }}</span>
          </template>

          <template #label>
            <span
              v-if="selected.length"
              class="truncate"
            >
              {{ selected.map(v => v.label).join(', ') }}
            </span>
            <span v-else>Filters</span>
          </template>
        </USelectMenu>
        <UButton
          v-if="selected.length > 0"
          icon="i-heroicons-x-mark"
          :to="localePath('/palette/explore')"
        />
      </UButtonGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';

export interface Props {
  tags: string[]
}

export interface FilterOption {
  label: string
  id: string
  color: string
}

const props = defineProps<Props>();

const { t } = useI18n();
const localePath = useLocalePath();

const options: FilterOption[] = getAllPaletteFilters().map(v => ({
  id: v.id,
  label: t(`colors.${v.id}`),
  color: v.palette[0]
})).filter(v => !v.id.includes('-'));

const selected = ref<FilterOption[]>(
  props.tags
    .map(tag => options.find(option => option.id === tag))
    .filter((option) => option !== undefined)
);

watch(selected, (newValue, oldValue) => {
  const added = differenceWith(newValue, oldValue, isEqual);
  const removed = differenceWith(oldValue, newValue, isEqual);

  if (added.length > 0) {
    void navigateTo(localePath(`/palette/explore/${selected.value.map(v => v.id).join('-')}`));
  }
  if (removed.length > 0) {
    if (selected.value.length === 0) {
      void navigateTo(localePath('/palette/explore'));
    } else {
      void navigateTo(localePath(`/palette/explore/${selected.value.map(v => v.id).join('-')}`));
    }
  }
});
</script>
