<template>
  <div
    id="responsive_colormagicapp"
    class="border-b border-gray-200  hidden sm:flex justify-center"
  />
</template>

<script setup lang="ts">
const { id } = useRuntimeConfig().public.bsa;

function init(): void {
  const s = document.createElement('script');
  s.src = '//m.servedby-buysellads.com/monetization.custom.js';
  document.head.appendChild(s);
  s.onload = () => {
    if (window._bsa !== 'undefined') {
      window._bsa.init('custom', id, 'placement:demo',
        {
          target: '#responsive_colormagicapp',
          template: `
<div class="iconBarFlex">
  <a href="##statlink##" class="iconBarLink" rel="sponsored noopener" target="_blank" title="##company## — ##tagline##">
    <div class="iconBarImage" style="background-color: ##backgroundColor##;">
      <img height="30" width="30" src="##image##" alt="##company## logo">
    </div>
    <div class="iconBarText">
      <div class="iconBarTagline">##companyTagline##</div>
      <div class="iconBarDescription">##description## <span style="color: gray;font-size:12px;">SPONSORED</span></div>
    </div>
  </a>
</div>
    `
        }
      );
    }
  };
}

onMounted(() => {
  init();
});
</script>

<style>
#responsive_colormagicapp .iconBarFlex {
    display: flex;
    flex-direction: column;
    max-inline-size: 100%;
    gap: 1ex;
    font-size: 14px;
}

#responsive_colormagicapp .iconBarLink {
    display: flex;
    align-items: center;
    overflow: hidden;
    text-decoration: none;
    border-radius: 6px;
    background-color: var(--iconBarBackgroundColor);
    /* border: solid 1px hsla(0, 0%, 0%, 0.1); */
    color: var(--iconBarColor);
}

#responsive_colormagicapp .iconBarLink:hover {
  text-decoration: none;
}

#responsive_colormagicapp .iconBarImage {
  display: flex;
  flex-shrink: 0;
  align-self: stretch;
}

#responsive_colormagicapp .iconBarImage img {
  padding: 10px;

  width: auto;
  box-sizing: content-box;
  height: 30px;

  align-self: center;
}

#responsive_colormagicapp .iconBarText {
  padding: 8px 12px;
  line-height: 1.35;
}

#responsive_colormagicapp .iconBarTagline {
  font-weight: 600;
}

#responsive_colormagicapp .iconBarVia {
    opacity: 0.75;
    color: var(--iconBarColor);
  font-size: 0.85em;
  display: block;
  text-align: right;
  text-decoration: none;
}

#responsive_colormagicapp ._responsive_ {
    max-inline-size: 100%;
}
#responsive_colormagicapp ._responsive_ .native-banner {
    padding: 5px 10px 5px 10px;
    box-shadow: none;
}

#responsive_colormagicapp ._responsive_ .native-desc {
    font-size: 14px;
}

#responsive_colormagicapp ._responsive_ .native-cta {
    background-color: transparent !important;
    color: blue !important;
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
