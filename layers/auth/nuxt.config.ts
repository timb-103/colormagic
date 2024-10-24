export default defineNuxtConfig({
  runtimeConfig: {
    auth: {
      jwt: {
        privateKey: process.env.JWT_PRIVATE_KEY ?? 'not-a-secret'
      }
    },
    oauth: {
      redirectUrl: process.env.SITE_URL !== undefined
        ? `${process.env.SITE_URL}/oauth`
        : 'http://localhost:3000/oauth'
    }
  }
});
