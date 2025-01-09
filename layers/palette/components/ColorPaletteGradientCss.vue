<template>
  <div class="border bg-gray-50 border-gray-300 text-gray-800 p-4 rounded-lg">
    <code
      id="gradient-css-codeblock"
      class="block text-sm"
    >

      <!-- Linear Gradient -->
      <span class="text-green-600">/* Linear Gradient */</span><br><br>

      <div
        class="w-full h-16 rounded"
        :style="{ background: `linear-gradient(to right, ${colors.join(', ')})` }"
      /><br>

      <span class="text-purple-600">.linear-gradient</span> {<br>
      <span class="whitespace-pre">{{ `  ` }}</span>background:
      <span class="text-blue-600">linear-gradient(to right, {{ colors.join(', ') }});</span><br>
      }<br><br>

      <!-- Radial Gradient -->
      <span class="text-green-600">/* Radial Gradient */</span><br><br>

      <div
        class="w-full h-16 rounded"
        :style="{ background: `radial-gradient(circle, ${colors.join(', ')})` }"
      /><br>

      <span class="text-purple-600">.radial-gradient</span> {<br>
      <span class="whitespace-pre">{{ `  ` }}</span>background:
      <span class="text-blue-600">radial-gradient(circle, {{ colors.join(', ') }});</span><br>
      }<br>
    </code>

    <UButton
      class="mt-4"
      label="Copy Gradient CSS"
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
  const el = document.getElementById('gradient-css-codeblock');
  if (el !== null) {
    const text = el.innerText;
    await copy(text);
    notifications.addSuccess('Copied gradient CSS values');
  }
}
</script>
