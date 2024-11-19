export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      bsa: {
        id: process.env.BSA_ID ?? '',
        placement: process.env.BSA_PLACEMENT ?? ''
      }
    }
  }
});
