export function refreshGoogleAds(): void {
  const els = document.getElementsByClassName('adsbygoogle');

  for (const el of els) {
    if (el.getAttribute('data-vignette-loaded') === null && el.getAttribute('data-ad-status') === 'done') {
      el.removeAttribute('data-ad-status');
      el.removeAttribute('data-adsbygoogle-status');
      el.innerHTML = '';

      window.adsbygoogle.push({});
    }
  }
}
