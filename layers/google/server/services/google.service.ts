import { OAuth2Client } from 'google-auth-library';
import googleConfig from '../google.config';
import authConfig from '~/layers/auth/server/auth.config';

export interface GoogleApiUserEntity {
  id: string
  email: string
}

export class GoogleService {
  public async getAuthUrl(state: string): Promise<string> {
    const oauth2Client = new OAuth2Client(
      googleConfig.clientId,
      googleConfig.clientSecret,
      authConfig.oauthRedirectUrl
    );

    const url = oauth2Client.generateAuthUrl({
      scope: [googleConfig.oauth.scopes.email],
      state,
      access_type: googleConfig.oauth.accessType,
      prompt: googleConfig.oauth.prompt,
      include_granted_scopes: true
    });

    return url;
  }

  public async getUser(code: string): Promise<GoogleApiUserEntity> {
    const oauth2Client = new OAuth2Client(
      googleConfig.clientId,
      googleConfig.clientSecret,
      authConfig.oauthRedirectUrl
    );

    const { tokens } = await oauth2Client.getToken(code);
    if (tokens.access_token === undefined || tokens.access_token === null) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No tokens found.'
      });
    }

    oauth2Client.setCredentials(tokens);

    const info = await oauth2Client.getTokenInfo(tokens.access_token);
    if (info.sub === undefined || info.email === undefined) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No email or id found.'
      });
    }

    return {
      id: info.sub,
      email: info.email
    };
  }
}
