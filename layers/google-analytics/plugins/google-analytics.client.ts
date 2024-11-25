export default defineNuxtPlugin(() => {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-HPJXMCVC3V';
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  function gtag(...args: any[]): void {
    window.dataLayer.push(args);
  }

  gtag('js', new Date());
  gtag('config', 'G-HPJXMCVC3V');
});
