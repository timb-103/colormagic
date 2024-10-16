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

    <!-- color -->
    <div
      class="h-44 w-full relative"
      :style="{ background: arrangedColor[0] }"
    >
      <!-- color name label -->
      <span class="bottom-2 left-2 bg-white absolute rounded-md flex items-center gap-2 px-2 py-1 font-semibold text-sm">
        <UIcon name="i-heroicons-sparkles" />
        {{ ntc.name(arrangedColor[0])[1].toString() }}
      </span>

      <!-- reset changes button -->
      <UButton
        v-if="hasChanges"
        :label="$t('palette.resetLabel')"
        class="absolute bottom-2 right-2"
        @click="resetArrange()"
      />
    </div>

    <div class="inline-block my-4">
      <ColorCopyButtons :hex="arrangedColor[0]" />
    </div>

    <!-- arrange sliders-->
    <ColorArrangeSliders v-model="arrange" />

    <!-- generate button -->
    <UButton
      size="xl"
      block
      :label="$t('randomColor.generateLabel')"
      class="mt-4"
      @click="generateColor()"
    />

    <!-- recents -->
    <ClientOnly>
      <div class="mt-4">
        <!-- label -->
        <p class="text-lg font-bold mb-4">
          {{ $t('recent.topLabel') }}
        </p>

        <!-- colors list -->
        <ul
          v-if="session.length"
          class="grid sm:grid-cols-3 gap-4"
        >
          <li
            v-for="(item, index) in session"
            :key="index"
          >
            <UButton
              class="w-full"
              :ui="{ rounded: 'rounded-xl'}"
              @click="viewRecentColor(item)"
            >
              <span class="w-full flex rounded-lg relative overflow-hidden">
                <!-- color name label -->
                <span class="bottom-2 left-2 bg-white absolute rounded-md flex items-center gap-2 px-2 py-1 font-semibold text-sm">
                  <UIcon name="i-heroicons-sparkles" />
                  {{ ntc.name(item)[1].toString() }}
                </span>

                <!-- color -->
                <span
                  :style="{ 'background': item }"
                  class="w-full h-20 block"
                />
              </span>
            </UButton>
          </li>
        </ul>

        <p v-else>
          {{ $t('recent.noneFound') }}
        </p>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { whenever, useMagicKeys, useSessionStorage, StorageSerializers } from '@vueuse/core';
import ntc from '~/layers/palette/utils/ntc.util';

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

const session = useSessionStorage<string[]>(
  'random-color:created',
  [],
  { serializer: StorageSerializers.object }
);

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

  session.value = [newColor, ...session.value];

  /** @description delete last if too many saved */
  if (session.value.length > 100) {
    session.value.shift();
  }

  color.value = newColor;
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
