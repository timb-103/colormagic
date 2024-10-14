export default defineNuxtConfig({
  runtimeConfig: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY ?? ''
    }
  }
});
