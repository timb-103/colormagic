export enum OAuthProvider {
  GOOGLE = 'GOOGLE'
}

export interface OAuthState {
  redirectPath: string
  provider: OAuthProvider
}

export function encodeState(redirectPath: string, provider: OAuthProvider): string {
  const state: OAuthState = {
    redirectPath,
    provider
  };

  return encodeURIComponent(JSON.stringify(state));
}

export function decodeState(encodedState: string): OAuthState {
  try {
    return JSON.parse(decodeURIComponent(encodedState)) as OAuthState;
  } catch (error) {
    throw new Error('Failed to decode OAuth state');
  }
}
