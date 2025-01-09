<template>
  <div class="border bg-gray-50 border-gray-300 text-gray-800 p-4 rounded-lg">
    <code
      id="css-codeblock"
      class="block text-sm"
    >
      <!-- CSS -->
      <span class="text-green-600">/* CSS */</span><br>
      <span
        v-for="(item, index) in colors"
        :key="index"
      >
        <span class="text-purple-600">.color-{{ index + 1 }}</span> {<br>
        <!-- eslint-disable-next-line -->
        <span class="whitespace-pre">{{ `  `}}color: </span>
        <span
          class="w-3 h-3 border border-black inline-block mr-0.5"
          :style="{background: item }"
        />
        <span class="text-blue-600">{{ item }}</span>;<br>
        }<br>
      </span><br>

      <!-- CSS Variables -->
      <span class="text-green-600">/* CSS Variables */</span><br>
      <span class="text-purple-600">:root</span> {<br>
      <span
        v-for="(item, index) in colors"
        :key="index"
      >
        <span class="whitespace-pre">{{ `  ` }}</span>
        <span class="text-blue-600">--color-{{ index + 1 }}</span>:
        <span
          class="w-3 h-3 border border-black inline-block mr-0.5"
          :style="{ background: item }"
        />
        <span class="text-red-600">{{ item }}</span>;<br>
      </span>
      }
    </code>

    <UButton
      class="mt-4"
      label="Copy CSS"
      block
      @click="copyCss()"
    />
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

export interface Props {
  colors: string[]
}

defineProps<Props>();

const { copy } = useClipboard();
const notifications = useNotifications();

async function copyCss(): Promise<void> {
  const el = document.getElementById('css-codeblock');
  if (el !== null) {
    const text = el.innerText;
    await copy(text);
    notifications.addSuccess('Copied CSS values');
  }
}
</script>

<style>/* CSS */
.color-0 {
  color: #f8ccb9;
}
.color-1 {
  color: #f1a7c8;
}
.color-2 {
  color: #e698b4;
}
.color-3 {
  color: #d599eb;
}
.color-4 {
  color: #a4c4e5;
}

/* CSS Variables */
:root {
  --color-0: #f8ccb9;
  --color-1: #f1a7c8;
  --color-2: #e698b4;
  --color-3: #d599eb;
  --color-4: #a4c4e5;
}
</style>
