<template>
  <div class="flex">
    <UPopover>
      <UButton
        icon="i-heroicons-paint-brush"
        class="text-white"
        size="xs"
        :style="{
          background: color,
        }"
      />

      <template #panel>
        <div>
          <Sketch
            v-model="color"
            @update:model-value="item => update(item.hex as HexColor)"
          />
        </div>
      </template>
    </UPopover>
  </div>
</template>

<script setup lang="ts">
import { Sketch } from '@ckpack/vue-color';

export interface Props {
  initialColor: string
}

export type HexColor = `#${string}`;

const props = defineProps<Props>();
const emits = defineEmits<(e: 'select', value: HexColor) => void>();

const color = ref(props.initialColor);

function update(hex: HexColor): void {
  color.value = hex;

  emits('select', hex);
}

watch(() => props.initialColor, (newValue) => (color.value = newValue));
</script>
