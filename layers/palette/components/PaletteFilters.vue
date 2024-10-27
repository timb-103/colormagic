<template>
  <div>
    <div class="flex gap-2 flex-wrap">
      <!-- colors -->
      <UButtonGroup>
        <USelectMenu
          v-model="selectedColors"
          size="sm"
          by="id"
          :placeholder="$t('explore.color')"
          searchable
          :options="props.colorOptions.map(v => ({
            ...v,
            disabled: isNavigating || checkIfColorsDisabled(v.id)
          }))"
          :popper="{
            placement: 'bottom-start'
          }"
          multiple
          :ui-menu="{container: 'min-w-36 w-36'}"
        >
          <template #label>
            <span
              v-if="selectedColors.length"
              class="truncate"
            >
              {{ selectedColors.map(v => v.label).join(', ') }}
            </span>
            <span v-else>Color</span>
          </template>
        </USelectMenu>
        <UButton
          v-if="selectedColors.length > 0"
          icon="i-heroicons-x-mark"
          :to="localePath(mapRemoveAllColorPaths())"
        />
      </UButtonGroup>

      <!-- tones -->
      <UButtonGroup>
        <USelectMenu
          v-model="selectedTone"
          size="sm"
          by="id"
          :placeholder="t('explore.tone')"
          searchable
          :options="props.toneOptions"
          :popper="{
            placement: 'bottom-start'
          }"
          :ui-menu="{container: 'min-w-36'}"
          @change="value => navigateTo(value.to)"
        />
        <UButton
          v-if="selectedTone && selectedTone.id !== ''"
          icon="i-heroicons-x-mark"
          :to="localePath(mapRemovePath(selectedTone.id))"
        />
      </UButtonGroup>

      <!-- style -->
      <UButtonGroup>
        <USelectMenu
          v-model="selectedStyle"
          size="sm"
          by="id"
          :placeholder="t('explore.style')"
          searchable
          :options="props.styleOptions"
          :popper="{
            placement: 'bottom-start'
          }"
          :ui-menu="{container: 'min-w-36'}"
          @change="value => navigateTo(value.to)"
        />
        <UButton
          v-if="selectedStyle && selectedStyle.id !== ''"
          icon="i-heroicons-x-mark"
          :to="localePath(mapRemovePath(selectedStyle.id))"
        />
      </UButtonGroup>

      <!-- season -->
      <UButtonGroup>
        <USelectMenu
          v-model="selectedSeason"
          size="sm"
          by="id"
          :placeholder="t('explore.season')"
          searchable
          :options="props.seasonOptions"
          :popper="{
            placement: 'bottom-start'
          }"
          :ui-menu="{container: 'min-w-36'}"
          @change="value => navigateTo(value.to)"
        />
        <UButton
          v-if="selectedSeason && selectedSeason.id !== ''"
          icon="i-heroicons-x-mark"
          :to="localePath(mapRemovePath(selectedSeason.id))"
        />
      </UButtonGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import { type PaletteFilterOption } from '~/layers/palette/composables/filters.composable';

export interface Props {
  tags: string[]
  colorOptions: PaletteFilterOption[]
  styleOptions: PaletteFilterOption[]
  toneOptions: PaletteFilterOption[]
  seasonOptions: PaletteFilterOption[]
}

const props = defineProps<Props>();

const localePath = useLocalePath();
const { t } = useI18n();

const isNavigating = ref(false);

const selectedColors = ref(findMultipleFilter(props.colorOptions));
const selectedStyle = ref(findFilter(props.styleOptions));
const selectedTone = ref(findFilter(props.toneOptions));
const selectedSeason = ref(findFilter(props.seasonOptions));

function checkIfColorsDisabled(id: string): boolean {
  const index = selectedColors.value.findIndex(v => v.id === id);
  if (index >= 0) {
    return false;
  }

  return selectedColors.value.length >= 5;
}

function findFilter(links: PaletteFilterOption[]): PaletteFilterOption | undefined {
  const index = links.findIndex(v => props.tags?.some(x => x === v.id));

  if (index >= 0) {
    return {
      ...links[index],
      label: links[index].label
    };
  }
}

function findMultipleFilter(links: PaletteFilterOption[]): PaletteFilterOption[] {
  const found = links.filter(v => props.tags?.some(x => x === v.id));

  return found.map(v => ({
    ...v,
    label: v.label
  }));
}

function mapRemovePath(id?: string): string {
  if (id === undefined) {
    return `/palette/explore/${props.tags.join('-')}`;
  }

  const tagsNew = props.tags.filter(v => v !== id);
  if (props.tags.length === 0 || tagsNew.length === 0) {
    return '/palette/explore';
  }

  return `/palette/explore/${tagsNew.join('-')}`;
}

function mapRemoveAllColorPaths(): string {
  const tagsNew = props.tags.filter(v => !props.colorOptions.some(x => x.id === v));

  if (props.tags.length === 0 || tagsNew.length === 0) {
    return '/palette/explore';
  }

  return `/palette/explore/${tagsNew.join('-')}`;
}

watch(selectedColors, (newValue, oldValue) => {
  const added = differenceWith(newValue, oldValue, isEqual);
  const removed = differenceWith(oldValue, newValue, isEqual);

  if (added.length > 0) {
    isNavigating.value = true;
    void navigateTo(added[0].to);
  }
  if (removed.length > 0) {
    isNavigating.value = true;
    void navigateTo(removed[0].to);
  }
});
</script>
