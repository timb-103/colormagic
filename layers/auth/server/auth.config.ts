const authConfig = {
  privateKey: useRuntimeConfig().auth.jwt.privateKey,
  oauthRedirectUrl: useRuntimeConfig().oauth.redirectUrl
};

export default authConfig;
