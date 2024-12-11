import type { Db } from 'mongodb';
import type { Logger } from 'pino';
import { HealthService } from './services/health.service';

export interface HealthModule {
  service: HealthService
}

/**
 * - loaded from main server initializer util in `~/server/utils/initialize-server.ts`
 * - can be used in api globally eg. `modules.notification.service.getById()`
 */

export function getHealthModule(
  db: Db,
  logger: Logger
): HealthModule {
  logger.info('initializing health module');

  const service = new HealthService(db);

  return {
    service
  };
}
