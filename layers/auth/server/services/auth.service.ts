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

    try {
      const token = jwt.sign({ userId }, authConfig.privateKey, {
        expiresIn: expiresInMs
      });

      setCookie(event, 'jwt', token, {
        expires: expiresDate,
        secure: true
      });
    } catch (err) {
      throw createError({ statusCode: 401, statusMessage: 'Error signing token.' });
    }
  }

  public async loginWithGoogle(event: H3Event, code: string): Promise<UserDto> {
    const googleUser = await this.googleService.getUser(code);

    const [foundByGoogle, foundByEmail] = await Promise.all([
      this.userService.getByGoogleId(googleUser.id),
      this.userService.getByEmail(googleUser.email)
    ]);

    /** @description login if they have a user by google id  */
    if (foundByGoogle !== null) {
      await this.userService.setLastLoginToNow(foundByGoogle.id);
      this.setAuth(event, foundByGoogle.id);
      return foundByGoogle;
    }

    /** @description check if a user exists by email and link the google id */
    if (foundByEmail !== null) {
      await Promise.all([
        this.userService.setLastLoginToNow(foundByEmail.id),
        this.userService.linkGoogleIdToUser(foundByEmail.id, googleUser.id)
      ]);
      this.setAuth(event, foundByEmail.id);
      return foundByEmail;
    }

    /** @description create a new user if none exists */
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
      const payload = jwt.verify(token, authConfig.privateKey) as JwtPayload;

      /** @description check the user exists */
      const found = await this.userService.getById(payload.userId);
      if (found === null) {
        throw new Error('User not found.');
      }

      return payload;
    } catch (err) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token error.'
      });
    }
  }
}
