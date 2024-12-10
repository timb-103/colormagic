<template>
  <div>
    <!-- header-->
    <div class="mb-8">
      <!-- title -->
      <h1>
        {{ $t('randomColor.title') }}
      </h1>

      <!-- description-->
      <p class="text-xl font-medium mb-4 max-w-xl">
        {{ description }}
      </p>
    </div>

    <div class="mb-4">
      <CarbonAds />
    </div>

    <div class="border border-gray-200 rounded-xl overflow-hidden mb-4">
      <!-- color -->
      <div
        class="h-44 w-full relative"
        :style="{ background: arrangedColor[0] }"
      >
        <!-- name -->
        <ColorNameBadge
          :name="ntc.name(arrangedColor[0])[1].toString()"
          class="bottom-2 left-2 absolute"
        />

        <!-- reset changes button -->
        <UButton
          v-if="hasChanges"
          :label="$t('palette.resetLabel')"
          class="absolute bottom-2 right-2"
          @click="resetArrange()"
        />
      </div>

      <div class="inline-block p-4">
        <ColorCopyButtons :hex="arrangedColor[0]" />
      </div>
    </div>

    <!-- arrange sliders-->
    <div class="border border-gray-200 rounded-xl p-4">
      <ColorArrangeSliders v-model="arrange" />
    </div>

    <!-- generate button -->
    <UButton
      size="xl"
      block
      :label="$t('randomColor.generateLabel')"
      :title="$t('randomColor.generateLabel')"
      :aria-label="$t('randomColor.generateLabel')"
      class="mt-4"
      @click="generateColor()"
    />

    <h2 class="mt-8">
      {{ $t('randomColor.whatIsTitle') }}
    </h2>
    <p>
      {{ $t('randomColor.whatIsDescription') }}
    </p>

    <p class="mt-8">
      Looking for a better random color generator? Try our partner site <NuxtLink
        class="text-blue-500"
        to="https://randomcolor.com"
      >
        random color
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { whenever, useMagicKeys } from '@vueuse/core';
import ntc from '~/layers/palette/utils/ntc.util';
import { PlausibleEventName } from '~/layers/plausible/types';

const { t } = useI18n();

const title = t('randomColor.seoTitle');
const description = t('randomColor.seoDescription');

const ogImageColor = getRandomHexColor();

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}${formatOgUrl([ogImageColor], ntc.name(ogImageColor)[1].toString())}`
});

const { SPACE } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === ' ' && e.type === 'keydown') {
      e.preventDefault();
    }
  }
});

const color = ref('');

const arrange = ref({
  brightness: 0,
  saturation: 0,
  warmth: 0
});

const arrangedColor = computed(() => arrangeColors([color.value], {
  brightness: arrange.value.brightness,
  saturation: arrange.value.saturation,
  warmth: arrange.value.warmth
}));

const hasChanges = computed(() => {
  return arrange.value.brightness !== 0 ||
  arrange.value.saturation !== 0 ||
  arrange.value.warmth !== 0;
});

function resetArrange(): void {
  arrange.value.brightness = 0;
  arrange.value.saturation = 0;
  arrange.value.warmth = 0;
}

function generateColor(): void {
  const newColor = getRandomHexColor();

  color.value = newColor;

  sendPlausibleEvent(PlausibleEventName.RANDOM_COLOR_GENERATED);
}

function viewRecentColor(value: string): void {
  color.value = value;

  if (window !== undefined) {
    window.scrollTo({ top: 0 });
  }
}

whenever(SPACE, () => {
  generateColor();
});

onMounted(() => {
  color.value = getRandomHexColor();
});
</script>
