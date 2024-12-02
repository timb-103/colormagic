export function refreshGoogleAds(): void {
  const els = document.getElementsByClassName('adsbygoogle');

  for (const el of els) {
    if (el.getAttribute('data-vignette-loaded') === null) {
      el.removeAttribute('data-ad-status');
      el.removeAttribute('data-adsbygoogle-status');
      el.innerHTML = '';
    }
  }

  for (const el of els) {
    if (el.getAttribute('data-vignette-loaded') === null) {
      window.adsbygoogle.push({});
    }
  }
}
