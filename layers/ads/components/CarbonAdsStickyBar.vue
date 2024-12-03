<template>
  <div
    class="sticky-js"
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
      window._bsa.init('custom', id, `${placement}-stickybar`, {
        target: '.sticky-js',
        id: 'sticky-js',
        template: `
        <a class="sticky-bar" style="background-color: ##backgroundColor##; color: ##textColor##" href="##link##" rel="sponsored noopener" target="_blank" title="##company## — ##tagline##">
          <div class="native-main">
            <img class="native-img" src="##logo##">
            <div class="native-details" style="color: ##textColor##">
              <span class="native-tagline">Sponsored by ##company##</span>
              <span class="native-desc">##description##</span>
            </div>
            <span class="native-cta" style="color: ##ctaTextColor##; background-color: ##ctaBackgroundColor##;">##callToAction##</span>
          </div>
        </a>
        
        `
      });
    }
  };
}

// watch(useRoute(), () => {
//   window?._bsa?.reload('#sticky-js');
// });

onMounted(() => {
  init();
});
</script>

<style>
  #sticky-js {
    bottom: 0px !important;
    width: 100%;
  }
  .sticky-bar {
    border-radius: 0px !important;
    border-top:  1px solid #7a7a7a;
    max-width: 100% !important;
    box-shadow: none !important;
  }

  @media (max-width: 500px) {
    #sticky-js {
      bottom: 0px !important;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .sticky-bar {
      border-bottom-left-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
    }
  }

</style>
