export default defineNuxtConfig({
  runtimeConfig: {
    rateLimit: {
      maxRequests: 30,
      intervalSeconds: 60
    }
  }
});
