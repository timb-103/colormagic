export default defineNuxtConfig({
  runtimeConfig: {
    palette: {
      collectionName: process.env.PALETTE_COLLECTION_NAME ?? 'palettes',
      aiNamesStartDateMs: process.env.PALLETTE_AI_NAMES_START_DATE_MS !== undefined
        ? +process.env.PALLETTE_AI_NAMES_START_DATE_MS
        : 1729116912549
    }
  }
});
