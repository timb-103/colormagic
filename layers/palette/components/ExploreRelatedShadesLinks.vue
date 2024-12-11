<template>
  <div>
    <p class="font-semibold">
      {{ $t('palette.relatedShades') }}
    </p>

    <ul class="flex flex-wrap gap-2">
      <li
        v-for="(item, index) in shadeTags"
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

const shadeTags = getShadeTags()
  .filter(v => props.tags?.some(y => y === v))
  .filter(v => v !== undefined);
</script>
