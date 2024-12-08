<template>
  <div
    :id="zoneId"
    class="sticky-js"
  />
</template>

<script setup lang="ts">
const { id, placement } = useRuntimeConfig().public.bsa;

const zoneId = 'bsa-zone_1733486229130-2_123456';

function init(): void {
  const s = document.createElement('script');
  s.src = '//m.servedby-buysellads.com/monetization.js';
  document.head.appendChild(s);

  s.onload = () => {
    if (window._bsa !== 'undefined') {
      window._bsa.init('custom', id, `${placement}-stickybar`, {
        target: '.sticky-js',
        zone: zoneId,
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

    window.BSANativeCallback = BSANativeCallback;
  };
}

async function isOptimizeInitialized(): Promise<void> {
  let count = 0;
  const max = 100;
  while (window.optimize.isInitialized === undefined && count < max) {
    count += 1;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

async function BSANativeCallback(req: { ads: any[], options: { target: string } }): Promise<void> {
  window.isOptimizeLoaded = window.isOptimizeLoaded ?? false;

  if (req.ads.length === 0) {
    if (!window.isOptimizeLoaded) {
      const bsaOptimize = document.createElement('script');
      bsaOptimize.type = 'text/javascript';
      bsaOptimize.async = true;
      bsaOptimize.src = `https://cdn4.buysellads.net/pub/colormagic.js?${new Date().getTime() - new Date().getTime() % 600000}`;
      (document.getElementsByTagName('head')[0] ?? document.getElementsByTagName('body')[0]).appendChild(bsaOptimize);

      window.isOptimizeLoaded = true;

      bsaOptimize.onload = async () => {
        await isOptimizeInitialized();
        window.optimize = window.optimize ?? { queue: [] };
        window.optimize.queue.push(() => {
          window.optimize.pushAll();
        });
      };
    }
  }
};

// watch(useRoute(), () => {
//   if (window.optimize.queue !== undefined) {
//     window.optimize.queue.push(() => {
//       window.optimize.pushAll();
//     });
//   }
// });

onMounted(() => {
  init();
});
</script>

<style>
  #sticky-js {
    bottom: 0px !important;
    width: 100%;
    min-width: 100%;
    min-height: 50px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top:  1px solid #7a7a7a;
    background: #fff;
  }

  .sticky-bar {
    bottom: 0px !important;
    border-radius: 0px !important;
    max-width: 100% !important;
    box-shadow: none !important;
  }

  #bsa-zone_1733486229130-2_123456 {
    min-width: 100%;
    min-height: 50px;
    position: sticky;
    bottom: 0;
  }

  #bsa-zone_1733486229130-2_123456:not(:empty) {
    backdrop-filter: blur(3px);
    background-color: hsla(0, 0%, 5%, .8);
}

  @media (min-width: 768px) {
    #bsa-zone_1733486229130-2_123456 {
      min-width: 768px;
    }
  }

  #bsa-zone_1733486229130-2_123456_direct_iframe {
    margin-left: auto;
    margin-right: auto;
  }
  </style>
