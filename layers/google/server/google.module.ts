import type { Logger } from 'pino';
import { GoogleService } from './services/google.service';
import { GoogleValidation } from './validations/google.validation';

export interface GoogleModule {
  service: GoogleService
  validation: GoogleValidation
}

/**
 * - loaded from main server initializer util in `~/server/utils/initialize-server.ts`
 * - can be used in api globally eg. `modules.notification.service.getById()`
 */

export function getGoogleModule(
  logger: Logger
): GoogleModule {
  logger.info('initializing google module');

  const service = new GoogleService();
  const validation = new GoogleValidation();

  return {
    service,
    validation
  };
}
