<template>
  <div>
    <div class="border border-gray-300 rounded-lg overflow-hidden">
      <div
        class="w-full h-24 border-b border-gray-300"
        :style="{ background: `linear-gradient(0.25turn, ${colors.join(', ')})` }"
      />

      <div class=" bg-gray-50  text-gray-800 p-4">
        <code
          id="linear-gradient-css-codeblock"
          class="block text-sm"
        >
          <!-- Linear Gradient -->
          <span class="text-green-600">/* Linear Gradient */</span><br>
          <span class="text-purple-600">.linear-gradient</span> {<br>
          <span class="whitespace-pre">{{ `  ` }}</span>background:
          <span class="text-blue-600">linear-gradient(0.25turn, {{ colors.join(', ') }});</span><br>
          }
        </code>

        <UButton
          class="mt-4"
          label="Copy Linear Gradient CSS"
          block
          @click="copyCss('linear-gradient-css-codeblock')"
        />
      </div>
    </div>

    <div class="border border-gray-300 rounded-lg overflow-hidden mt-4">
      <div
        class="w-full h-24 border-b border-gray-300"
        :style="{ background: `radial-gradient(circle, ${colors.join(', ')})` }"
      />

      <div class="bg-gray-50 text-gray-800 p-4">
        <code
          id="radial-gradient-css-codeblock"
          class="block text-sm"
        >
          <!-- Radial Gradient -->
          <span class="text-green-600">/* Radial Gradient */</span><br>
          <span class="text-purple-600">.radial-gradient</span> {<br>
          <span class="whitespace-pre">{{ `  ` }}</span>background:
          <span class="text-blue-600">radial-gradient(circle, {{ colors.join(', ') }});</span><br>
          }
        </code>

        <UButton
          class="mt-4"
          label="Copy Radial Gradient CSS"
          block
          @click="copyCss('radial-gradient-css-codeblock')"
        />
      </div>
    </div>
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

async function copyCss(id: string): Promise<void> {
  const el = document.getElementById(id);
  if (el !== null) {
    const text = el.innerText;
    await copy(text);
    notifications.addSuccess('Copied gradient CSS values');
  }
}
</script>
