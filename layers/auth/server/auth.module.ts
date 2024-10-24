import type { Logger } from 'pino';
import { AuthService } from './services/auth.service';
import type { UserService } from '~/layers/user/server/services/user.service';
import type { GoogleService } from '~/layers/google/server/services/google.service';

export interface AuthModule {
  service: AuthService
}

/**
 * - loaded from main server initializer util in `~/server/utils/initialize-server.ts`
 * - can be used in api globally eg. `modules.notification.service.getById()`
 */

export function getAuthModule(
  logger: Logger,
  userService: UserService,
  googleService: GoogleService
): AuthModule {
  logger.info('initializing auth module');

  const service = new AuthService(userService, googleService);

  return {
    service
  };
}
