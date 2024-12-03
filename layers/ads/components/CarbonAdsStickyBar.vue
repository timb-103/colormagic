<template>
  <div
    class="mt-4 justify-center max-w-3xl mx-auto sticky-js border-gray-200"
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
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .sticky-bar {
    border:  1px solid #7a7a7a;
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
