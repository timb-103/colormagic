export default defineNuxtConfig({
  runtimeConfig: {
    user: {
      collectionName: process.env.USERS_COLLECTION_NAME ?? 'users'
    }
  }
});
