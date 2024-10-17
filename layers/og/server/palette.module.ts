import type { Logger } from 'pino';
import { OgService } from './services/og.service';
import { OgValidation } from './validations/og.validation';

export interface OgModule {
  service: OgService
  validation: OgValidation
}

/**
 * - loaded from main server initializer util in `~/server/utils/initialize-server.ts`
 * - can be used in api globally eg. `modules.notification.service.getById()`
 */

export function getOgModule(
  logger: Logger
): OgModule {
  logger.info('initializing og module');

  const service = new OgService();
  const validation = new OgValidation();

  return {
    service,
    validation
  };
}
