export default defineNuxtConfig({
  runtimeConfig: {
    mongo: {
      url: process.env.MONGO_URL ?? 'mongodb://colormagic:secret@localhost:27018/colormagic?authSource=admin'
    }
  }
});
