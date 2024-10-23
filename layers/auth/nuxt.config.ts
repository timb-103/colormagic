export default defineNuxtConfig({
  runtimeConfig: {
    auth: {
      jwt: {
        privateKey: process.env.JWT_PRIVATE_KEY ?? '3948ytn398tg-v93yc3q8c3ycr-q98yvtqneh9o-ccon'
      }
    },
    oauth: {
      redirectUrl: process.env.SITE_URL !== undefined
        ? `${process.env.SITE_URL}/oauth`
        : 'http://localhost:3000/oauth'
    }
  }
});
