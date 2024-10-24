export default defineNuxtConfig({
  runtimeConfig: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      oauth: {
        scopes: {
          email: process.env.GOOGLE_OAUTH_EMAIL_SCOPE ?? 'https://www.googleapis.com/auth/userinfo.email'
        },
        accessType: process.env.GOOGLE_OAUTH_ACCESS_TYPE ?? 'offline',
        prompt: process.env.GOOGLE_OAUTH_PROMPT ?? 'consent'
      }
    }
  }
});
