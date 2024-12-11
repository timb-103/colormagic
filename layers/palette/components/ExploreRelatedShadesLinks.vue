<template>
  <div>
    <p class="font-semibold">
      {{ $t('palette.relatedShades') }}
    </p>

    <ul class="flex flex-wrap gap-2">
      <li
        v-for="(item, index) in shadeTagsFiltered"
        :key="index"
      >
        <NuxtLinkLocale
          :to="`/shades/${item}`"
          class="font-medium text-sm hover:text-primary text-gray-400"
        >
          {{ $t('shade.title', { color: item.split('-').map(v => t(`colors.${v}`)).join(' ') }) }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  tags?: string[]
}

const props = defineProps<Props>();

const { t } = useI18n();

const shadeTags = getShadeTags();
const shadeTagsFiltered = new Set([
  ...[
    ...shadeTags,
    ...shadeTags.map(v => v.split('-')).flat()
  ]
    .filter(v => props.tags?.some(y => v.includes(y)))
    .filter(v => v !== undefined && shadeTags.includes(v))
]);
</script>
