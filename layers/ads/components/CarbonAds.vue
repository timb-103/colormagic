<template>
  <div
    ref="container"
    class="carbon min-h-[154px] fixed bottom-4 right-4 z-10 sm:relative sm:bottom-auto sm:right-auto"
  />
</template>

<script setup lang="ts">
const { id, placement } = useRuntimeConfig().public.carbonAds;

const isInitialized = ref(false);
const container = ref<HTMLElement>();

function init(): void {
  const existing = document.getElementById('_carbonads_js');
  if (existing !== null) {
    existing.remove();
  }

  if (!isInitialized.value) {
    isInitialized.value = true;
    const s = document.createElement('script');
    s.id = '_carbonads_js';
    s.src = `//cdn.carbonads.com/carbon.js?serve=${id}&placement=${placement}&format=responsive`;
    s.defer = true;
    if (container.value !== undefined) {
      container.value.appendChild(s);
    }
    s.onload = () => {
      window.optimize = window.optimize ?? { queue: [] };
      window.optimize.queue.push(() => {
        window.optimize.pushAll();
      });
    };
  }
}

// watch(useRoute(), () => {
//   window?._carbonads?.refresh();
// });

onMounted(() => {
  init();
});
</script>
