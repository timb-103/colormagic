<template>
  <div>
    <div v-if="!data && !isError">
      <USkeleton class="w-full h-12" />
      <USkeleton class="w-full h-12 mt-4" />
    </div>

    <div v-else-if="data">
      <div>
        <h1>{{ data?.text }}</h1>

        <ul class="flex overflow-hidden mb-8">
          <li
            v-for="(item, index) in colors"
            :key="index"
            class="w-full"
          >
            <button
              :style="{ background: item }"
              class="w-full h-48 shadow-md mb-2"
            />
            <p
              class="text-base font-semibold mb-2"
              :style="{color: item}"
            >
              {{ ntc.name(item)[1] }}
            </p>
            <UButton
              size="2xs"
              class="font-semibold mb-2"
              icon="i-heroicons-document-duplicate"
            >
              {{ item }}
            </UButton>
            <UButton
              size="2xs"
              class="font-semibold"
              icon="i-heroicons-document-duplicate"
            >
              {{ rgbToString(hexToRgb(item)) }}
            </UButton>
          </li>
        </ul>

        <div>
          <p class="font-semibold text-sm">
            Brigthness
          </p>
          <URange
            v-model="brightness"
            :min="-100"
            :max="100"
          />
        </div>
        <div>
          <p class="font-semibold text-sm">
            Saturation
          </p>
          <URange
            v-model="saturation"
            :min="-100"
            :max="100"
          />
        </div>
        <div>
          <p class="font-semibold text-sm">
            Warmth
          </p>
          <URange
            v-model="warmth"
            :min="-100"
            :max="100"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ntc from '~/layers/palette/utils/ntc.util';

const { params } = useRoute();
const id = ref(typeof params.id === 'string' ? params.id : undefined);

const { data, isFetching, isError } = usePalette(id);

const brightness = ref(0);
const saturation = ref(0);
const warmth = ref(0);

const colors = computed(() =>
  data.value?.colors !== undefined
    ? arrangeColors(data.value.colors, { brightness: brightness.value, saturation: saturation.value, warmth: warmth.value })
    : []
);
</script>
