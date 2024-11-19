<template>
  <div
    id="responsive_colormagicapp"
    class="mt-4 border border-gray-200  hidden sm:flex justify-center rounded-md max-w-3xl mx-auto overflow-hidden"
  />
</template>

<script setup lang="ts">
const { id, placement } = useRuntimeConfig().public.bsa;

function init(): void {
  const s = document.createElement('script');
  s.src = '//m.servedby-buysellads.com/monetization.js';
  document.head.appendChild(s);
  s.onload = () => {
    if (window._bsa !== 'undefined') {
      window._bsa.init('responsive', id, placement, { target: '#responsive_colormagicapp' });
    }
  };
}

onMounted(() => {
  init();
});
</script>

<style>
#responsive_colormagicapp ._responsive_ {
    max-inline-size: 100%;
}
#responsive_colormagicapp ._responsive_ .native-banner {
    /* padding: 5px 10px 5px 10px; */
    box-shadow: none;
}

#responsive_colormagicapp ._responsive_ .native-desc {
    font-size: 14px;
}

#responsive_colormagicapp ._responsive_ .native-cta {
    background-color: transparent !important;
    color: blue !important;
    display: none;
}

#responsive_colormagicapp ._responsive_ .native-details {
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

#responsive_colormagicapp ._responsive_ .native-company {
    margin-bottom: 0px;
}
</style>
