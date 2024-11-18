export function initCarbonAds(el: HTMLDivElement): void {
  if (window._carbonads !== true) {
    const script = document.createElement('script');
    script.id = '_carbonads_js';
    script.async = true;
    script.src = useRuntimeConfig().public.carbonAdsScriptUrl;
    el.appendChild(script);
  }
}
