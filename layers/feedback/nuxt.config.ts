export default defineNuxtConfig({
  runtimeConfig: {
    feedback: {
      collectionName: process.env.FEEDBACK_COLLECTION_NAME ?? 'feedback'
    }
  }
});
