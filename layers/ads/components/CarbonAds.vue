<template>
  <div>
    <div
      id="bsa-zone_1733305888482-6_123456"
      class="fixed bottom-4 right-4 z-10"
    />
    <div
      ref="container"
      class="carbon min-h-[154px] fixed bottom-4 right-4 z-10 "
    />
  </div>
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
  }
}

function initOptimize(): void {
  const bsaOptimize = document.createElement('script');
  bsaOptimize.type = 'text/javascript';
  bsaOptimize.async = true;
  bsaOptimize.src = `https://cdn4.buysellads.net/pub/colormagic.js?${new Date().getTime() - new Date().getTime() % 600000}`;
  (document.getElementsByTagName('head')[0] ?? document.getElementsByTagName('body')[0]).appendChild(bsaOptimize);
  bsaOptimize.onload = () => {
    window.optimize = window.optimize ?? { queue: [] };
  };
}

watch(useRoute(), () => {
  window?._carbonads?.refresh();
  window.optimize.queue.push(() => {
    window.optimize.pushAll();
  });
});

onMounted(() => {
  init();
  initOptimize();
});
</script>

<style>
@media only screen and (min-width: 0px) and (min-height: 0px) {
  div[id^="bsa-zone_1733305888482-6_123456"] {
    min-width: 0px;
    min-height: 0px;
    }
}
@media only screen and (min-width: 737px) and (min-height: 0px) {
  div[id^="bsa-zone_1733305888482-6_123456"] {
    min-width: 320px;
    min-height: 100px;
  }
}
</style>
