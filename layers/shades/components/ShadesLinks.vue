<template>
  <div>
    <h2 class="font-semibold text-lg">
      {{ $t('shade.similar', { color: tagsTranslated.join(' ').toLowerCase() }) }}
    </h2>

    <ul class="mt-4">
      <li
        v-for="(item, index) in links"
        :key="index"
      >
        <NuxtLinkLocale
          :to="`/shades/${item.to}`"
          class="text-blue-400 underline"
        >
          {{ $t('shade.title', {color: item.label }) }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  tags: string[]
  tagsTranslated: string[]
}

const props = defineProps<Props>();

const { t } = useI18n();

const links = props.tags.map(v => ({
  to: v,
  label: v.split('-').map(y => t(`colors.${y}`)).join(' ')
}));
</script>
