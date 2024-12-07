<template>
  <div
    id="stickybox"
    class="hidden md:flex mt-4 justify-center rounded-md max-w-3xl mx-auto"
  />
</template>

<script setup lang="ts">
function init(): void {
  const s = document.createElement('script');
  s.src = '//m.servedby-buysellads.com/monetization.js';
  s.defer = true;
  document.head.appendChild(s);

  s.onload = () => {
    if (window._bsa !== 'undefined') {
      window._bsa.init('stickybox', 'CW7DE2JN', 'placement:colormagicapp', { target: '#stickybox' });
    }
  };
}

onMounted(() => {
  init();
});
</script>

<style>
#_stickybox_ .native-hide {
  display: none !important;
}
#_stickybox_ .stickybox-outer {
  left: 20px;
}
</style>
