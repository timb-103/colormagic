export default defineNuxtConfig({
  runtimeConfig: {
    palette: {
      collectionName: process.env.PALETTE_COLLECTION_NAME ?? 'palettes'
    }
  }
});
