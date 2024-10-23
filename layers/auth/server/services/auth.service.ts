import jwt, { type JwtPayload as JwtPayloadBase } from 'jsonwebtoken';
import { addDays } from 'date-fns';
import { type H3Event } from 'h3';
import authConfig from '../auth.config';
import type { UserService } from '~/layers/user/server/services/user.service';
import type { UserDto } from '~/layers/user/server/dtos/user.dto';
import type { GoogleService } from '~/layers/google/server/services/google.service';

interface JwtPayload extends JwtPayloadBase {
  userId: string
}

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly googleService: GoogleService
  ) {}

  private setAuth(event: H3Event, userId: string): void {
    const expiresDate = addDays(new Date(), 365);
    const expiresInMs = Math.floor(expiresDate.getTime() / 1000);

    const token = jwt.sign({ userId }, authConfig.privateKey, {
      expiresIn: expiresInMs
    });

    setCookie(event, 'jwt', token, {
      expires: expiresDate,
      secure: true
    });
  }

  public async loginWithGoogle(event: H3Event, code: string): Promise<UserDto> {
    const googleUser = await this.googleService.getUser(code);

    /** @description login if they have a user */
    const found = await this.userService.getByGoogleId(googleUser.id);
    if (found !== null) {
      this.setAuth(event, found.id);

      return found;
    }

    /** @description create a new user */
    const entity = await this.userService.createByGoogle(
      googleUser.id,
      googleUser.email
    );

    this.setAuth(event, entity.id);

    return entity;
  }

  public async verify(event: H3Event): Promise<JwtPayload> {
    const token = getCookie(event, 'jwt') ?? getHeader(event, 'Authorization');
    if (token === undefined) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized.'
      });
    }

    try {
      return jwt.verify(token, authConfig.privateKey) as JwtPayload;
    } catch (err) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token error.'
      });
    }
  }
}
