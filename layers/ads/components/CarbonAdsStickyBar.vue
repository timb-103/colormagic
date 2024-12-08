<template>
  <div
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
  // window.optimizeTargetIds = window.optimizeTargetIds ?? [];
  // window.optimizeTargetIds.push(req.options.target.replace('#', '').replace('.', ''));

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
        console.log('pushed!');
        window.optimize.push(zoneId);
      });
    };
  }
};

watch(useRoute(), () => {
  if (window.optimize.queue !== undefined) {
    window.optimize.queue.push(() => {
      console.log('pushing:', zoneId);
      window.optimize.push(zoneId);
    });
  }
});

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
