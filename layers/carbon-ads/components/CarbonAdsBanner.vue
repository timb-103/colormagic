<template>
  <div
    id="responsive_colormagicapp"
    class="mt-4 hidden lg:flex justify-center rounded-md max-w-3xl mx-auto"
  />
</template>

<script setup lang="ts">
const { id, placement } = useRuntimeConfig().public.bsa;

function init(): void {
  const s = document.createElement('script');
  s.src = '//m.servedby-buysellads.com/monetization.js';
  document.head.appendChild(s);
  s.onload = () => {
    window._bsa.init('stickybox', id, placement, { target: '#responsive_colormagicapp' });
  };
}

// watch(useRoute(), () => {
//   window?._bsa?.reload();
// });

onMounted(() => {
  init();
});
</script>
