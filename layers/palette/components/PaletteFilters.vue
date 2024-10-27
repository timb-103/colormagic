<template>
  <div>
    <div class="flex gap-2 flex-wrap">
      <!-- colors -->
      <UButtonGroup>
        <USelectMenu
          v-model="selectedColor"
          size="sm"
          by="id"
          :placeholder="$t('explore.color')"
          searchable
          :options="props.colorOptions"
          :popper="{
            placement: 'bottom-start'
          }"
          :ui-menu="{container: 'min-w-36'}"
          @change="value => navigateTo(value.to)"
        />
        <UButton
          v-if="selectedColor && selectedColor.id !== ''"
          icon="i-heroicons-x-mark"
          :to="localePath(mapRemovePath(selectedColor.id))"
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

const selectedColor = ref(findFilter(props.colorOptions));
const selectedStyle = ref(findFilter(props.styleOptions));
const selectedTone = ref(findFilter(props.toneOptions));
const selectedSeason = ref(findFilter(props.seasonOptions));

function findFilter(links: PaletteFilterOption[]): PaletteFilterOption | undefined {
  const index = links.findIndex(v => props.tags?.some(x => x === v.id));

  if (index >= 0) {
    return {
      ...links[index],
      label: links[index].label
    };
  }
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
</script>
