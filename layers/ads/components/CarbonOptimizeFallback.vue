<template>
  <div>
    <div
      id="bsa-zone_1733305888482-6_123456"
    />
  </div>
</template>

<script setup lang="ts">
function init(): void {
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
  window.optimize.queue.push(() => {
    window.optimize.pushAll();
  });
});

onMounted(() => {
  init();
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
