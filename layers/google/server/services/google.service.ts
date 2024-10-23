import { OAuth2Client } from 'google-auth-library';
import got from 'got';
import googleConfig from '../google.config';
import authConfig from '~/layers/auth/server/auth.config';

export interface GoogleApiUserEntity {
  id: string
  email: string
  picture: string
}

export class GoogleService {
  public async getAuthUrl(state: string): Promise<string> {
    const oauth2Client = new OAuth2Client(
      googleConfig.clientId,
      googleConfig.clientSecret,
      authConfig.oauthRedirectUrl
    );

    const url = oauth2Client.generateAuthUrl({
      scope: ['https://www.googleapis.com/auth/userinfo.email'],
      state,
      access_type: 'offline',
      prompt: 'consent',
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
    oauth2Client.setCredentials(tokens);

    const user = await got.get({
      url: 'https://www.googleapis.com/oauth2/v1/userinfo',
      searchParams: {
        access_token: tokens.access_token
      }
    }).json<GoogleApiUserEntity>();

    return user;
  }
}
