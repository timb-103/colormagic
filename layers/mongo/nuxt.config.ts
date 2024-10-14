export default defineNuxtConfig({
  runtimeConfig: {
    mongo: {
      url: process.env.MONGO_URL ?? 'mongodb://pallyy:secret@localhost:27017/colormagic?authSource=admin'
    }
  }
});
