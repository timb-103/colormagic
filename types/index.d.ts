export {};

declare global {
  interface Window {
    _carbonads: any
    _bsa: any
    dataLayer: any
    gtag: any
    googletag: any
    adsbygoogle: any
    optimize: any
    BSANativeCallback: any
    isOptimizeLoaded: boolean
    optimizeTargetIds: string[]
  }
}
