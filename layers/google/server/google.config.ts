const googleConfig = {
  clientId: useRuntimeConfig().google.clientId,
  clientSecret: useRuntimeConfig().google.clientSecret,
  oauth: {
    scopes: {
      email: useRuntimeConfig().google.oauth.scopes.email
    },
    accessType: useRuntimeConfig().google.oauth.accessType,
    prompt: useRuntimeConfig().google.oauth.prompt
  }
};

export default googleConfig;
